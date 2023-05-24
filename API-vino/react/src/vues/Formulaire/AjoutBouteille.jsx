import React, { useState, useEffect, useRef } from "react";

const AjoutBouteille = (props) => {
  const { idCellier, onBouteilleAjoutCellier } = props;
  const [isBouteilleAjoutee, setIsBouteilleAjoutee] = useState(false);

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
              console.log(element.id);
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

    const btnAjouter = modalAjoutBouteille.querySelector("[name='ajouterBouteilleCellier']");

    const handleAjouterClick = (e) => {
      e.preventDefault();

      if (isBouteilleAjoutee) {
        console.log("La bouteille a déjà été ajoutée.");
        return;
      }

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
            return response.json();
          } else {
            throw new Error('Erreur');
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });

      setIsBouteilleAjoutee(true);
    };

    if (btnAjouter) {
      btnAjouter.addEventListener("click", handleAjouterClick);
    }

    return () => {
      if (inputNomBouteille) {
        inputNomBouteille.removeEventListener("keyup", handleKeyUp);
      }

      if (liste) {
        liste.removeEventListener("click", handleClick);
      }

      if (btnAjouter) {
        btnAjouter.removeEventListener("click", handleAjouterClick);
      }
    };
  }, []);

  return (
    <div className="ajouter">
      <div className="modal-overlay-ajoutBouteille">
        <div className="modal-ajoutBouteille">
          <span className="close-btn-ajoutBouteille" >&times;</span>
          <h2>Ajouter une bouteille</h2>
          {/* <!-- Formulaire pour ajouter une nouvelle bouteille --> */}
          <form className="nouvelleBouteille">
            <label htmlFor="nom_bouteille">Recherche : </label> 
            <input type="text" name="nom_bouteille" id="nom_bouteille" className="rechercheListeBouteille" />
            <ul className="listeAutoComplete"></ul>
            {/* <!-- Affichage de la bouteille trouvée grâce à l'autocomplétion --> */}
            <div>
              <label htmlFor="nom_bouteille">Nom :</label>
              <strong data-id="" className="nom_bouteille" id="nom_bouteille"></strong>
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
            {/* <!-- Bouton pour ajouter la nouvelle bouteille --> */}
            <button name="ajouterBouteilleCellier" className="btn-ajouter">Ajouter</button>
            {/* <!-- <button name="ajouterBouteilleCellier" >Ajouter</button> --> */}
          </form>
        </div>
      </div>
    </div>
    );
};

export default AjoutBouteille;
