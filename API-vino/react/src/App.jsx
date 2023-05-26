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

export const TokenContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Récupérer le token du localStorage lors du chargement de la page
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TokenContext.Provider value={token}>
          <Router>
            <Entete token={token} />
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/listeBouteille/:id" element={<ListeBouteille />} />
              <Route path="/celliers" element={<ListeCellier />} />
              <Route path="*" element={<NonTrouve />} />
            </Routes>
            <Footer />
          </Router>
          </TokenContext.Provider>
        </PersistGate>
    </Provider>
  )
}

export default App