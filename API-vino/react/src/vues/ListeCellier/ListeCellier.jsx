import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Cellier from "../../composants/Cellier/Cellier";

const ListeCellier = () => {

  const [miseAJour, setMiseAJour] = useState(false);
  const [celliers, setCelliers] = useState([]);
  const reference = useRef(null);

  const estConnecte = useSelector(state => state.auth.estConnecte);
  const navigate = useNavigate();
  
  useEffect(() => {
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
    // Récupération de l'id_usager depuis le localStorage
    let id_usager = null;
    const usagerData = localStorage.getItem('usagerData');
    if (usagerData) {
      const parsedData = JSON.parse(usagerData);
      id_usager = parsedData.id_usager;
    }

    if (id_usager) {
      fetch("http://127.0.0.1:8000/api/celliers/" + id_usager)
        .then((data) => data.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCelliers(data);
            setMiseAJour(false);
          } else {
            // Gérer le cas où data n'est pas un tableau
          }
        });
    }
  }

  function ajouterCellier(e) {
    e.preventDefault();

    // Récupération de l'id_usager depuis le localStorage
    let id_usager = null;
    const usagerData = localStorage.getItem('usagerData');
    if (usagerData) {
      const parsedData = JSON.parse(usagerData);
      id_usager = parsedData.id_usager;
    }
    
    const nouveauCellier = {
      nom: 'Nouveau Cellier',
      usager_id: id_usager,
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
    <>
      { estConnecte ? (
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
          <div className="liste-cellier">{htmlCellier}</div>
        </div>
      ) : ( navigate("/") ) }
    </>
  )
}
export default ListeCellier
