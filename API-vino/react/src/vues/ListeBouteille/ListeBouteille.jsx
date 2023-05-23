import React, { useState, useEffect } from "react";
import Bouteille from "../../composants/Bouteille/Bouteille";

const ListeBouteille = (props) => {
  // console.log("Component Cellier rendered");
  let [miseAJour, setMiseAJour] = useState(false);
  let [bouteilles, setBouteilles] = useState([]);
 


  useEffect(() => {
    getBouteilles();
  }, [miseAJour]);

  function getBouteilles() {
    fetch("http://127.0.0.1:8000/api/bouteilles")
      .then((data) => data.json())
      .then((data) => {
        setBouteilles(data);
        setMiseAJour(false);
      });
  }

  //trier par nom A à Z
  const sortBouteillesParNomAaZ = (e) => {
    e.preventDefault();
    const sortBouteillesNom = [...bouteilles].sort((a, b) =>
      a.nom.localeCompare(b.nom)
    );
    setBouteilles(sortBouteillesNom);
  };

  //trier par nom Z à A
  const sortBouteillesParNomZaA = (e) => {
    e.preventDefault();
    const sortBouteillesNomZaA = [...bouteilles].sort((a, b) =>
      b.nom.localeCompare(a.nom)
    );
    setBouteilles(sortBouteillesNomZaA);
  };

  //trier par prix order croissant 
  const sortBouteillesParPrix = (e) => {
    e.preventDefault();
    const sortedBouteillesPrix = [...bouteilles].sort((a, b) =>
      a.prix_saq - b.prix_saq
    );
    setBouteilles(sortedBouteillesPrix);
  };


  //trier par prix order decroissant 
  const sortBouteillesParPrixDecroissant = (e) => {
    e.preventDefault();
    const sortedBouteillesPrixDecroissant = [...bouteilles].sort((a, b) =>
      b.prix_saq - a.prix_saq
    );
    setBouteilles(sortedBouteillesPrixDecroissant);
  };
  

  const htmlBouteille = bouteilles.map((uneBouteille, index) => (
    <Bouteille key={index} uneBouteille={uneBouteille} {...uneBouteille} />
  ));

  return (
    <div>
      <div className="cellier">
        <div className="cellier-header">
          <h2 className="cellier-titre">Mon cellier</h2>
          <a href="" className="cellier-lien">Ajouter une bouteille</a>
          <select
            className="trierBouteille"
            onChange={(e) => {
              if (e.target.value === "nom") {
                sortBouteillesParNomAaZ(e);
              } else if (e.target.value === "prix") {
                sortBouteillesParPrix(e);
              } else if (e.target.value === "nomDesc") {
                sortBouteillesParNomZaA(e);
              } else if (e.target.value === "prixDesc") {
                sortBouteillesParPrixDecroissant(e);
              }
            }}
          >
            <option className="trierPar" value="nom">Trier par : Nom du produit (A-Z)</option>
            <option className="trierPar" value="nomDesc">Trier par : Nom du produit (Z-A)</option>
            <option className="trierPar" value="prix">Trier par : Prix (ordre croissant)</option>
            <option className="trierPar" value="prixDesc">Trier par : Prix (ordre décroissant)</option>
          </select>
        </div>
        <div className="">
          <div className="cellier-liste">{htmlBouteille}</div>
        </div>
      </div>
    </div>
  );
  
};

export default ListeBouteille;
