import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './ListeAchat.css';

import BouteilleListe from "../../composants/Bouteille/BouteilleListe";

const ListeAchat = () => {

  const [miseAJour, setMiseAJour] = useState(false);
  const [bouteillesListe, setBouteillesListe] = useState([]);
  const [bouteilles, setBouteilles] = useState([]);
  const [rechercheBouteille, setRechercheBouteille] = useState("");
  const [isRechercheVisible, setEstRechercheVisible] = useState(false);

  const estConnecte = useSelector(state => state.auth.estConnecte);
  const navigate = useNavigate();

  // Bouton ajouter 
  const reference = useRef(null);

  // Récupération de l'id de l'usager
  let id_usager = null;
  const usagerData = localStorage.getItem('usagerData');
  if (usagerData) {
    const parsedData = JSON.parse(usagerData);
    id_usager = parsedData.id_usager;
  }

  useEffect(() => {
    getBouteilles();
  }, [miseAJour]);

  useEffect(() => {
    getDetailsBouteilles(bouteillesListe);
  }, [bouteillesListe]);

  function getBouteilles() {
    fetch("http://127.0.0.1:8000/api/liste-achat/" + id_usager, {
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5173"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur de requête: ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setBouteillesListe(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getDetailsBouteilles(data) {  
    // Parcourir chaque élément dans data et effectuer une requête fetch pour chaque bouteille_id
    const fetchPromises = data.map((item) =>
      fetch(`http://127.0.0.1:8000/api/bouteille/${item.bouteille_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur de requête: ' + response.status);
          }
          return response.json();
        })
        .catch((error) => {
          console.error(error);
        })
    );
  
    // Attendre que toutes les requêtes fetch se terminent
    Promise.all(fetchPromises)
      .then((nouvellesBouteilles) => {
        const bouteillesAvecQuantite = nouvellesBouteilles.map((bouteille, index) => {
          if (bouteillesListe.length > index && bouteillesListe[index].hasOwnProperty('quantite')) {
            return {
              ...bouteille,
              // Ajouter la quantité correspondante de la liste d'achat
              quantite: bouteillesListe[index].quantite 
            };
          } else {
            return bouteille;
          }
        });
        setBouteilles(bouteillesAvecQuantite);
      });
  }

  const supprimeBouteille = (index) => {
    setBouteilles(bouteilles.filter((_, idx) => idx !== index));
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
    <BouteilleListe
     key={uneBouteille.id} 
     {...uneBouteille} 
     id_usager={id_usager}
     onBouteilleSupprime={supprimeBouteille} />
  ));

  return (
    <>
      { estConnecte ? (
        <div ref={reference}>
          <div className="cellier">
            <div className="cellier-header">
              <h2 className="cellier-titre">Ma liste</h2>
              <div className="filtre">
                <label htmlFor="RechercheInput" className="recherche-label">Rechercher <a href="" onClick={handleRechercheIconClick}>
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
            </div>
            <div className="">
              <div className="liste-bouteille">{htmlBouteille}</div>
            </div>
          </div>
        </div>
      ) : ( navigate("/") ) }
    </>
  ); 
};

export default ListeAchat;