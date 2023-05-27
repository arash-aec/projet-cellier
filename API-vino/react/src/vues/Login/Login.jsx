import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../composants/UI/Input/Input";
import Entete from "../../composants/Entete/Entete";
import Validation from "../../composants/Validation/Validation";
import './Login.css'
import { useDispatch } from 'react-redux';
import { connexion } from '../../global/authentification/authAction.jsx';

const Login = (props) => {
  const [courriel, setCourriel] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [miseAJour, setMiseAJour] = useState(false);
  const [values, setValues] = useState({
    courriel: '',
    mot_de_passe: ''
  })
  const [erreur, setErreur] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

     const erreurs = Validation(values);
      setErreur(erreurs);

    if (Object.keys(erreurs).length === 0) {
  
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
          courriel: values.courriel,
          mot_de_passe: values.mot_de_passe, 
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);
        
       
        setValues({ courriel: "", mot_de_passe: "" });
  
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
        setErreur({ mot_de_passe: "L'Adresse de courriel ou le mot de passe est incorrect" });
        console.error("Error:", errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

  useEffect(() => {
    if(Object.keys(erreur).length === 0 && (values.courriel !== "" && values.mot_de_passe !== ""))
   alert("form submit")
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
          <label htmlFor="courriel" className="label">Adresse de courriel</label>
          <Input
            type="text"
            id="courriel"
            name="courriel"
            value={values.courriel}
            onChange={handleChange}
          />
          {erreur.courriel && <p className="error-message">{erreur.courriel}</p>} 
          <label htmlFor="mot_de_passe">Mot de passe</label>
          <Input
            type="password"
            id="mot_de_passe"
            name="mot_de_passe"
            value={values.mot_de_passe}
            onChange={handleChange}
          />
          {erreur.mot_de_passe && <p className="error-message">{erreur.mot_de_passe}</p>} 
          <Input type="submit" value="Connexion" />
        </form>
        </div>
      </div>
    </>
  );
}

export default Login;
