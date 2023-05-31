import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BouteilleListe(props) {

  let {id_usager, pays, nom, image, prix_saq, id: idBouteille, quantite: initialQuantite, format, url_saq, type, onBouteilleSupprime } = props;

  const reference = useRef(null);
  const [bouteilleVisible, setBouteilleVisible] = useState(true);

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
      const btnSupprimer = target.closest('[data-js-supprimer]'); 

      const idBouteille = target.getAttribute('data-id');
      if (btnSupprimer) { 
        supprimerBouteille(idBouteille, id_usager); 
      }
  }

  function supprimerBouteille(idBouteille, id_usager) {

    fetch(`http://127.0.0.1:8000/api/liste-achat/${idBouteille}/${id_usager}/supprimer`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          //Bouteille supprimée avec succès
          setBouteilleVisible(false);
          onBouteilleSupprime(idBouteille);
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
  
  return(
    <div className="bouteille bouteille-item" key={idBouteille} ref={reference} data-id={idBouteille} >
      <div className="img">
        <img src={image} alt="Bouteille" />
      </div>
      <div className="description">
        <h3 className="nom">{nom}</h3>
        <div className="details-bouteille">
          <div>
            <p className="pays">Pays : {pays}</p>
            <p className="type">Type : {type}</p>
          </div>
          <div>
            <p className="format">Format : {format}</p>
            <p className="prix">Prix SAQ : {prix_saq} $</p>
          </div>
        </div>
        <p>
          <Link className="lienSAQ" to={url_saq}>Voir sur le site de la SAQ</Link>
        </p>
        <div className="options">
          <div className="options">
            <i className="btnSupprimer bouteille-icone__fa fa fa-trash" data-js-supprimer data-id={idBouteille}><p><small>Supprimer</small></p></i>
          </div>   
        </div>
      </div>
    </div>
  )
}