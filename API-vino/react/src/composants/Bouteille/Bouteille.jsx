import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Bouteille(props) {
   
  const {pays, nom, image, notes, prix, id: idBouteille, quantite: initialQuantite, millesime, garde_jusqua, format, url_saq, type, onBouteilleAjouter, onBouteilleBoire } = props;
  const reference = useRef(null);
  const {id : idCellier} = useParams();
  
  useEffect(() => {
    const elements = reference.current;
    elements.addEventListener("click", gereBouton);

    return () => {
      elements.removeEventListener("click", gereBouton);
    };
  }, []);

  function gereBouton(e) {
      const { target } = e;
      const bouteilleElement = target.closest(".bouteille");
      const id = bouteilleElement.getAttribute("data-id");
      const btnAjouter = target.closest('[data-js-ajouter]');
      const btnBoire = target.closest('[data-js-boire]');
  
      if (btnAjouter) {
        ajouterBouteille(id, idCellier);
      } else if (btnBoire) {
        boireBouteille(id, idCellier);
      }
  }

  function ajouterBouteille(idBouteille, idCellier) {
    console.log(idBouteille)
    console.log(idCellier)
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
  
  return(
    <div className="bouteille" key={idBouteille} ref={reference} data-id={idBouteille} >
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
            <p className="prix">Prix: {prix} $</p>
            <p className="quantite">
              Quantité : <strong className="quantite-chiffre">{initialQuantite}</strong>
            </p>
          </div>
        </div>
        <p>
          <Link to={url_saq}>Voir SAQ</Link>
        </p>
        <div className="options">
          <button className="btnModifier" type="submit">
            Modifier
          </button>
          <button className="btnAjouter" data-js-ajouter>Ajouter</button>
          <button className="btnBoire" data-js-boire>Boire</button>
        </div>
      </div>
    </div>
  )
}