import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { TokenContext } from '../../App';
import { deconnexion } from '../../global/authentification/authAction.jsx';
import { useNavigate } from "react-router-dom";


const Entete = () => { 
  const estConnecte = useSelector(state => state.auth.estConnecte);
  const token = useContext(TokenContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(deconnexion());
    // Redirection vers la page Accueil
    navigate("/");

    // Mettre deconnexion Laravel 
  };

  return (
    <>
      <header className="header">
      <Link to="/" className="logo"><img src="../public/images/logo-1.png" alt="logo de Vino"/></Link>
        <input className="side-menu" type="checkbox" id="side-menu" />
        <label className="hamb" htmlFor="side-menu">
          <span className="hamb-line"></span>
        </label>
        {estConnecte && (
          <nav className="nav">
            <ul className="menu">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/celliers">Mes Celliers</Link></li>
              <li><button className="bouton button-primary" onClick={handleLogout}>Déconnexion</button></li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default Entete;
