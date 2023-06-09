import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../composants/UI/Input/Input";
import ValidationLogin from "../../composants/Validation/ValidationLogin";
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

     const erreurs = ValidationLogin(values);
      setErreur(erreurs);

    if (Object.keys(erreurs).length === 0) {
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
        
        setValues({ courriel: "", mot_de_passe: "" });

        // Création de l'objet contenant les informations
        const usagerData = {
          token: data.token,
          id_usager: data.usager.id,
          role_usager: data.usager.role
        };

        // Stockage de l'objet dans le localStorage
        localStorage.setItem('usagerData', JSON.stringify(usagerData));

        dispatch(connexion(usagerData));

        // Reset form fields and errors
        setCourriel("");
        setMotDePasse("");
        setIsModalOpen(false);
        setIsConnected(true); // Mise à jour de la variable isConnected

        if (usagerData.role_usager == 2 ) {
          navigate("/admin");
        } else {
          // Redirection vers la page "/cellier"
          navigate("/celliers");
        }

      } else {
        const errorData = await response.json();
        setErreur({ mot_de_passe: "L'Adresse de courriel ou le mot de passe est incorrect" });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

  useEffect(() => {
    if(Object.keys(erreur).length === 0 && (values.courriel !== "" && values.mot_de_passe !== ""))
   alert("form submit")
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
