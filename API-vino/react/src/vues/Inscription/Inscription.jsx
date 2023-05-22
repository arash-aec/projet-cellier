
import React, { useState, useRef } from "react";
import Input from "../../composants/UI/Input/Input";

const Inscription = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Réinitialiser les erreurs
    setErrors([]);
  
    // Perform validation
    const validationErrors = [];

    if (!/^[a-zA-Z]{2,}$/.test(nom)) {
      validationErrors.push("Le nom doit contenir au moins 2 lettres et ne peut contenir que des lettres.");
    }

    if (!/^[a-zA-Z]{2,}$/.test(prenom)) {
      validationErrors.push("Le prénom doit contenir au moins 2 lettres et ne peut contenir que des lettres.");
    }

    if (email.trim() === "") {
      validationErrors.push("Le courriel est requis.");
    }

    if (password.trim() === "") {
      validationErrors.push("Le mot de passe est requis.");
    }

    if (confirmPassword.trim() === "") {
      validationErrors.push("La confirmation du mot de passe est requise.");
    }

    if (password !== confirmPassword) {
      validationErrors.push("Le mot de passe et la confirmation du mot de passe ne correspondent pas.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

   
  
    // Create user object
    const user = {
      nom: nom,
      prenom: prenom,
      courriel: email,
      mot_de_passe: password,
      role: 2 // le role par default (utilisateur)
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/usager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
  
      if (!response.ok) {
        throw new Error('Une erreur s\'est produite lors de la création de l\'usager.');
      }
  
      // Handle successful user creation
      // ...
  
      // Reset form fields and errors
      handleModalClose();
    } catch (error) {
      console.error(error);
      // Handle error
      setErrors(["Une erreur s'est produite lors de la création de l'usager. Veuillez réessayer."]);
    }
  
  };

  const handleModalClose = () => {
    setNom("");
    setPrenom("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
    formRef.current.reset();
   
  };

  

  return (
    <>
      <div className="modal-overlay-inscription">
        <div className="modal-inscription">
          <span className="close-btn-inscription" onClick={handleModalClose}>&times;</span>
          <h2>Inscription</h2>
          <form ref={formRef} onSubmit={handleSubmit}>
            <label htmlFor="nom">Votre nom:</label>
            <Input type="text" id="nom" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />

            <label htmlFor="prenom">Votre prénom:</label>
            <Input type="text" id="prenom" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />

            <label htmlFor="email-inscrir">Votre courriel:</label>
            <Input type="email" id="email-inscrir" name="courriel" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="password-inscrir" className="password-label">Mot de passe:</label>
            <Input type="password" id="password-inscrir" name="mot_de_passe" value={password} onChange={(e) => setPassword(e.target.value)} required className="password-input" />

            <label htmlFor="confirmpass" className="password-label">Confirmez le mot de passe:</label>
            <Input type="password" id="confirmpass" name="mot_de_passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
              className={`password-input ${errors.includes("Les mots de passe ne correspondent pas.") ? "input-error" : ""}`} />
            {errors.includes("Les mots de passe ne correspondent pas.") && (
              <span className="error-message">Les mots de passe ne correspondent pas.</span>
            )}

            <Input type="submit" value="Enregistrer" />
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
  };

  export default Inscription;
