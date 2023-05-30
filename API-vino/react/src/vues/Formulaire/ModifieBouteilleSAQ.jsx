import React, { useState, useEffect } from "react";
import ValidationBouteilleSAQ from "../../composants/Validation/ValidationBouteilleSAQ";

const ModifieBouteilleSAQ = () => {
    const [erreurs, setErreur] = useState({});
    const [values, setValues] = useState({
        nom: '',
        pays: '',
        description: '',
        prix_saq: '',
        garde_jusqua: '',
        url_saq: '',
        url_img: '',
        format: '',
        type: '',
    })

    useEffect(() => {

        const inputNomBouteille = document.querySelector("[name='nom_bouteille']");
        const liste = document.querySelector('.listeAutoComplete');
        const modalOverlayModifieBouteille = document.querySelector(".modal-overlay-modifieBouteille");
        const modalModifieBouteille = document.querySelector(".modal-modifieBouteille");
    
        modalModifieBouteille.querySelector("[name='nom']").value = values.nom || '';
        modalModifieBouteille.querySelector("[name='pays']").value = values.pays || '';
        modalModifieBouteille.querySelector("[name='description']").value = values.description || '';
        modalModifieBouteille.querySelector("[name='prix_saq']").value = values.prix_saq || '';
        modalModifieBouteille.querySelector("[name='url_saq']").value = values.url_saq || '';
        modalModifieBouteille.querySelector("[name='url_img']").value = values.url_img || '';
        modalModifieBouteille.querySelector("[name='format']").value = values.format || '';
        modalModifieBouteille.querySelector("[name='type']").value = values.type || '';

        const handleKeyUp = (evt) => {
            const nom = evt.target.value;
            liste.innerHTML = "";
            if (nom) {
                fetch("http://127.0.0.1:8000/api/bouteilles/autocompleteBouteille", { 
                    method: 'POST', 
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({ nom: nom }) 
                })
                    .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error('Erreur');
                    }
                    })
                    .then(response => {
                    // Affichage des résultats de l'autocomplétion
                    response.forEach(function (element) {
                        liste.innerHTML += "<li data-id='" + element.id + "'>" + element.nom + "</li>";
                    })
                    }).catch(error => {
                    console.error(error);
                    });
            }
        };
  
        if (inputNomBouteille) {
        inputNomBouteille.addEventListener("keyup", handleKeyUp);
        }
    
        const handleClick = (evt) => {
            if (evt.target.tagName === "LI") {
            const bouteille = {
                nom: modalModifieBouteille.querySelector(".nom_bouteille"),
            };
    
            bouteille.nom.dataset.id = evt.target.dataset.id;
            bouteille.nom.innerHTML = evt.target.innerHTML;
    
            liste.innerHTML = "";
            inputNomBouteille.value = "";

            // Récupération des information de la bouteille 
            const id_bouteille = bouteille.nom.dataset.id;
            fetch(`http://127.0.0.1:8000/api/bouteille/${id_bouteille}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setValues(data);
                }).catch(error => {
                    console.error(error);
                });
            }
        };

        if (liste) {
        liste.addEventListener("click", handleClick);
        }
    
        const handleAjouterClick = (e) => {
            e.preventDefault();

            // Effectuez la validation des valeurs
            const erreurs = ValidationBouteilleSAQ(values);
            setErreur(erreurs);

            if (Object.keys(erreurs).length === 0) {

                const bouteille = {
                    bouteille_id: modalModifieBouteille.querySelector(".nom_bouteille").dataset.id,
                    nom: modalModifieBouteille.querySelector("[name='nom']").value,
                    pays: modalModifieBouteille.querySelector("[name='pays']").value,
                    description : modalModifieBouteille.querySelector("[name='description']").value,
                    prix_saq : modalModifieBouteille.querySelector("[name='prix_saq']").value,
                    url_saq : modalModifieBouteille.querySelector("[name='url_saq']").value,
                    url_img : modalModifieBouteille.querySelector("[name='url_img']").value,
                    format : modalModifieBouteille.querySelector("[name='format']").value,
                    type : modalModifieBouteille.querySelector("[name='type']").value,
                };

                const resetForm = () => {
                    inputNomBouteille.value = "";
                    liste.innerHTML = "";
                    modalModifieBouteille.querySelector(".nom_bouteille").dataset.id = "";
                    modalModifieBouteille.querySelector(".nom_bouteille").innerHTML = "";
                    modalModifieBouteille.querySelector("[name='nom']").value = "";
                    modalModifieBouteille.querySelector("[name='pays']").value = "";
                    modalModifieBouteille.querySelector("[name='description']").value = "";
                    modalModifieBouteille.querySelector("[name='prix_saq']").value = "";
                    modalModifieBouteille.querySelector("[name='url_saq']").value = "";
                    modalModifieBouteille.querySelector("[name='url_img']").value = "";
                    modalModifieBouteille.querySelector("[name='format']").value = "";
                    modalModifieBouteille.querySelector("[name='type']").value = "";
                };

                // console.log(bouteille)
                fetch(`http://127.0.0.1:8000/api/bouteille/${bouteille.bouteille_id}`, { 
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(bouteille) 
                })
                .then(response => {
                    if (response.status === 200) {
                    resetForm();
                    modalOverlayModifieBouteille.style.display = "none";
                    modalModifieBouteille.style.display = "none";
                    console.log("Bouteille modifiée");
                    return response.json();
                    } else {
                    throw new Error('Erreur');
                    }
                })
                .catch(error => {
                    // setErreur(erreurs);
                });
            }
        };
    
        const form = modalModifieBouteille.querySelector("form");

        if (form) {
            form.addEventListener("submit", handleAjouterClick);
        }

        return () => {
            if (inputNomBouteille) {
                inputNomBouteille.removeEventListener("keyup", handleKeyUp);
            }

            if (liste) {
                liste.removeEventListener("click", handleClick);
            }

            if (form) {
                form.removeEventListener("submit", handleAjouterClick);
            }
        };
    }, [values]);
  
    return (
        <div className="ajouter">
            <div className="modal-overlay-modifieBouteille">
                <div className="modal-modifieBouteille">
                    <span className="close-btn-modifieBouteille" >&times;</span>
                    <h2>Modifier une bouteille</h2>
                    {/* <!-- Formulaire pour ajouter une nouvelle bouteille --> */}
                    <form className="nouvelleBouteille">
                        <label htmlFor="nom_bouteille">Recherche : </label> 
                        <input type="text" name="nom_bouteille" id="nom_bouteille" className="rechercheListeBouteille" />
                        <ul className="listeAutoComplete"></ul>
                        {/* <!-- Affichage de la bouteille trouvée grâce à l'autocomplétion --> */}
                        <div>
                            <label htmlFor="nom_bouteille">Nom :</label>
                            <strong data-id="" className="nom_bouteille" id="nom_bouteille"></strong>
                            <input name="nom" id="nom_bouteille" onChange={(e) => setValues({ ...values, nom: e.target.value })} required />
                            <label htmlFor="pays">Pays : * </label>
                            <input name="pays" id="pays" onChange={(e) => setValues({ ...values, pays: e.target.value })} required />
                            {erreurs.pays && <p className="error-message">{erreurs.pays}</p>}
                            <label htmlFor="description">Description : * </label>
                            <input name="description" id="description" onChange={(e) => setValues({ ...values, description: e.target.value })} required />
                            {erreurs.quantite && <p className="error-message">{erreurs.description}</p>}
                            <label htmlFor="prix_saq">Prix : *</label>
                            <input name="prix_saq" id="prix_saq" onChange={(e) => setValues({ ...values, prix_saq: e.target.value })} required />
                            {erreurs.prix_saq && <p className="error-message">{erreurs.prix_saq}</p>}
                            <label htmlFor="url_saq">URL de la bouteille : * </label>
                            <input name="url_saq" id="url_saq" onChange={(e) => setValues({ ...values, url_saq: e.target.value })} required />
                            {erreurs.prix && <p className="error-message">{erreurs.url_saq}</p>}
                            <label htmlFor="url_img">URL de l'image : * </label>
                            <input name="url_img" id="url_img" onChange={(e) => setValues({ ...values, url_img: e.target.value })} required />
                            {erreurs.url_img && <p className="error-message">{erreurs.url_img}</p>}
                            <label htmlFor="format">Format : * </label>
                            <input name="format" id="format" onChange={(e) => setValues({ ...values, format: e.target.value })} required />
                            <label htmlFor="type">Type : * </label>
                            <input name="type" id="type" onChange={(e) => setValues({ ...values, type: e.target.value })} required />
                            {erreurs.type && <p className="error-message">{erreurs.type}</p>}
                                <small>* Champs obligatoires</small>
                        </div>
                        {/* <!-- Bouton pour ajouter la nouvelle bouteille --> */}
                        <input type="submit" name="modifierBouteille" className="btn-ajouter" value="Modifier" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModifieBouteilleSAQ;

