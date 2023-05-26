import React from "react";
import { Link } from "react-router-dom";

const Entete = (props) => {
  const {setConnecter, connecter} = props;
  console.log(connecter); 

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          <img src="images/logo-1.png" alt="logo de Vino" />
        </Link>
        <input className="side-menu" type="checkbox" id="side-menu" />
        <label className="hamb" htmlFor="side-menu">
          <span className="hamb-line"></span>
        </label>
        <nav className="nav">
          <ul className="menu">
            <li>
              <a href="/">Accueil</a>
            </li>
            <li>
              <a href="/celliers">Cellier</a>
            </li>
          </ul>
        </nav>
        {connecter && <span>Bonjour, {prenom}</span>}
      </header>
    </>
  );
};

export default Entete;
