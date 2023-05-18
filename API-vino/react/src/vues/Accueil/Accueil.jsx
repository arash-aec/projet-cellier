import React from "react";
import './Accueil.css';

const Accueil = () => {
  return (
    <div>
      <div className="header-image">
        <img
          src="images/Beautiful-white-wine-in-wine-glass.jpg"
          alt="image-vin"
        />
        <div>
          <h1>Vino</h1>
          <p><strong>La meilleure application de gestion de cellier !</strong></p>
          <div className="header-image-btn">
            <div><a id="open-modal-connexion-btn" className="header-image-button" href="/login">CONNEXION</a></div>
            <div><a id="open-modal-inscription-btn" className="header-image-button" href="/inscription">INSCRIPTION</a></div>
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
    </div>
  );
};

export default Accueil;
