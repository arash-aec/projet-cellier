import React from "react";
import { Link } from 'react-router-dom';

const Entete = () => {
  
  return (

    <div>
        <header className="header">
          <Link to="/" className="logo"><img src="images/logo-1.png" alt="logo de Vino"/></Link>
          <input className="side-menu" type="checkbox" id="side-menu" />
          <label className="hamb" htmlFor="side-menu">
              <span className="hamb-line"></span>
          </label>
          <nav className="nav">
            <ul className="menu">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/cellier">Cellier</Link></li>
            </ul>
          </nav>
        </header>
    </div>
  )
}
export default Entete





















		

      