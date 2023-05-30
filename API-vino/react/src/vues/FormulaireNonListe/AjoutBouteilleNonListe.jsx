import React, { useState, useEffect, useRef } from "react";
import { paysData, typeData } from  "./data"

const AjoutBouteilleNonListe = (props) => {
  const { idCellier, onBouteilleAjoutCellier } = props;
  const [isBouteilleAjoutee, setIsBouteilleAjoutee] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const inputNomBouteille = document.querySelector("[name='nom']");
    const modalOverlayAjoutBouteilleNonListe = document.querySelector(".modal-overlay-ajoutBouteilleNonListe");
    const modalAjoutBouteilleNonListe = document.querySelector(".modal-ajoutBouteilleNonListe");

    const handleAjouterClick = (e) => {
      e.preventDefault();

      if (isBouteilleAjoutee) {
        console.log("La bouteille a déjà été ajoutée.");
        return;
      }

      // Retrieve bouteille_id from the DOM
      const bouteille_id = modalAjoutBouteilleNonListe.querySelector(".nom").dataset.id;

      // Retrieve form data
      const formData = new FormData(formRef.current);
      const bouteilleCellier = Object.fromEntries(formData);
      bouteilleCellier.bouteille_id = bouteille_id;
      bouteilleCellier.cellier_id = idCellier;

      // Perform fetch request
      fetch("http://127.0.0.1:8000/api/bouteilles/nouvelle", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bouteilleCellier)
      })
        .then(response => {
          if (response.status === 200) {
            modalOverlayAjoutBouteilleNonListe.style.display = "none";
            modalAjoutBouteilleNonListe.style.display = "none";
           onBouteilleAjoutCellier(bouteille_id);
            // formRef.current.reset();
            
            console.log("Bouteille ajoutée");
            return response.json();
          } else {
            throw new Error('Erreur');
          }
        })
        .then(response => {
          console.log(response);
           setIsBouteilleAjoutee(true);
        })
        .catch(error => {
          console.error(error);
        });

     
    };

    const formElement = formRef.current;
    if (formElement) {
      formElement.addEventListener("submit", handleAjouterClick);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener("submit", handleAjouterClick);
      }
    };
  }, []);

  
  return (
    <div className="ajouter">
      <div className="modal-overlay-ajoutBouteilleNonListe">
        <div className="modal-ajoutBouteilleNonListe">
          <span className="close-btn-ajoutBouteilleNonListe">&times;</span>
          <h2>Ajouter une bouteille non listée</h2>
          <form ref={formRef} className="nouvelleBouteille">
            <div>
              <label htmlFor="nom">Nom : * </label>
              <input name="nom" id="nom" className="nom" required />
              <label htmlFor="pays">Pays : * </label>
              <select name="pays" id="pays" required>
                {paysData.map((pays) => (
                  <option key={pays.id} value={pays.pays}>
                    {pays.pays}
                  </option>
                ))}
              </select>
              <label htmlFor="description">Description : * </label>
              <input name="description" id="description" required />
              <label htmlFor="format">Format : * </label>
              <input name="format" id="format" required />
              <select name="type" id="type" required>
                {typeData.map((type) => (
                  <option key={type.id} value={type.type}>
                    {type.type}
                  </option>
                ))}
              </select>
              <label htmlFor="millesime">Millesime : * </label>
              <input name="millesime" id="millesime" required />
              <label htmlFor="quantite">Quantite : * </label>
              <input name="quantite" id="quantite" required />
              <label htmlFor="date_achat">Date achat : *</label>
              <input name="date_achat" id="date_achat" required />
              <label htmlFor="prix">Prix : * </label>
              <input name="prix" id="prix" required />
              <label htmlFor="garde_jusqua">Garde : * </label>
              <input name="garde_jusqua" id="garde_jusqua" required />
              <label htmlFor="notes">Notes : * </label>
              <input name="notes" id="notes" required />
              <small>* Champs obligatoires</small>
            </div>
            <button type="submit" name="ajouterBouteilleCellier" className="btn-ajouter">Ajouter</button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default AjoutBouteilleNonListe;