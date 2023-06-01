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
import AdminStatistique from "./vues/Admin/AdminStatistique";
import Admin from "./vues/Admin/Admin";
import ModifieUsager from "./vues/ModifieUsager/ModifierUsager";
import AjouterUsager from "./vues/AjouteUsager/AjouteUsager";
import ListeAchat from "./vues/ListeAchat/ListeAchat";
import CompteUsager from "./vues/CompteUsager/CompteUsager";
import ModifieCompte from "./vues/CompteUsager/ModifieCompte";


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
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/statistique" element={<AdminStatistique />} />
              <Route path="/listeBouteille/:id" element={<ListeBouteille />} />
              <Route path="/liste-achat" element={<ListeAchat />} />
              <Route path="/modifieUsager/:id" element={<ModifieUsager />} />
              <Route path="/modifierProfil/:id" element={<ModifieCompte />} />
              <Route path="/ajouterUsager" element={<AjouterUsager />} />
              <Route path="/votreCompte/:id" element={<CompteUsager />} />
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