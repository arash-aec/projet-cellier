import React from "react";
import { Link } from "react-router-dom";

const Entete = (props) => { 
  const {setConnecter, connecter} = props;
  
  return (
    <>
      <header className="header">
      <Link to="/" className="logo"><img src="../public/images/logo-1.png" alt="logo de Vino"/></Link>
        <input className="side-menu" type="checkbox" id="side-menu" />
        <label className="hamb" htmlFor="side-menu">
          <span className="hamb-line"></span>
        </label>
        {connecter ?
          (<nav className="nav">
            <ul className="menu">
              <li><a href="/">Accueil</a></li>
              <li><a href="/celliers">Mes Celliers</a></li>
              <li><a href="/">Déconnexion</a></li>
            </ul>
          </nav>) : ("") }
      </header>
    </>
  );
};

export default Entete;
