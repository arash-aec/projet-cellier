import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Footer from "./composants/Pied/Pied";
import Entete from "./composants/Entete/Entete";
import Usager from './vues/Usager/Usager';
import NonTrouve from "./vues/NonTrouve/NonTrouve";
import Accueil from "./vues/Accueil/Accueil";
import ListeBouteille from "./vues/ListeBouteille/ListeBouteille";
import ListeCellier from "./vues/ListeCellier/ListeCellier";

const AppRouter = () => {
  
  const [connecter, setConnecter] = useState(false);
  const [prenom, setPrenom] = useState("");



  return (
    <Router>
      <Entete connecter={connecter}  setConnecter={setConnecter} prenom={prenom} prenom={prenom} setPrenom={setPrenom} />
      <Routes>
        <Route path="/" element={<Accueil   connecter={connecter}  setConnecter={setConnecter} prenom={prenom} setPrenom={setPrenom}/>} />
        <Route path="/usager" element={<Usager />} />
        <Route path="/listeBouteille/:id" element={<ListeBouteille />} />
        <Route path="/celliers" element={<ListeCellier />} />
        <Route path="*" element={<NonTrouve />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
