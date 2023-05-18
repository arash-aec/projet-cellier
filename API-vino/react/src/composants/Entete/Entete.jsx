import React from "react";



const Entete = () => {
  
  return (

    <div>
        <header className="header">
        <a href="/" className="logo"><img src="images/logo-1.png" alt="logo de Vino"/></a>
        <input className="side-menu" type="checkbox" id="side-menu" />
        <label className="hamb" htmlFor="side-menu">
            <span className="hamb-line"></span>
        </label>
        <nav className="nav">
            <ul className="menu">
            <li><a href="/">Accueil</a></li>
            <li><a link="/cellier">Cellier</a></li>
          

            </ul>
        </nav>
        </header>
    </div>
  )
}
export default Entete





















		

      