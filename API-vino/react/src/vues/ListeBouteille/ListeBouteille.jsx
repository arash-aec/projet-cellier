import React, { useState, useEffect } from "react";
import Bouteille from "../../composants/Bouteille/Bouteille";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
        console.log(data);
        setBouteilles(data);
        setMiseAJour(false);
      });
  }

  const htmlBouteille = bouteilles.map((uneBouteille, index) => (
    <Bouteille key={index} uneBouteille={uneBouteille} {...uneBouteille} />
  ));

  return (
    <div>
       <div className="cellier">
          <div className="cellier-header">
            <h2 className="cellier-titre">Mon cellier</h2>
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
