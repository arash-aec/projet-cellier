import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Login from '../Login/Login';
import Inscription from '../Inscription/Inscription';

const Accueil = () => {
  const reference = useRef(null);

  useEffect(() => {
    const elements = reference.current;
    gereDOM(elements);
    
  }, []);

  function gereDOM(elements) {
    if (elements) {

      // Gestion modal Connexion
      const btnConnexion = elements.querySelector('[data-js-connexion]');
      const modalOverlayConnexion = document.querySelector(".modal-overlay-connexion");
      const modalConnexion = document.querySelector(".modal-connexion");
      const closeBtnConnexion = document.querySelector(".close-btn-connexion");

      btnConnexion.addEventListener("click", function() {
        modalOverlayConnexion.style.display = "block";
        modalConnexion.style.display = "block";
      });

      closeBtnConnexion.addEventListener("click", function() {
        modalOverlayConnexion.style.display = "none";
        modalConnexion.style.display = "none";
      });

      // Gestion modal Inscription
      const openModalBtnInscription = document.querySelector('[data-js-inscription]');
      const modalOverlayInscription = document.querySelector(".modal-overlay-inscription");
      const modalInscription = document.querySelector(".modal-inscription");
      const closeBtnInscription = document.querySelector(".close-btn-inscription");
      
      openModalBtnInscription.addEventListener("click", function() {
        modalOverlayInscription.style.display = "block";
        modalInscription.style.display = "block";
      });
      
      closeBtnInscription.addEventListener("click", function() {
        modalOverlayInscription.style.display = "none";
        modalInscription.style.display = "none";
      });
    }
  }

  return (
    <div ref={reference}>
      <div className="header-image header-image-accueil">
        <img src="../public/images/Beautiful-white-wine-in-wine-glass.jpg" alt="image-vin" />
        <div className="header-image-accueil-content">
          <h1>Vino</h1>
          <p><strong>La meilleure application de gestion de cellier !</strong></p>
          <div className="header-image-btn">
            <div><button id="open-modal-connexion-btn" className="bouton header-button" data-js-connexion>Connexion</button></div>
            <div><button id="open-modal-inscription-btn" className="bouton header-button-light" data-js-inscription>Inscription</button></div>
          </div>
        </div>
      </div>

      {/* Presentation */}
      <section className="presentation">
        <article>
          <div>
            <img src="../public/images/cellier.jpeg" alt="photo d'un cellier en bois" />
          </div>
          <h2>Gestion de cellier</h2>
        </article>
        <article>
          <div>
            <img src="../public/images/cellier-vine.jpg" alt="photo de plusieurs bouteilles" />
          </div>
          <h2>Liste d'achat</h2>
        </article>
        <article>
          <div>
            <img src="../public/images/wine-box.jpg" alt="photo d'un coffret de bouteille" />
          </div>
          <h2>Vin de la SAQ</h2>
        </article>
      </section>
      <section className="partage">
        <h2>Partagez-nous</h2>
        <div className="partage-icone">
          <i className="fa fa-facebook-square"></i>
          <i className="fa fa-linkedin-square"></i>
          <i className="fa fa-twitter-square"></i>
          <i className="fa fa-youtube-play"></i>
        </div>
      </section>
      <Login />
      <Inscription />
    </div>
  );
};

export default Accueil;
