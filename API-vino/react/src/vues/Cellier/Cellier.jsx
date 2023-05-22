import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <Link to="/ListeBouteille">
      <div key={index} className="cellier-item">
        <h2>{unCellier.nom}</h2>
      </div>
    </Link>
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
        <div className="cellier-liste">{htmlProduit}</div>
      </div>
  )
}
export default Cellier
