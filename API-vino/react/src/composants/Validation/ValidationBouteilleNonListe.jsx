import React, { useState, useEffect, useRef } from "react";
import { paysData, typeData } from  "./data"

import ValidationBouteilleNonListe from "../../composants/Validation/ValidationBouteilleNonListe";

const AjoutBouteilleNonListe = (props) => {
  const { idCellier, onBouteilleAjoutCellier } = props;
  const [isBouteilleAjoutee, setIsBouteilleAjoutee] = useState(false);
  const formRef = useRef(null);
  const [erreur, setErreur] = useState({});
  const [values, setValues] = useState({
    nom: '',
    description: '',
    format: '',
    millesime: '',
    quantite: '',
    date_achat: '',
    prix: '',
    garde_jusqua: '',
    notes: '',
  })

  useEffect(() => {
    const inputNomBouteille = document.querySelector("[name='nom']");
    const modalOverlayAjoutBouteilleNonListe = document.querySelector(".modal-overlay-ajoutBouteilleNonListe");
    const modalAjoutBouteilleNonListe = document.querySelector(".modal-ajoutBouteilleNonListe");


    const validateInput = (values) => {
      const erreurs = ValidationBouteilleNonListe(values);
      setErreur(erreurs);
  
      // Check if the erreurs object is empty
      return Object.keys(erreurs).length === 0;
    };

    const handleAjouterClick = (e) => {
      e.preventDefault();

       // Perform validation
    if (!validateInput(values)) {
      console.log("Invalid input. Please correct the form.");
      return;
    }

      // Effectuez la validation des valeurs
      // const erreurs = ValidationBouteilleNonListe(values);
      // setErreur(erreurs);

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
             formRef.current.reset();
             setValues({
              nom: '',
              description: '',
              format: '',
              millesime: '',
              quantite: '',
              date_achat: '',
              prix: '',
              garde_jusqua: '',
              notes: '',
            });
            
            console.log("Bouteille ajoutée");
            setIsBouteilleAjoutee(true);
            return response.json();
          } else {
            throw new Error('Erreur');
          }
        })
        .then(response => {
          console.log(response);

        })
        .catch(error => {
          setErreur({ message: "Erreur lors de la requête." });
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
  }, [values]);

  
  return (
    <div className="ajouter">
      <div className="modal-overlay-ajoutBouteilleNonListe">
        <div className="modal-ajoutBouteilleNonListe">
          <span className="close-btn-ajoutBouteilleNonListe">&times;</span>
          <h2>Ajouter une bouteille non listée</h2>
          <form ref={formRef} className="nouvelleBouteille">
            <div>
              <label htmlFor="nom">Nom : * </label>
              <input name="nom" id="nom" className="nom" placeholder="Nom de la vigne" onChange={(e) => setValues((prevValues) => ({ ...prevValues, nom: e.target.value }))} required />
              {erreur.nom && <p className="error-message">{erreur.nom}</p>}
              <label htmlFor="pays">Pays : * </label>
              <select name="pays" id="pays" required>
                {paysData.map((pays) => (
                  <option key={pays.id} value={pays.pays}>
                    {pays.pays}
                  </option>
                ))}
              </select>
              <label htmlFor="description">Description : * </label>
              <input name="description" id="description" className="description" placeholder="au moins quatre lettres" onChange={(e) =>  setValues((prevValues) => ({ ...prevValues, description: e.target.value }))} required  />
              {erreur.description && <p className="error-message">{erreur.description}</p>}
              <label htmlFor="format">Format : * </label>
              <input name="format" id="format" placeholder="volume de vin en 'ml'" onChange={(e) => setValues((prevValues) => ({ ...prevValues, format: e.target.value }))} required />
              {erreur.format && <p className="error-message">{erreur.format}</p>}
              <label htmlFor="type">Type : * </label>
              <select name="type" id="type" required>
                {typeData.map((type) => (
                  <option key={type.id} value={type.type}>
                    {type.type}
                  </option>
                ))}
              </select>
              <label htmlFor="millesime">Millesime : * </label>
              <input name="millesime" id="millesime" placeholder="Une année (ex : 2020)" onChange={(e) => setValues((prevValues) => ({ ...prevValues, millesime: e.target.value }))} required />
              {erreur.millesime && <p className="error-message">{erreur.millesime}</p>}
              <label htmlFor="quantite">Quantite : * </label>
              <input name="quantite" id="quantite" placeholder="Veuillez entrer une quantité" onChange={(e) => setValues((prevValues) => ({ ...prevValues, quantite: e.target.value }))} required />
              {erreur.quantite && <p className="error-message">{erreur.quantite}</p>}
              <label htmlFor="date_achat">Date achat : *</label>
              <input name="date_achat" id="date_achat" placeholder="Format : aaaa-mm-jj" onChange={(e) => setValues((prevValues) => ({ ...prevValues, date_achat: e.target.value }))} required />
              {erreur.date_achat && <p className="error-message">{erreur.date_achat}</p>}
              <label htmlFor="prix">Prix : * </label>
              <input name="prix" id="prix" placeholder="Veuillez entrer le prix d'achat" onChange={(e) => setValues((prevValues) => ({ ...prevValues, prix: e.target.value }))} required />
              {erreur.prix && <p className="error-message">{erreur.prix}</p>}
              <label htmlFor="garde_jusqua">Garde : * </label>
              <input name="garde_jusqua" id="garde_jusqua" placeholder="Nombre d'années (ex : 20)" onChange={(e) => setValues((prevValues) => ({ ...prevValues, garde_jusqua: e.target.value }))} required />
              {erreur.garde_jusqua && <p className="error-message">{erreur.garde_jusqua}</p>}
              <label htmlFor="notes">Note : * </label>
              <input name="notes" id="notes" placeholder="Un chiffre de 1 à 5" onChange={(e) => setValues((prevValues) => ({ ...prevValues, notes: e.target.value }))} required />
              {erreur.notes && <p className="error-message">{erreur.notes}</p>}
              <small>* Champs obligatoires</small>
            </div>
            <button type="submit" name="ajouterBouteilleCellier" className="btn-ajouter" value="Ajouter" >Ajouter</button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default AjoutBouteilleNonListe;