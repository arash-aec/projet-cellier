import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import Footer from "./composants/Pied/Pied";
import Entete from "./composants/Entete/Entete";
import Login from './vues/Login/Login';
import Usager from './vues/Usager/Usager';
import Inscription from './vues/Inscription/Inscription';
import NonTrouve from "./vues/NonTrouve/NonTrouve";
import Accueil from "./vues/Accueil/Accueil";
import ListeCellier from "./ListeCellier/ListeCellier";



const AppRouter = () => {
  return (
    <Router>
      <Entete />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/usager" element={<Usager />} />
        <Route path="/listeCellier" element={<ListeCellier />} />
        <Route path="*" element={<NonTrouve />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
