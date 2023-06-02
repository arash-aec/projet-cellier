import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ModifieBouteille from "../../vues/Formulaire/ModifieBouteille";
import SupprimModal from "../SupprimModal/SupprimModal"

export default function Bouteille(props) {

  const {pays, nom, image, notes, prix_saq, id: idBouteille, quantite: initialQuantite, prix, millesime, garde_jusqua, format, url_saq, type, onBouteilleAjouter, onBouteilleBoire, onBouteilleModifieQuantite, onBouteilleModifier, onBouteilleSupprime } = props;

  const reference = useRef(null);
  const {id : idCellier} = useParams();
  const [bouteilleVisible, setBouteilleVisible] = useState(true);
  const [values, setValues] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const element = reference.current;

    if (element) {
      element.addEventListener("click", gereBouton);

      return () => {
        element.removeEventListener("click", gereBouton);
      };
    }
  }, []);

  function gereBouton(e) {
      const { target } = e;
      const btnAjouter = target.closest('[data-js-ajouter]');
      const btnBoire = target.closest('[data-js-boire]');
      const btnModifier = target.closest('[data-js-modifier]');
      const btnSupprimer = target.closest('[data-js-supprimer]'); 
      const btnAjouteListe = target.closest('[data-js-ajouter-liste]'); 
      const btnModifierBouteille = target.closest('[data-js-modifier-bouteille]'); 

      const idBouteille = target.getAttribute('data-id');
      if (btnAjouter) {
        ajouterBouteille(idBouteille, idCellier);
      } else if (btnBoire) {
        boireBouteille(idBouteille, idCellier);
      } else if (btnModifier) {
        modifieQuantiteBouteille(idBouteille, idCellier);
      } else if (btnSupprimer) { 
          // Arrêter la propagation de l'événement pour empêcher le déclenchement de l'événement de clic du conteneur
          e.stopPropagation();
          // Afficher le modal de confirmation de suppression
          setShowDeleteModal(true); 
      } else if (btnAjouteListe) {
        ajouterBouteilleListe(idBouteille)
      } else if (btnModifierBouteille) {
        modifierBouteille(idBouteille, idCellier)
      }
  }

  function ajouterBouteille(idBouteille, idCellier) {
    fetch(`http://127.0.0.1:8000/api/cellier-bouteilles/${idBouteille}/${idCellier}/ajouter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        onBouteilleAjouter(idBouteille);
      })
  }

  function boireBouteille(idBouteille, idCellier) {
    fetch(`http://127.0.0.1:8000/api/cellier-bouteilles/${idBouteille}/${idCellier}/boire`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        onBouteilleBoire(idBouteille);
      })
  }

  function modifieQuantiteBouteille(idBouteille, idCellier) {
    const quantite = document.querySelector(`.bouteille-item[data-id="${idBouteille}"] .quantite`);
    const formQuantite = document.querySelector(`.bouteille-item[data-id="${idBouteille}"] .quantite-form`);
    const btnValiderQuantite = document.querySelector(`.bouteille-item[data-id="${idBouteille}"] [data-js-valider]`);

    btnValiderQuantite.addEventListener('click', ()=>{ 
      const nouvelleQuantiteInput = reference.current.querySelector('input[name="quantite"]');
      const nouvelleQuantite = nouvelleQuantiteInput.value;

      fetch(`http://127.0.0.1:8000/api/cellier-bouteilles/${idBouteille}/${idCellier}/modifier`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantite: nouvelleQuantite,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          onBouteilleModifieQuantite(idBouteille);
        }) 
    });
  }

  function modifierBouteille(idBouteille, idCellier) {
    fetchData(idBouteille, idCellier);
  } 

  const fetchData = async (idBouteille, idCellier) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cellier-bouteille/${idBouteille}/${idCellier}`);
      const data = await response.json();
      setValues((data) => ({
        ...data,
        bouteille_id: idBouteille,
        cellier_id: idCellier,
      }));
      const modalOverlayModifieBouteille = document.querySelector(".modal-overlay-modifieBouteille");
      const modalModifieBouteille = document.querySelector(".modal-modifieBouteille");
      const closeBtnModifieBouteille = document.querySelector(".close-btn-modifieBouteille");
  
      modalOverlayModifieBouteille.style.display = "block";
      modalModifieBouteille.style.display = "block";

      onBouteilleModifier(idBouteille);
    } catch (error) {
      console.error(error);
    }
  }; 

  function supprimerBouteille(idBouteille, idCellier) {
    setShowDeleteModal(true);

    fetch(`http://127.0.0.1:8000/api/cellier-bouteilles/${idBouteille}/${idCellier}/supprimer`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          //Bouteille supprimée avec succès, supprimez-la de l'interface utilisateur
          setBouteilleVisible(false);
          console.log('Bouteille deleted successfully');
        } else {
          // Gérer l'erreur réseau
          response.json().then((errorData) => {
            console.error('Erreur lors de la suppression de la bouteille:', errorData.error);
          });
        }
      })
      .catch((error) => {
        // Gérer l'erreur réseau
        console.error('Erreur lors de la suppression de la bouteille:', error);
      });
  }

  function ajouterBouteilleListe(id) {
    let id_Bouteille = id;
    let id_usager = null;
    
    const usagerData = localStorage.getItem('usagerData');
    if (usagerData) {
      const parsedData = JSON.parse(usagerData);
      id_usager = parsedData.id_usager;
    }

    
    fetch(`http://127.0.0.1:8000/api/liste-achat/${id_Bouteille}/${id_usager}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantite: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      });
  }

  function handleModalClose() {
    setShowDeleteModal(false);
  }

  function handleModalConfirm() {
    supprimerBouteille(idBouteille, idCellier);
    setShowDeleteModal(false);
  }

  return(
    <div>
      <div className="bouteille bouteille-item" key={idBouteille} ref={reference} data-id={idBouteille} >
        <div className="img">
          <img src={image} alt="Bouteille" />
        </div>
        <div className="description">
          <h3 className="nom">{nom}</h3>
          <div className="details-bouteille">
            <div>
              <p className="millesime">Millesime : {millesime}</p>
              <p className="pays">Pays : {pays}</p>
              <p className="type">Type : {type}</p>
              <p className="garde">Garde : {garde_jusqua}</p>
            </div>
            <div>
              <p className="note">Note : {notes}</p>
              <p className="format">Format : {format}</p>
              <p className="prix">Prix achat : {prix} $</p>
              <p className="prix">Prix SAQ : {prix_saq} $</p>
            </div>
          </div>
          <Link className="lienSAQ" to={url_saq}>Voir sur le site de la SAQ</Link>
          <div className="options">
            <p className="quantite">Quantité : <strong className="quantite-chiffre">{initialQuantite}</strong></p>
            <div>
              <form action="" className="quantite-form">
                  <input type="number" name="quantite" className="quantite-input" placeholder={initialQuantite} min="0" />
                  <i className="bouteille-icone__fa fa fa-check" data-js-modifier data-id={idBouteille} data-js-valider><p><small>Valider</small></p></i>
              </form>
            </div>
            <i className="btnAjouter bouteille-icone__fa fa fa-plus" data-js-ajouter data-id={idBouteille}><p><small>Ajouter</small></p></i>
            <i className="btnBoire bouteille-icone__fa fa fa-minus" data-js-boire data-id={idBouteille}><p><small>Boire</small></p></i>
          </div>   
          <div className="options">
            <i className="btnModifier bouteille-icone__fa fa fa-edit" data-js-modifier-bouteille data-id={idBouteille}><p><small>Modifier</small></p></i>
            <i className="btnSupprimer bouteille-icone__fa fa fa-trash" data-js-supprimer data-id={idBouteille}><p><small>Supprimer</small></p></i>
            <i className="btnAjouterListe bouteille-icone__fa fa fa-shopping-cart" data-js-ajouter-liste data-id={idBouteille}><p><small>Liste Achat</small></p></i>
          </div>
          </div>
          <ModifieBouteille detailsBouteille={values} onBouteilleModifier={onBouteilleModifier} idCellier={idCellier} idBouteille={idBouteille} />
        </div>
        {showDeleteModal && (
      <SupprimModal
      showModal={showDeleteModal}
      onClose={handleModalClose}
      onConfirm={handleModalConfirm}
      />
      )}
    </div>
  )
}

