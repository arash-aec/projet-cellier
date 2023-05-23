import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Bouteille from "../../composants/Bouteille/Bouteille";

const ListeBouteille = () => {
  let [miseAJour, setMiseAJour] = useState(false);
  let [bouteilles, setBouteilles] = useState([]);

  // Récupération de l'id du cellier
  const {id} = useParams();

  // Récupération du non de cellier avec l'URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nomCellier = searchParams.get('nom');

  useEffect(() => {
    getBouteilles();
  }, [miseAJour]);

  function getBouteilles() {
    fetch("http://127.0.0.1:8000/api/bouteilles/" + id)
      .then((data) => data.json())
      .then((data) => {
        setBouteilles(data);
        setMiseAJour(false);
      });
  }

  const ajouteBouteille = (bouteilleId) => {
    setBouteilles(bouteilles.filter((bouteille) => bouteille.id !== bouteilleId));
    setMiseAJour(true);
  };

  const boireBouteille = (bouteilleId) => {
    setBouteilles(bouteilles.filter((bouteille) => bouteille.id !== bouteilleId));
    setMiseAJour(true);
  };

  const htmlBouteille = bouteilles.map((uneBouteille, index) => (
    <Bouteille key={index} uneBouteille={uneBouteille} {...uneBouteille} onBouteilleAjouter={ajouteBouteille} onBouteilleBoire={boireBouteille}  />
  ));

  return (
    <div>
       <div className="cellier">
          <div className="cellier-header">
            <h2 className="cellier-titre">{nomCellier}</h2>
            <a href="" className="cellier-lien">
              Ajouter une bouteille
            </a>
          </div>
          <div className="">
            <div className="cellier-liste">{htmlBouteille}</div>
          </div>
        </div>
    </div>
  );
};

export default ListeBouteille;
