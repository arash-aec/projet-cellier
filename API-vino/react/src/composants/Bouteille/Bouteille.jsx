import { Link } from "react-router-dom";

export default function Bouteille(props) {
   
   const {pays, nom, image,notes, prix, id, quantite,millesime,garde_jusqua,bouteille,format } = props;
    return(
      <div className="bouteille" data-quantite=""  key={id}>
        <div className="img">
          <img src="" alt="Bouteille" />
        </div>
        <div className="description">
          {/* Formulaire de modification d'une bouteille dans le cellier */}
          <form method="POST" action="">
            {/* <h3 className="nom">Bouteille name : {bouteille.nom}</h3> */}
            <div className="details-bouteille">
              <div>
                <p className="millesime">Millesime : {millesime}</p>
                <p className="pays">Pays : {pays}</p>
                <p className="garde">notes : {notes}</p>
                <p className="garde">Garde : {garde_jusqua}</p>
                {/* <p className="type">Format : {bouteille.format}</p> */}
              </div>
              <div>
                <p className="note"></p>
                <p className="prix">prix: {prix}</p>
                <p className="quantite">
                  Quantité : <strong className="quantite-chiffre">{quantite}</strong>
                </p>
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





