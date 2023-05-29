import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ModifieUsager.css";
import { useNavigate } from "react-router-dom";
import ValidationModifier from "../../composants/Validation/ValidationModifier";

const ModifieUsager = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [courriel, setCourriel] = useState("");
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
        setNom(data.nom);
        setPrenom(data.prenom);
        setCourriel(data.courriel);
        setRole(data.role);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = ValidationModifier({
      nom,
      prenom,
      courriel,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const updatedUsager = {
        id,
        nom,
        prenom,
        courriel,
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
          navigate("/admin");
        })
        .catch((error) => {
          console.error("Error updating user details:", error);
            setErrors({ courriel: "L'adresse e-mail existe déjà" });

        });
    }
  };

  return (
    <>
      <h2>Modifier Usager</h2>
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
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="1">Member</option>
            <option value="2">Admin</option>
          </select>
        </div>
        <button className="buttonEnregistrer" type="submit">Enregistrer</button>
      </form>
    </>
  );

}
export default ModifieUsager;
