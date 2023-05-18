import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import Login from './vues/Login/Login';
import Usager from './vues/Usager/Usager';
import Inscription from './vues/Inscription/Inscription';
import NonTrouve from "./vues/NonTrouve/NonTrouve";
import Accueil from "./vues/Accueil/Accueil";
import Cellier from "./vues/Cellier/Cellier";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />}  />
        <Route path="/login" element={<Login />}  />
        <Route path="/inscription" element={<Inscription />}  />
        <Route path="/usager" element={<Usager />}  />
        <Route path="/cellier" element={<Cellier />}  />
        <Route path="*" element={<NonTrouve />}  />
      </Routes>
    </Router>
  );
};

export default AppRouter;
