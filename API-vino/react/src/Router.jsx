import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import Footer from "./composants/Pied/Pied";
import Entete from "./composants/Entete/Entete";
import NonTrouve from "./vues/NonTrouve/NonTrouve";
import Accueil from "./vues/Accueil/Accueil";
import ListeBouteille from "./vues/ListeBouteille/ListeBouteille";
import ListeCellier from "./vues/ListeCellier/ListeCellier";



const AppRouter = () => {
  return (
    <Router>
      <Entete />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/listeBouteille/:id" element={<ListeBouteille />} />
        <Route path="/celliers" element={<ListeCellier />} />
        <Route path="*" element={<NonTrouve />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
