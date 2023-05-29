import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../composants/UI/Input/Input";
import { useDispatch } from 'react-redux';
import { connexion } from '../../global/authentification/authAction.jsx';
import ValidationInscription from "../../composants/Validation/ValidationInscription";


const Inscription = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  const [erreur, setErreur] = useState({});
  const [values, setValues] = useState({
    nom: '',
    prenom: '',
    courriel: '',
    mot_de_passe: '',
    mot_de_passe_confirmation: '',
  })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErreur((prevState) => ({ ...prevState, courriel: '', mot_de_passe: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const erreurs = ValidationInscription(values);
    setErreur(erreurs);

    if (Object.keys(erreurs).length === 0 && values.mot_de_passe !== values.mot_de_passe_confirmation) {
      setErreur({
        ...erreurs,
        mot_de_passe_confirmation: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    if (Object.keys(erreurs).length === 0) {
      try {
        let response = await fetch("http://127.0.0.1:8000/api/registration", {
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
            role: 1
          }),
        });

        if (response.status === 200) {
          setValues({
            nom: '',
            prenom: '',
            courriel: '',
            mot_de_passe: '',
            mot_de_passe_confirmation: '',
            role: ''
          });
        } else if (!response.ok) {
          throw new Error("Une erreur s'est produite lors de la création de l'usager.");
        }

        const data = await response.json();

        const usagerData = {
          token: data.token,
          id_usager: data.usager.id,
          role_usager: data.usager.role
        };

        localStorage.setItem('usagerData', JSON.stringify(usagerData));

        dispatch(connexion(usagerData));

        setIsConnected(true);

        if (usagerData.role_usager === 2) {
          navigate("/admin");
        } else {
          navigate("/celliers");
        }

        handleModalClose();
      } catch (error) {
        console.error("Error:", error);
        setErreur({ courriel: "L'adresse e-mail existe déjà" });
      }
    }
  };

  useEffect(() => {
    if (Object.keys(erreur).length === 0 && (values.nom !== "" && values.prenom !== "" && values.courriel !== "" && values.mot_de_passe !== "" && values.mot_de_passe_confirmation !== ""))
      console.log(erreur)
  }, []);

  if (!isModalOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay-inscription">
        <div className="modal-inscription">
          <span className="close-btn-inscription" onClick={props.onClose}>
            &times;
          </span>
          <h2>Créer un compte</h2>
          <form ref={formRef} onSubmit={handleSubmit}>
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
            <Input type="submit" value="Enregistrer" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Inscription;