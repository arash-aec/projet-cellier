import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Cellier from "../../composants/Cellier/Cellier";

const ListeCellier = (props) => {
  const [miseAJour, setMiseAJour] = useState(false);
  const [celliers, setCelliers] = useState([]);
  const reference = useRef(null);

  // const {connecter} = props;

  useEffect(() => {
    // console.log(props)
    const elements = reference.current;
    getCelliers();
  }, [miseAJour]);

  useEffect(() => {
    const elements = reference.current;

    // Evite le doublon a l'ajout d'un cellier
    if (elements) {
      const btnAjouter = elements.querySelector('[data-js-ajouter]');
      btnAjouter.addEventListener("click", ajouterCellier);

      return () => {
        btnAjouter.removeEventListener("click", ajouterCellier);
      };
    }
  }, []);

  function getCelliers() {
    fetch("http://127.0.0.1:8000/api/celliers")
      .then((data) => data.json())
      .then((data) => {
        setCelliers(data);
        setMiseAJour(false);
      });
  }

  function ajouterCellier(e) {
    e.preventDefault();
    const nouveauCellier = {
      nom: 'Nouveau Cellier',
      usager_id: 1,
    };

    fetch("http://127.0.0.1:8000/api/cellier/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nouveauCellier),
    })
      .then((response) => response.json())
      .then((data) => {
        setCelliers([...celliers, data]);
        setMiseAJour(true);
      });
  }

  const supprimeCellier = (cellierId) => {
    setCelliers(celliers.filter((cellier) => cellier.id !== cellierId));
    setMiseAJour(true);
  };

  const modifieCellier = (cellierId) => {
    setCelliers(celliers.filter((cellier) => cellier.id !== cellierId));
    setMiseAJour(true);
  };

  const htmlCellier = celliers.map((unCellier, index) => (
    <Cellier key={index} unCellier={unCellier} {...unCellier} onCellierSupprime={supprimeCellier} onCellierModifie={modifieCellier} />
  ));

  return (
      <div className="cellier" ref={reference}>
        <section className="header-image">
            <img src="../public/images/cellier.jpeg" alt="image d'un cellier"/>
            <div className="header-contenu">
                <h1>Cellier</h1>
                <div className="header-image-btn">
                  <div>
                    <button className="bouton header-button" data-js-ajouter>Ajoute un cellier</button>
                  </div>
                </div>
            </div>
        </section>  
        <div className="cellier-liste">{htmlCellier}</div>
      </div>
  )
}
export default ListeCellier
