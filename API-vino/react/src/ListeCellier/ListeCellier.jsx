import React, { useState, useEffect } from "react";
import Produit from "../composants/Produit/Produit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const ListeCellier = (props) => {
  let [miseAJour, setMiseAJour] = useState(false);
  let [produits, setProduits] = useState([]);

  useEffect(() => {
    getBouteilles();
  }, [miseAJour]);

  function getBouteilles() {
    fetch("http://127.0.0.1:8000/api/listeCellier")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setProduits(data);
        setMiseAJour(false);
      });
  }

  const htmlProduit = produits.map((unProduit, index) => (
    <Produit key={index} unProduit={unProduit} {...unProduit} />
  ));

  return (
    <div>
      <div className="items">{htmlProduit}</div>
    </div>
  );
};

export default ListeCellier;
