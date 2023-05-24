import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Bouteille from "../../composants/Bouteille/Bouteille";
import AjoutBouteille from "../Formulaire/AjoutBouteille";

const ListeBouteille = () => {
  let [miseAJour, setMiseAJour] = useState(false);
  let [bouteilles, setBouteilles] = useState([]);
  const [rechercheBouteille, setRechercheBouteille] = useState("");
  const [isRechercheVisible, setEstRechercheVisible] = useState(false);

  // Récupération de l'id du cellier
  const {id} = useParams();

  // Récupération du non de cellier avec l'URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nomCellier = searchParams.get('nom');

  // Bouton ajouter 
  const reference = useRef(null);

  useEffect(() => {
    getBouteilles();

    const elements = reference.current;
    gereDOM(elements);
  }, [miseAJour]);

  function getBouteilles() {
    fetch("http://127.0.0.1:8000/api/bouteilles/" + id)
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        setBouteilles(data);
        setMiseAJour(false);
      });
  }

  function gereDOM(elements) {
    if (elements) {
      // Gestion modal AjoutBouteille 
      const btnAjoutBouteille = elements.querySelector('[data-js-ajout-bouteille-btn]');
      const modalOverlayAjoutBouteille = document.querySelector(".modal-overlay-ajoutBouteille");
      const modalAjoutBouteille = document.querySelector(".modal-ajoutBouteille");
      const closeBtnAjoutBouteille = document.querySelector(".close-btn-ajoutBouteille");

      btnAjoutBouteille.addEventListener("click", function(e) {
        e.preventDefault();
        modalOverlayAjoutBouteille.style.display = "block";
        modalAjoutBouteille.style.display = "block";
      });

      closeBtnAjoutBouteille.addEventListener("click", function() {
        modalOverlayAjoutBouteille.style.display = "none";
        modalAjoutBouteille.style.display = "none";
      });    
    }
  }

  const ajouteQuantiteBouteille = (index) => {
    setBouteilles(bouteilles.filter((_, idx) => idx !== index));
    setMiseAJour(true);
  };
  
  const boireBouteille = (index) => {
    setBouteilles(bouteilles.filter((_, idx) => idx !== index));
    setMiseAJour(true);
  };
  const modifierQuantiteBouteille = (index) => {
    setBouteilles(bouteilles.filter((_, idx) => idx !== index));
    setMiseAJour(true);
  };
  const bouteilleAjouterCellier = (index) => {
    setBouteilles((bouteilles) => [...bouteilles.filter((_, idx) => idx !== index)]);
    // setAjoutBouteille(true);
    setMiseAJour(true);
  };

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


// rechercher la bouteille

  const handleRechercheInputChange = (e) => {
    const nouvelleRecherche = e.target.value;
    setRechercheBouteille(nouvelleRecherche);

    if (nouvelleRecherche.trim() === "") {
      // La requête de recherche est vide, réinitialiser et afficher toutes les bouteilles
      getBouteilles();
    } else {
      BouteilleRecherche(nouvelleRecherche);
    }
  };

  const BouteilleRecherche = (query) => {
    const filteredBouteilles = bouteilles.filter((bouteille) =>
      bouteille.nom.toLowerCase().includes(query.toLowerCase())
    );
    setBouteilles(filteredBouteilles);
  };

  const handleRechercheIconClick = (e) => {
    e.preventDefault();
    setEstRechercheVisible(!isRechercheVisible);
    setRechercheBouteille("");
    if (isRechercheVisible) {
      // Afficher le champ de saisie et le mettre en évidence
      const rechercheInput = document.getElementById("RechercheInput");
      rechercheInput.focus();
    }
  };
  

  const htmlBouteille = bouteilles.map((uneBouteille) => (
    <Bouteille
     key={uneBouteille.id} 
     uneBouteille={uneBouteille} 
     idCellier={id} 
     {...uneBouteille} 
     onBouteilleAjouter={ajouteQuantiteBouteille} 
     onBouteilleBoire={boireBouteille}
     onBouteilleModifie={modifierQuantiteBouteille} />
  ));

  return (
    <div ref={reference}>
      <div className="cellier">
        <div className="cellier-header">
          <h2 className="cellier-titre">{nomCellier}</h2>
          <a href="" id="open-modal-ajoutBouteille-btn" className="cellier-lien" data-js-ajout-bouteille-btn>Ajouter une bouteille</a>
          <label htmlFor="searchInput" className="recherche-label">Rechercher <a href="" onClick={handleRechercheIconClick}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </a>
            {isRechercheVisible && (
              <input
                type="text"
                id="RechercheInput"
                value={rechercheBouteille}
                onChange={handleRechercheInputChange}
              />
            )}
          </label>
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
      <AjoutBouteille idCellier={id} onBouteilleAjoutCellier={bouteilleAjouterCellier} />
      
    </div>
  );
  
};

export default ListeBouteille;