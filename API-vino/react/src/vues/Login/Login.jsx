import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../composants/UI/Input/Input";

import { useDispatch } from 'react-redux';
import { connexion } from '../../global/authentification/authAction.jsx';

const Login = (props) => {
  const [courriel, setCourriel] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [errors, setErrors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [miseAJour, setMiseAJour] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCourrielChange = (event) => {
    setCourriel(event.target.value);
  };

  const handleMotDePasseChange = (event) => {
    setMotDePasse(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const validationErrors = [];
  
    if (courriel.trim() === "") {
      validationErrors.push("Le courriel est requis.");
    }
  
    if (mot_de_passe.trim() === "") {
      validationErrors.push("Le mot de passe est requis.");
    }
  
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courriel: courriel,
          mot_de_passe: mot_de_passe,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        dispatch(connexion(courriel, mot_de_passe));

        // récupération du Token
        const token = data.token
        localStorage.setItem('token', token);

        // Reset form fields and errors
        setCourriel("");
        setMotDePasse("");
        setErrors([]);
        setIsModalOpen(false);
        setIsConnected(true); // Mise à jour de la variable isConnected

        // Redirection vers la page "/cellier"
        navigate("/celliers");

      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // console.log("connecter updated:", dispatch);
  }, [miseAJour]);

  if (!isModalOpen) {
    return null;
  }


  return (
    <>
      <div className="modal-overlay-connexion">
        <div className="modal-connexion">
          <span className="close-btn-connexion" onClick={props.onClose}>
            &times;
          </span>
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit} method="POST">
            <label htmlFor="courriel">Votre courriel:</label>
            <Input type="email" id="courriel" name="courriel" value={courriel} onChange={handleCourrielChange} required />
            <label htmlFor="mot_de_passe">Votre mot de passe:</label>
            <Input type="password" id="mot_de_passe" name="mot_de_passe" value={mot_de_passe} onChange={handleMotDePasseChange} required />
            <Input type="submit" value="Connexion" />
          </form>
          {errors.length > 0 && (
            <ul className="errors">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;