
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../composants/UI/Input/Input";
import ValidationAjouterUsager from "../../composants/Validation/ValidationAjouterUsager";
import './AjouteUsager.css';


const AjouterUsager = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [erreur, setErreur] = useState({});
    const [ajouteSuccessModal, setAjouteSuccessModal] = useState(false);
    const [values, setValues] = useState({
      nom: '',
      prenom: '',
      courriel: '',
      mot_de_passe: '',
      mot_de_passe_confirmation: '',
      role: '',
    })
  
    const handleChange = (e) => {  
      setValues({ ...values, [e.target.name]: e.target.value });
      setErreur((prevState) => ({ ...prevState, courriel: '', mot_de_passe: '' }));
    };
    
      
    const handleSubmit = async (event) => {
      event.preventDefault();
      const erreurs = ValidationAjouterUsager(values);
      setErreur(erreurs);
    
      if (Object.keys(erreurs).length === 0 && values.mot_de_passe !== values.mot_de_passe_confirmation) {
        setErreur({
          ...erreurs,
          mot_de_passe_confirmation: "Les mots de passe ne correspondent pas.",
        });
        return;
      }
    
      if (Object.keys(erreurs).length === 0 && values.role === '') {
        setErreur({
          ...erreurs,
          role: "Veuillez choisir un rôle.",
        });
        return;
      }
    
      if (Object.keys(erreurs).length === 0) {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/ajouterUsager", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nom: values.nom,
              prenom: values.prenom,
              courriel: values.courriel,
              mot_de_passe: values.mot_de_passe,
              mot_de_passe_confirmation: values.mot_de_passe_confirmation,
              role: values.role,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
              setValues({
                nom: '',
                prenom: '',
                courriel: '',
                mot_de_passe: '',
                mot_de_passe_confirmation: '',
                role: '1',
              });
              setAjouteSuccessModal(true);

          } else {
            throw new Error("Une erreur s'est produite lors de la création de l'usager.");
          }
        } catch (error) {
          if (error.message === "JSON.parse: unexpected character at line 1 column 1 of the JSON data") {
            setErreur({ courriel: "L'adresse e-mail existe déjà" });
          } else {
            setErreur({ courriel: error.message });
          }
        }
    };
    
  }
  
    useEffect(() => {
      if (Object.keys(erreur).length === 0 && (values.nom !== "" && values.prenom !== "" && values.courriel !== "" && values.mot_de_passe !== "" && values.mot_de_passe_confirmation !== ""))
        console.log(erreur)
    }, []);
  
    if (!isModalOpen) {
      return null;
    }
    return (
        <>
         <h2>Ajouter un Usager</h2>
          <form  onSubmit={handleSubmit} className="formModifier">
            <label htmlFor="nom">Nom</label>
            <Input type="text" id="nom" name="nom" value={values.nom} onChange={handleChange} />
            {erreur.nom && <p className="error-message">{erreur.nom}</p>}
            <label htmlFor="prenom">Prénom:</label>
            <Input type="text" id="prenom" name="prenom" value={values.prenom} onChange={handleChange} />
            {erreur.prenom && <p className="error-message">{erreur.prenom}</p>}
            <label htmlFor="email-inscrir">E-mail</label>
            <Input type="text" id="email-inscrir" name="courriel" value={values.courriel} onChange={handleChange} />
            {erreur.courriel && <p className="error-message">{erreur.courriel}</p>}
            <label htmlFor="password-inscrir" className="password-label">
              Mot de passe
            </label>
            <Input type="password" id="password-inscrir" name="mot_de_passe" value={values.mot_de_passe} onChange={handleChange} className="password-input" />
            {erreur.mot_de_passe && <p className="error-message">{erreur.mot_de_passe}</p>}
            <label htmlFor="confirmpass" className="password-label">
              Confirmez le mot de passe
            </label>
            <Input
              type="password"
              id="confirmpass"
              name="mot_de_passe_confirmation"
              value={values.mot_de_passe_confirmation}
              onChange={handleChange}
            />
            {erreur.mot_de_passe_confirmation && (
              <p className="error-message">{erreur.mot_de_passe_confirmation}</p>
            )}
          <div>
            <label>Role:</label>
            <select value={values.role} name="role"  onChange={handleChange}>
              <option value="">choisissez le rôle</option>
              <option  value="1">Member</option>
              <option  value="2">Admin</option>
            </select>
            <p className="error-message">{erreur.role}</p>
          </div>

            <button className='buttonEnregistrer' type="submit" value="Enregistrer">Enregistrer</button>
          </form>
          {ajouteSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Succès</p>
            <strong>Compte ajouté avec succès!</strong>
            <div className="modal-buttons">
              <button onClick={() => { setAjouteSuccessModal(false); navigate("/admin"); }}>OK</button>
            </div>
          </div>
        </div>
      )}
        </>
    )
}

export default AjouterUsager