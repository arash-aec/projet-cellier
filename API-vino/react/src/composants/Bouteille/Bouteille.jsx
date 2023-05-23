import { Link } from "react-router-dom";

export default function Bouteille(props) {
   
   const {pays, nom, image,notes, prix_saq, id, quantite,millesime,garde_jusqua,bouteille, format, description } = props;
    return(
      <div className="bouteille" data-quantite=""  key={id}>
        <div className="img">
          <img src={image} alt="Bouteille" />
        </div>
        <div className="description">
          {/* Formulaire de modification d'une bouteille dans le cellier */}
          <form method="POST" action="">
            {/* <h3 className="nom">Bouteille name : {bouteille.nom}</h3> */}
            <div className="details-bouteille">
              <div>
                <h4 className="nom">{nom}</h4>
                <p className="description">{description}</p>
                <p className="prix">Prix : {prix_saq}</p>
                <p className="garde">notes : {notes}</p>
                <p className="garde">Garde : {garde_jusqua}</p>
              </div>
            </div>
            <p>
              <a href="">Voir SAQ</a>
            </p>
          </form>
          <div className="options" data-id="">
            <button className="btnModifier" type="submit">
              Modifier
            </button>
            <input type="hidden" name="id_bouteille_cellier" value="" />
            <button className="btnAjouter">Ajouter</button>
            <button className="btnBoire">Boire</button>
          </div>
        </div>
      </div>
    )
}





