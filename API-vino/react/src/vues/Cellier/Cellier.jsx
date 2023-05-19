import React, { useState, useEffect } from "react";
import ListeCellier from "../../ListeCellier/ListeCellier";

const Cellier = () => {

  let [miseAJour, setMiseAJour] = useState(false);
  let [celliers, setCelliers] = useState([]);

  useEffect(() => {
    getCelliers();
  }, [miseAJour]);

  function getCelliers() {
    fetch("http://127.0.0.1:8000/api/celliers")
      .then((data) => data.json())
      .then((data) => {
        setCelliers(data);
        setMiseAJour(false);
      });
  }

  const htmlProduit = celliers.map((unCellier, index) => (
      <div key={index}>
        <p><strong>{unCellier.nom}</strong></p>
        <p>{unCellier.usager_id}</p>
      </div>
  ));

  return (
      <div className="cellier">
        <section className="header-image">
            <img src="../public/images/cellier.jpeg" alt="image d'un cellier"/>
            <div className="header-contenu">
                <h1>Cellier</h1>
                <div className="header-image-btn">
                  <div>
                    <a className="bouton header-button" href="#">Ajoute un cellier</a>
                  </div>
                </div>
            </div>
        </section>  
        <div>{htmlProduit}</div>
      </div>
  )
}
export default Cellier
