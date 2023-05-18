import React from "react";

const Inscription = () => {
  return (
    <>
      <div className="modal-overlay-inscription">
        <div className="modal-inscription">
          <span className="close-btn-inscription" >&times;</span>
          <h2>Inscription</h2>
          <form>
            <label htmlFor="nom">Votre nom:</label>
            <input type="text" id="nom" name="nom" required />

            <label htmlFor="prenom">Votre prenom:</label>
            <input type="text" id="prenom" name="prenom" required />

            <label htmlFor="email-inscrir">Votre courriel:</label>
            <input type="email" id="email-inscrir" name="email" required />

            <label htmlFor="password-inscrir">Mot de passe:</label>
            <input type="current-password" id="password-inscrir" name="password-inscrir" required />

            <label htmlFor="confirmpass">Confirmez mot de passe:</label>
            <input type="current-password" id="confirmpass" name="password" required />

            <input type="submit" value="Enregistrer" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Inscription;
