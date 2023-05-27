import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deconnexion } from '../../global/authentification/authAction.jsx';
import { useNavigate } from "react-router-dom";

const Entete = () => { 
  
  const estConnecte = useSelector(state => state.auth.estConnecte);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Utilisation du onClick car message d'erreur avec reference car visible que si connecté
  const handleLogout = () => {
    dispatch(deconnexion());
    localStorage.removeItem('usagerData');
    // Redirection vers la page Accueil
    navigate("/");
    // Mettre deconnexion Laravel 
  };

  // Condition Admin nav
  let role = null;
  const usagerData = localStorage.getItem('usagerData');
  if (usagerData) {
    const parsedData = JSON.parse(usagerData);
    role = parsedData.role_usager;
  }


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
              { role === 2 && (
                <li><Link to="/admin">Espace Admin</Link></li>
              )}
              {/* <li><Link to="/">Accueil</Link></li> */}
              <li><Link to="/celliers">Mes Celliers</Link></li>
              <li><Link to="/" onClick={handleLogout}>Déconnexion</Link></li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default Entete;
