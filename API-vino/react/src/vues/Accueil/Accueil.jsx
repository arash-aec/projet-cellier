import React, { useEffect, useRef } from "react";
import Login from '../Login/Login';
import Inscription from '../Inscription/Inscription';

const Accueil = () => {

  const reference = useRef(null);

  useEffect(() => {

    const element = reference.current;
    
    if (element) {

      // Gestion modal Connexion
      const btnConnexion = element.querySelector('[data-js-connexion]');
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
  }, []);

  return (
    <div ref={reference}>
      <div className="header-image">
        <img src="images/Beautiful-white-wine-in-wine-glass.jpg" alt="image-vin" />
        <div>
          <h1>Vino</h1>
          <p><strong>La meilleure application de gestion de cellier !</strong></p>
          <div className="header-image-btn">
            <div><a id="open-modal-connexion-btn" className="header-image-button" data-js-connexion>CONNEXION</a></div>
            <div><a id="open-modal-inscription-btn" className="header-image-button" data-js-inscription>INSCRIPTION</a></div>
          </div>
        </div>
      </div>

      {/* Presentation */}
      <section className="presentation">
        <article>
          <div>
            <img src="images/cellier.jpeg" alt="photo d'un cellier en bois" />
          </div>
          <h2>GESTION DE CELLIER</h2>
        </article>
        <article>
          <div>
            <img src="images/cellier-vine.jpg" alt="photo de plusieurs bouteilles" />
          </div>
          <h2>LISTE D'ACHAT</h2>
        </article>
        <article>
          <div>
            <img src="images/wine-box.jpg" alt="photo d'un coffret de bouteille" />
          </div>
          <h2>VIN DE LA SAQ</h2>
        </article>
      </section>
      <Login />
      <Inscription />
    </div>
  );
};

export default Accueil;
