import React, { useState, useEffect, useRef } from "react";
import ValidationBouteille from "../../composants/Validation/ValidationBouteille";

const ModifieBouteille = (props) => {
  const formRef = useRef(null);
  const { detailsBouteille, onBouteilleModifier, idCellier, idBouteille } = props;
  const [erreur, setErreur] = useState({});
  const [values, setValues] = useState({
    bouteille_id: "",
    cellier_id: "",
    millesime: "",
    quantite: "",
    date_achat: "",
    prix: "",
    garde_jusqua: "",
    notes: "",
  });

  useEffect(() => {
    const modalModifieBouteille = document.querySelector(".modal-modifieBouteille");
    if (detailsBouteille.length > 0) {
      modalModifieBouteille.querySelector("[name='bouteille_id']").value = idBouteille || "";
      modalModifieBouteille.querySelector("[name='cellier_id']").value = idCellier || "";
      modalModifieBouteille.querySelector("[name='millesime']").value = detailsBouteille[0].millesime || "";
      modalModifieBouteille.querySelector("[name='quantite']").value = detailsBouteille[0].quantite || "";
      modalModifieBouteille.querySelector("[name='date_achat']").value = detailsBouteille[0].date_achat.substring(0, 10) || "";
      modalModifieBouteille.querySelector("[name='prix']").value = detailsBouteille[0].prix || "";
      modalModifieBouteille.querySelector("[name='garde_jusqua']").value = detailsBouteille[0].garde_jusqua || "";
      modalModifieBouteille.querySelector("[name='notes']").value = detailsBouteille[0].notes || "";
    }
    const closeBtnModifieBouteille = document.querySelector(".close-btn-modifieBouteille");
    const modalOverlayModifieBouteille = document.querySelector(".modal-overlay-modifieBouteille");
    closeBtnModifieBouteille.addEventListener("click", function() {
      modalOverlayModifieBouteille.style.display = "none";
      modalModifieBouteille.style.display = "none";
      setErreur({});
      setValues({
        bouteille_id: "",
        cellier_id: "",
        millesime: "", 
        quantite: "",
        date_achat: "",
        prix: "",
        garde_jusqua: "",
        notes: "",
      });
    });

  }, [detailsBouteille]);

  useEffect(() => {
    if (detailsBouteille.length > 0) {
      const selectedBouteille = detailsBouteille.find(
        (bouteille) => bouteille.bouteille_id === idBouteille
      );
      if (selectedBouteille) {
        setValues((prevValues) => ({
          ...prevValues,
          bouteille_id: idBouteille,
          cellier_id: idCellier,
          millesime: selectedBouteille.millesime,
          quantite: selectedBouteille.quantite,
          date_achat: selectedBouteille.date_achat.substring(0, 10),
          prix: selectedBouteille.prix,
          garde_jusqua: selectedBouteille.garde_jusqua,
          notes: selectedBouteille.notes,
        }));
      }
    }
  }, [detailsBouteille]);


  const handleAjouterClick = (e) => {
    e.preventDefault();
    const erreurs = ValidationBouteille(values);
    setErreur(erreurs);

    if (Object.keys(erreurs).length === 0) {
      const bouteilleCellier = {
          bouteille_id: idBouteille,
          cellier_id: idCellier,
          quantite: values.quantite,
          date_achat: values.date_achat,
          millesime: values.millesime,
          prix: values.prix,
          garde_jusqua: values.garde_jusqua,
          notes: values.notes,
      };
      
      fetch(`http://127.0.0.1:8000/api/cellier-bouteilles/${idBouteille}/${idCellier}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bouteilleCellier),
      })
        .then((response) => {
          if (response.status === 200) {
            const modalOverlayModifieBouteille = document.querySelector(".modal-overlay-modifieBouteille");
            const modalModifieBouteille = document.querySelector(".modal-modifieBouteille");
            modalOverlayModifieBouteille.style.display = "none";
            modalModifieBouteille.style.display = "none";
            props.onBouteilleModifier(values.bouteille_id)
            return response.json();
          } else {
            throw new Error("Erreur");
          }
        })
        .catch((error) => {
          setErreur(erreurs);
        });
      
      setValues({
        bouteille_id: "",
        cellier_id: "",
        millesime: "", 
        quantite: "",
        date_achat: "",
        prix: "",
        garde_jusqua: "",
        notes: "",
      });
    }
  };
    
  useEffect(() => {
    const form = formRef.current;
    if (form) {
      form.addEventListener("submit", handleAjouterClick);
    }

    return () => {
      if (form) {
        form.removeEventListener("submit", handleAjouterClick);
      }
    };
  }, [values]);
  

  return (
    <div className="modifier">
      <div className="modal-overlay-modifieBouteille">
        <div className="modal-modifieBouteille">
          <span className="close-btn-modifieBouteille" >&times;</span>
          <h2>Modifier une bouteille</h2>
          <form ref={formRef} className="nouvelleBouteille">
            <div>
              <input type="hidden" name="bouteille_id" value={idBouteille} />
              <input type="hidden" name="cellier_id" value={idCellier} />
              <label htmlFor="millesime">Millesime : * </label>
              <input name="millesime" id="millesime" placeholder="Une année (ex : 2020)" onChange={(e) => setValues((prevState) => ({ ...prevState, millesime: e.target.value })) }  value={values.millesime}  />
              {erreur.millesime && <p className="error-message">{erreur.millesime}</p>}
              <label htmlFor="quantite">Quantite : * </label>
              <input name="quantite" id="quantite" placeholder="Veuillez entrer une quantité" onChange={(e) => setValues((prevState) => ({ ...prevState, quantite: e.target.value })) }  value={values.quantite} />
              {erreur.quantite && <p className="error-message">{erreur.quantite}</p>}
              <label htmlFor="date_achat">Date achat : *</label>
              <input name="date_achat" id="date_achat" placeholder="Format : aaaa-mm-jj" onChange={(e) => setValues((prevState) => ({ ...prevState, date_achat: e.target.value })) } value={values.date_achat}  />
              {erreur.date_achat && <p className="error-message">{erreur.date_achat}</p>}
              <label htmlFor="prix">Prix : * </label>
              <input name="prix" id="prix" placeholder="Veuillez entrer le prix d'achat" onChange={(e) => setValues((prevState) => ({ ...prevState, prix: e.target.value })) }  value={values.prix} />
              {erreur.prix && <p className="error-message">{erreur.prix}</p>}
              <label htmlFor="garde_jusqua">Garde : * </label>
              <input name="garde_jusqua" id="garde_jusqua" placeholder="Nombre d'années (ex : 20)" onChange={(e) => setValues((prevState) => ({ ...prevState, garde_jusqua: e.target.value })) } value={values.garde_jusqua}  />
              {erreur.garde_jusqua && <p className="error-message">{erreur.garde_jusqua}</p>}
              <label htmlFor="notes">Note : * </label>
              <input name="notes" id="notes" placeholder="Un chiffre de 1 à 5" onChange={(e) => setValues((prevState) => ({ ...prevState, notes: e.target.value })) } value={values.notes}  />
              {erreur.notes && <p className="error-message">{erreur.notes}</p>}
              <small>* Champs obligatoires</small>
            </div>
            {/* <!-- Bouton pour ajouter la nouvelle bouteille --> */}
            <input type="submit" name="ajouterBouteilleCellier" className="btn-ajouter" value="Modifier" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifieBouteille;
