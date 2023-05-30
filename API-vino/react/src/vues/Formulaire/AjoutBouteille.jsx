import React, { useState, useEffect, useRef } from "react";

import ValidationBouteille from "../../composants/Validation/ValidationBouteille";

const AjoutBouteille = (props) => {
  const formRef = useRef(null);
  const { idCellier, onBouteilleAjoutCellier } = props;
  const inputNomBouteilleRef = useRef(null);
  const [isBouteilleAjoutee, setIsBouteilleAjoutee] = useState(false);
  const [erreur, setErreur] = useState({});
  const [values, setValues] = useState({
    millesime: '',
    quantite: '',
    date_achat: '',
    prix: '',
    garde_jusqua: '',
    notes: '',
  })

  useEffect(() => {
    const inputNomBouteille = document.querySelector("[name='nom_bouteille']");
    const liste = document.querySelector('.listeAutoComplete');
    const modalOverlayAjoutBouteille = document.querySelector(".modal-overlay-ajoutBouteille");
    const modalAjoutBouteille = document.querySelector(".modal-ajoutBouteille");

    const handleKeyUp = (evt) => {
      const nom = evt.target.value;
      liste.innerHTML = "";
      if (nom) {
        fetch("http://127.0.0.1:8000/api/bouteilles/autocompleteBouteille", { 
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({ nom: nom }) 
        })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error('Erreur');
            }
          })
          .then(response => {
            // Affichage des résultats de l'autocomplétion
            response.forEach(function (element) {
              liste.innerHTML += "<li data-id='" + element.id + "'>" + element.nom + "</li>";
            })
          }).catch(error => {
            console.error(error);
          });
      }
    };

    if (inputNomBouteille) {
      inputNomBouteille.addEventListener("keyup", handleKeyUp);
    }

    const handleClick = (evt) => {
      inputNomBouteilleRef.current.value = "";
      if (evt.target.tagName === "LI") {
        const bouteille = {
          nom: modalAjoutBouteille.querySelector(".nom_bouteille"),
          quantite: modalAjoutBouteille.querySelector("[name='quantite']"),
        };

        bouteille.nom.dataset.id = evt.target.dataset.id;
        bouteille.nom.innerHTML = evt.target.innerHTML;

        liste.innerHTML = "";
        inputNomBouteille.value = "";
        setIsBouteilleAjoutee(false);
      }
    };

    if (liste) {
      liste.addEventListener("click", handleClick);
    }

    const handleAjouterClick = (e) => {
      e.preventDefault();

      // Effectuez la validation des valeurs
      const erreurs = ValidationBouteille(values);
      setErreur(erreurs);
      
      if (Object.keys(erreurs).length === 0) {
  
        const bouteilleCellier = {
          bouteille_id: modalAjoutBouteille.querySelector(".nom_bouteille").dataset.id,
          cellier_id: idCellier,
          quantite: modalAjoutBouteille.querySelector("[name='quantite']").value,
          date_achat : modalAjoutBouteille.querySelector("[name='date_achat']").value,
          millesime : modalAjoutBouteille.querySelector("[name='millesime']").value,
          prix : modalAjoutBouteille.querySelector("[name='prix']").value,
          garde_jusqua : modalAjoutBouteille.querySelector("[name='garde_jusqua']").value,
          notes : modalAjoutBouteille.querySelector("[name='notes']").value,
        };
  
        const resetForm = () => {
          inputNomBouteille.value = "";
          liste.innerHTML = "";
          modalAjoutBouteille.querySelector(".nom_bouteille").dataset.id = "";
          modalAjoutBouteille.querySelector(".nom_bouteille").innerHTML = "";
          modalAjoutBouteille.querySelector("[name='quantite']").value = "1";
          modalAjoutBouteille.querySelector("[name='date_achat']").value = "";
          modalAjoutBouteille.querySelector("[name='millesime']").value = "";
          modalAjoutBouteille.querySelector("[name='prix']").value = "";
          modalAjoutBouteille.querySelector("[name='garde_jusqua']").value = "";
          modalAjoutBouteille.querySelector("[name='notes']").value = "";
        };
        fetch("http://127.0.0.1:8000/api/cellier-bouteilles/ajoutBouteilleCellier", { 
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(bouteilleCellier) 
        })
          .then(response => {
            if (response.status === 200) {
              onBouteilleAjoutCellier(bouteilleCellier.bouteille_id);
              resetForm();
              modalOverlayAjoutBouteille.style.display = "none";
              modalAjoutBouteille.style.display = "none";
              console.log("Bouteille ajoutée");
              setIsBouteilleAjoutee(true);
              return response.json();
            } else {
              throw new Error('Erreur');
            }
          })
          .catch(error => {
            erreurs.bouteille = "Bouteille déjà dans le cellier";
            setErreur(erreurs);
            setIsBouteilleAjoutee(true);
          });
      }
    };

    const form = modalAjoutBouteille.querySelector("form");

    if (form) {
      form.addEventListener("submit", handleAjouterClick);
    }

    return () => {
      if (inputNomBouteille) {
        inputNomBouteille.removeEventListener("keyup", handleKeyUp);
      }

      if (liste) {
        liste.removeEventListener("click", handleClick);
      }

      if (form) {
        form.removeEventListener("submit", handleAjouterClick);
      }
    };
  }, [values]);

  return (
    <div className="ajouter">
      <div className="modal-overlay-ajoutBouteille">
        <div className="modal-ajoutBouteille">
          <span className="close-btn-ajoutBouteille" >&times;</span>
          <h2>Ajouter une bouteille</h2>
          {/* <!-- Formulaire pour ajouter une nouvelle bouteille --> */}
          <form ref={formRef} className="nouvelleBouteille">
            <label htmlFor="nom_bouteille">Recherche : </label> 
            <input type="text" name="nom_bouteille" id="nom_bouteille" className="rechercheListeBouteille" ref={inputNomBouteilleRef} />
            <ul className="listeAutoComplete"></ul>
            {/* <!-- Affichage de la bouteille trouvée grâce à l'autocomplétion --> */}
            <div>
              <label htmlFor="nom_bouteille">Nom :</label>
              <strong data-id="" className="nom_bouteille" id="nom_bouteille"></strong>
              {erreur.bouteille && <p className="error-message">{erreur.bouteille}</p>}
              <label htmlFor="millesime">Millesime : * </label>
              <input name="millesime" id="millesime" placeholder="Une année (ex : 2020)" onChange={(e) => setValues({ ...values, millesime: e.target.value })} required />
              {erreur.millesime && <p className="error-message">{erreur.millesime}</p>}
              <label htmlFor="quantite">Quantite : * </label>
              <input name="quantite" id="quantite" placeholder="Veuillez entrer une quantité" onChange={(e) => setValues({ ...values, quantite: e.target.value })} required />
              {erreur.quantite && <p className="error-message">{erreur.quantite}</p>}
              <label htmlFor="date_achat">Date achat : *</label>
              <input name="date_achat" id="date_achat" placeholder="Format : aaaa-mm-jj" onChange={(e) => setValues({ ...values, date_achat: e.target.value })} required />
              {erreur.date_achat && <p className="error-message">{erreur.date_achat}</p>}
              <label htmlFor="prix">Prix : * </label>
              <input name="prix" id="prix" placeholder="Veuillez entrer le prix d'achat" onChange={(e) => setValues({ ...values, prix: e.target.value })} required />
              {erreur.prix && <p className="error-message">{erreur.prix}</p>}
              <label htmlFor="garde_jusqua">Garde : * </label>
              <input name="garde_jusqua" id="garde_jusqua" placeholder="Nombre d'années (ex : 20)" onChange={(e) => setValues({ ...values, garde_jusqua: e.target.value })} required />
              {erreur.garde_jusqua && <p className="error-message">{erreur.garde_jusqua}</p>}
              <label htmlFor="notes">Note : * </label>
              <input name="notes" id="notes" placeholder="Un chiffre de 1 à 5" onChange={(e) => setValues({ ...values, notes: e.target.value })} required />
              {erreur.notes && <p className="error-message">{erreur.notes}</p>}
              <small>* Champs obligatoires</small>
            </div>
            {/* <!-- Bouton pour ajouter la nouvelle bouteille --> */}
            <input type="submit" name="ajouterBouteilleCellier" className="btn-ajouter" value="Ajouter" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjoutBouteille;
