import React, { createContext, useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './global/store';

import Footer from "./composants/Pied/Pied";
import Entete from "./composants/Entete/Entete";
import NonTrouve from "./vues/NonTrouve/NonTrouve";
import Accueil from "./vues/Accueil/Accueil";
import ListeBouteille from "./vues/ListeBouteille/ListeBouteille";
import ListeCellier from "./vues/ListeCellier/ListeCellier";

export const UsagerDataContext = createContext(null);

function App() {
  const [usagerData, setUsagerData] = useState(JSON.parse(localStorage.getItem('usagerData')) || null);

  useEffect(() => {
    // Récupérer les données de l'usager (id, role, token) du localStorage lors du chargement de la page
    const storedUsagerData = JSON.parse(localStorage.getItem('usagerData'))
    setUsagerData(storedUsagerData);
  }, []);
  
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUsagerData = JSON.parse(localStorage.getItem('usagerData'));
      setUsagerData(storedUsagerData);
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UsagerDataContext.Provider value={usagerData}>
          <Router>
            <Entete />
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/celliers" element={<ListeCellier />} />
              <Route path="/listeBouteille/:id" element={<ListeBouteille />} />
              <Route path="*" element={<NonTrouve />} />
            </Routes>
            <Footer />
          </Router>
        </UsagerDataContext.Provider>
      </PersistGate>
    </Provider>
  )
}

export default App