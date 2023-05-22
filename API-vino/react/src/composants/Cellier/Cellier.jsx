import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Cellier(props) {
    const { id, nom, onCellierSupprime, onCellierModifie } = props;
    const reference = useRef(null);

    useEffect(() => {
        const elements = reference.current;
        gereBouton(elements);
    }, []);

    function gereBouton(elements) {
        if (elements) {
            const btnModifier = elements.querySelector('[data-js-modifier]');
            const btnSupprimer = elements.querySelector('[data-js-supprimer]');

            // Supprimer un Cellier
            btnSupprimer.addEventListener("click", () => supprimerCellier(id));
            // Modifier un Cellier
            btnModifier.addEventListener("click", () => modifierCellier(id));
            return () => {
                btnSupprimer.removeEventListener("click", () => supprimerCellier(id));
                btnModifier.removeEventListener("click", () => modifierCellier(id));
            };  
        }
    }

    function supprimerCellier() {
        fetch(`http://127.0.0.1:8000/api/cellier/${id}`, {
        method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
            // Fonction de rappel pour informer le parent de la suppression
            onCellierSupprime(id);
            } else {
            console.error('Erreur lors de la suppression du cellier');
            }
        });
    }

    function modifierCellier() {
        const nomCellier = document.querySelector(`.cellier-item[data-id="${id}"] .cellier-nom`);
        const formCellier = document.querySelector(`.cellier-item[data-id="${id}"] .cellier-form`);
        const btnValiderNom = document.querySelector(`.cellier-item[data-id="${id}"] [data-js-valider]`);

        nomCellier.style.display = "none";
        formCellier.style.display = "flex";

        btnValiderNom.addEventListener('click', ()=>{
            const nouveauNomInput = reference.current.querySelector('input[name="nom"]');
            const nouveauNom = nouveauNomInput.value;

            fetch(`http://127.0.0.1:8000/api/cellier/${id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                nom: nouveauNom,
                }),
            })
            .then((response) => {
            if (response.ok) {
                // Fonction de rappel pour informer le parent de la modification
                onCellierModifie(id);
                console.log("modification réussi")
            } else {
                console.error('Erreur lors de la modification du cellier');
            }
            })

            nomCellier.style.display = "block";
            formCellier.style.display = "none"; 
        });
    };
   
    return(
        <div key={id} className="cellier-item" ref={reference} data-id={id}>
            <h2 className="cellier-nom">{nom}</h2>
            <form action="" className="cellier-form">
                <input type="text" name="nom" placeholder="Nouveau nom" />
                <i className="cellier-icone__fa fa fa-check" data-js-valider><p><small>Valider</small></p></i>
            </form>
            <div className="cellier-icone">
            <i className="cellier-icone__fa fa fa-edit" data-js-modifier><p><small>Modifier</small></p></i>
            <i className="cellier-icone__fa fa fa-trash" data-js-supprimer><p><small>Supprimer</small></p></i>
            <Link to="/ListeBouteille"><i className="cellier-icone__fa fa fa-eye"><p><small>Voir</small></p></i></Link>
            </div>
        </div>
    )
}