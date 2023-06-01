import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const AdminStatistique = () => {

    const estConnecte = useSelector(state => state.auth.estConnecte);
    const navigate = useNavigate();

    const [statistiques, setStatistiques] = useState({}); // Utilisation d'un objet pour stocker les statistiques

    let role = null;
    const usagerData = localStorage.getItem('usagerData');
    if (usagerData) {
      const parsedData = JSON.parse(usagerData);
      role = parsedData.role_usager;
    }

    useEffect(() => {
        if (!estConnecte || role !== 2) {
          navigate("/");
        }
    }, [estConnecte]);

    useEffect(() => {
      fetchStatistiques();
    }, []);


    function fetchStatistiques() {
        Promise.all([
            fetch("http://127.0.0.1:8000/api/usagers"),
            fetch("http://127.0.0.1:8000/api/celliers"),
            fetch("http://127.0.0.1:8000/api/bouteilles"),
            fetch("http://127.0.0.1:8000/api/cellier-bouteilles"),
        ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
            const [usagers, celliers, bouteilles, cellierBouteilles] = data;
            const nombreUsagers = usagers.length;
            const nombreCelliers = celliers.length;
            const nombreBouteilles = bouteilles.length;
            const nombreCellierBouteilles = cellierBouteilles.length;

            const celliersUsager = compterElementsParPropriete(celliers, 'usager_id');
            const totalQuantitesParCellier = calculerTotalQuantitesParCellier(cellierBouteilles);
            const celliersParUsager = regrouperCelliersParUsager(celliers);
            
            const quantitebouteilleCellierUsager = calculerQuantiteBouteillesParUsagerEtCellier(celliersParUsager, totalQuantitesParCellier);

            const valeurBouteilles = calculerValeurBouteillesParUsagerEtCellier(celliers, cellierBouteilles);

            const quantitesNouveauxUsagers = compterNouveauxUsagers(usagers);

            setStatistiques({ 
                nombreUsagers, 
                nombreCelliers, 
                nombreBouteilles,
                celliersUsager,
                quantitebouteilleCellierUsager,
                valeurBouteilles,
                quantitesNouveauxUsagers,
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des statistiques :", error);
        });
    }

    function compterElementsParPropriete(tableau, propriete) {
        const compteur = {};
      
        tableau.forEach(element => {
          const valeurPropriete = element[propriete];
      
          if (compteur.hasOwnProperty(valeurPropriete)) {
            compteur[valeurPropriete] += 1;
          } else {
            compteur[valeurPropriete] = 1;
          }
        });
      
        return compteur;
    }
      
    function calculerTotalQuantitesParCellier(bouteilles) {
        const totalQuantites = {};
      
        bouteilles.forEach(bouteille => {
          const cellierId = bouteille.cellier_id;
          const quantite = bouteille.quantite;
      
          if (totalQuantites.hasOwnProperty(cellierId)) {
            totalQuantites[cellierId] += quantite;
          } else {
            totalQuantites[cellierId] = quantite;
          }
        });
      
        return totalQuantites;
    }

    function regrouperCelliersParUsager(celliers) {
        const celliersParUsager = {};
      
        celliers.forEach(cellier => {
          const usagerId = cellier.usager_id;
      
          if (celliersParUsager.hasOwnProperty(usagerId)) {
            celliersParUsager[usagerId].push(cellier);
          } else {
            celliersParUsager[usagerId] = [cellier];
          }
        });
      
        return celliersParUsager;
    }

    function calculerQuantiteBouteillesParUsagerEtCellier(celliersParUsager, totalQuantitesParCellier) {
        const resultat = {};
      
        // Vérifier que celliersParUsager est un objet
        if (typeof celliersParUsager !== 'object' || Array.isArray(celliersParUsager)) {
          throw new Error("Le paramètre celliersParUsager doit être un objet.");
        }
        // Parcourir les propriétés de celliersParUsager
        for (const usagerId in celliersParUsager) {
            if (celliersParUsager.hasOwnProperty(usagerId)) {
            const celliers = celliersParUsager[usagerId];
            
                // Vérifier si l'usager a des celliers associés
                if (Array.isArray(celliers)) {
                // Parcourir les celliers de l'usager
                celliers.forEach(cellier => {
                    const cellierId = cellier.id;
        
                    // Vérifier si le cellier a une quantité associée
                    if (totalQuantitesParCellier.hasOwnProperty(cellierId)) {
                    // Vérifier si l'usager a déjà un tableau associé
                    if (!resultat.hasOwnProperty(usagerId)) {
                        resultat[usagerId] = [];
                    }
        
                    // Ajouter l'objet contenant l'usager, le cellier et la quantité
                    resultat[usagerId].push({
                        usagerId,
                        cellierId,
                        quantite: totalQuantitesParCellier[cellierId]
                    });
                    }
                });
                }
            }
        }
        return resultat;
    }

    function calculerValeurBouteillesParUsagerEtCellier(celliers, cellierBouteilles) {
        const valeurBouteillesParUsagerEtCellier = {};
      
        // Parcourir les celliers
        celliers.forEach(cellier => {
          const usagerId = cellier.usager_id;
          const cellierId = cellier.id;
      
          // Vérifier si l'usager existe dans l'objet des valeurs des bouteilles
          if (!valeurBouteillesParUsagerEtCellier.hasOwnProperty(usagerId)) {
            valeurBouteillesParUsagerEtCellier[usagerId] = {};
          }
      
          // Vérifier si le cellier existe dans l'objet des valeurs des bouteilles de l'usager
          if (!valeurBouteillesParUsagerEtCellier[usagerId].hasOwnProperty(cellierId)) {
            valeurBouteillesParUsagerEtCellier[usagerId][cellierId] = 0;
          }
      
          // Parcourir les bouteilles du cellier
          cellierBouteilles.forEach(bouteille => {
            if (bouteille.cellier_id === cellierId) {
              const quantite = bouteille.quantite;
              const prix = bouteille.prix;
      
              // Calculer la valeur des bouteilles pour le cellier
              const valeurCellier = quantite * prix;
      
              // Ajouter la valeur au total du cellier pour l'usager
              valeurBouteillesParUsagerEtCellier[usagerId][cellierId] += valeurCellier;
            }
          });
        });
      
        return valeurBouteillesParUsagerEtCellier;
    }

    function compterNouveauxUsagers(usagers) {
        const now = new Date(); // Date and time
    
        // Intervale de temps 
        const jourMeme = 1;
        const troisJours = 3;
        const semaine = 7;
    
        let nouveauxJourMeme = 0;
        let nouveauxTroisJours = 0;
        let nouveauxSemaine = 0;
    
        if (Array.isArray(usagers)) {
            usagers.forEach(usager => {
                const createdDate = new Date(usager.created_at);
                const diffTime = Math.abs(now - createdDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
                if (diffDays <= jourMeme) {
                    nouveauxJourMeme++;
                }
    
                if (diffDays <= troisJours) {
                    nouveauxTroisJours++;
                }
    
                if (diffDays <= semaine) {
                    nouveauxSemaine++;
                }
            });
        }
    
        return {
            jourMeme: nouveauxJourMeme,
            troisJours: nouveauxTroisJours,
            semaine: nouveauxSemaine
        };
    }

    return (
      <>
        {estConnecte && role === 2 ? (
            <section className="statistique">
                <h1>Statistique du site</h1>
                <div className="statistique-contenu">
                  <div>
                    <h3>Général :</h3>
                    <div>
                      <p>Nombre d'usager : <strong>{statistiques.nombreUsagers}</strong></p>
                      <p>Nombre de cellier : <strong>{statistiques.nombreCelliers}</strong></p>
                      <p>Nombre de bouteille : <strong>{statistiques.nombreBouteilles}</strong></p>
                    </div>
                  </div>
                  <div>
                    <h3>Nouveau usager :</h3>
                    <div>
                      <p>Nouveaux usagers aujourd'hui : <strong>{statistiques.quantitesNouveauxUsagers?.jourMeme ?? 0}</strong></p>
                      <p>Nouveaux usagers dans les 3 derniers jours : <strong>{statistiques.quantitesNouveauxUsagers?.troisJours ?? 0}</strong></p>
                      <p>Nouveaux usagers dans la semaine : <strong>{statistiques.quantitesNouveauxUsagers?.semaine ?? 0}</strong></p>
                    </div>
                  </div>
                  <div>
                    <h3>Nombre de cellier par usager :</h3>
                    <ul className="statistique-liste">
                    {typeof statistiques.celliersUsager === 'object' && Object.entries(statistiques.celliersUsager).map(([usagerId, nombreCelliers]) => (
                        <li key={usagerId}>Usager {usagerId} : <strong>{nombreCelliers}</strong> celliers</li>
                    ))}
                    </ul>   
                  </div>
                  <div>
                    <h3>Nombre de bouteille par cellier et par usager :</h3>
                    <ul className="statistique-liste">
                        {typeof statistiques.quantitebouteilleCellierUsager === 'object' &&
                        Object.entries(statistiques.quantitebouteilleCellierUsager).map(([usagerId, celliers]) => (
                        <li key={usagerId}>
                             <strong> Usager {usagerId}</strong> :
                            <ul className="statistique-liste-2">
                            {celliers.map(cellier => (
                                <li key={cellier.cellierId}>Cellier {cellier.cellierId} : <strong>{cellier.quantite}</strong> bouteilles </li>
                            ))}
                            </ul>
                        </li>
                        ))}
                    </ul>
                  </div>   
                  <div>
                    <h3>La valeur total des bouteilles par usager et par cellier :</h3>    
                    <ul className="statistique-liste">
                        {typeof statistiques.valeurBouteilles === 'object' &&
                        Object.entries(statistiques.valeurBouteilles).map(([usagerId, celliers]) => (
                        <li key={usagerId}>
                            <strong>Usager {usagerId}</strong> :
                            <ul className="statistique-liste-2">
                            {Object.entries(celliers).map(([cellierId, prixTotal]) => (
                                <li key={cellierId}>Cellier {cellierId} : <strong>{prixTotal} $ </strong> </li>
                            ))}
                            </ul>
                        </li>
                        ))}
                    </ul>
                  </div>  
                </div>
            </section>
        ) : (
          navigate("/")
        )}
      </>
    );
}

export default AdminStatistique;


// le nombre de bouteille par cellier et par usager.
// Le nombre de bouteille bu et partager dans un temps donné.
// Le nombre de bouteille ajouté dans un temps donné.