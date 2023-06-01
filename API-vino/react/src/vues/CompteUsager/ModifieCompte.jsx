import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ValidationInscription from "../../composants/Validation/ValidationInscription";

const ModifieCompte = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [courriel, setCourriel] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [mot_de_passe_confirmation, setMot_de_passe_confirmation] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUsager();
  }, []);

  function getUsager() {
    fetch(`http://127.0.0.1:8000/api/usager/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setNom(data.nom);
        setPrenom(data.prenom);
        setCourriel(data.courriel);
        setRole(data.role);
        setMotDePasse(data.mot_de_passe);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = ValidationInscription({
      nom,
      prenom,
      courriel,
      mot_de_passe,
      mot_de_passe_confirmation
    });
  
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }
  
    if (mot_de_passe !== mot_de_passe_confirmation) {
      setErrors({
        ...errors,
        mot_de_passe_confirmation: "Les mots de passe ne correspondent pas.",
      });
      return;
    }
  
    const updatedUsager = {
      id,
      nom,
      prenom,
      courriel,
      mot_de_passe,
      role,
    };
  
    fetch(`http://127.0.0.1:8000/api/modifierUsager/${id}`, {
      method: "PUT", // Use PUT method for updating existing resource
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUsager),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/votreCompte/" + id , { replace: true });
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
        setErrors({ courriel: "L'adresse e-mail existe déjà" });
      });
  };
  
  return (
    <>
      <h2>Modifier le profil</h2>
      <form onSubmit={handleSubmit} className="formModifier">
        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          {errors.nom && <p className="error-message">{errors.nom}</p>}
        </div>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          {errors.prenom && <p className="error-message">{errors.prenom}</p>}

        </div>
        <div>
          <label>Courriel:</label>
          <input
            type="text"
            value={courriel}
            onChange={(e) => setCourriel(e.target.value)}
          />
          {errors.courriel && <p className="error-message">{errors.courriel}</p>}
        </div>
        <div>
          <label>Mot de Passe</label>
          <input
            type="password"
            value={mot_de_passe}
            onChange={(e) => setMotDePasse(e.target.value)}
          />
          {errors.mot_de_passe && <p className="error-message">{errors.mot_de_passe}</p>}
        </div>
        <div>
          <label>Confirmez le mot de passe</label>
          <input
            type="password"
            value={mot_de_passe_confirmation}
            onChange={(e) => setMot_de_passe_confirmation(e.target.value)}
          />
          {errors.mot_de_passe_confirmation && <p className="error-message">{errors.mot_de_passe_confirmation}</p>}
        </div>


        <button className="buttonEnregistrer" type="submit">Enregistrer</button>
      </form>
    </>
  );

}
export default ModifieCompte;
