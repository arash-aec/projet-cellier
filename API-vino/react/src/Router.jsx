import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Footer from "./composants/Pied/Pied";
import Entete from "./composants/Entete/Entete";
import NonTrouve from "./vues/NonTrouve/NonTrouve";
import Accueil from "./vues/Accueil/Accueil";
import ListeBouteille from "./vues/ListeBouteille/ListeBouteille";
import ListeCellier from "./vues/ListeCellier/ListeCellier";
import Login from "./vues/Login/Login";

const AppRouter = () => {
  
  const [connecter, setConnecter] = useState(false);

  return (
    <Router>
      <Login setConnecter={setConnecter} connecter={connecter} />
      <Entete connecter={connecter}  setConnecter={setConnecter} />
      <Routes>
        <Route path="/" element={<Accueil connecter={connecter}  setConnecter={setConnecter} />} />
        <Route path="/listeBouteille/:id" element={<ListeBouteille />} />
        <Route path="/celliers" element={<ListeCellier />} />
        <Route path="*" element={<NonTrouve />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
