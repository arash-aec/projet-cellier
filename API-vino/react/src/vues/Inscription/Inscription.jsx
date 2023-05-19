// import React from "react";
// import Input from "../../composants/UI/Input/Input";


// const Inscription = () => {
//   return (
//     <>
//       <div className="modal-overlay-inscription">
//         <div className="modal-inscription">
//           <span className="close-btn-inscription" >&times;</span>
//           <h2>Inscription</h2>
//           <form>
//             <label htmlFor="nom">Votre nom:</label>
//             <Input type="text" id="nom" name="nom" required />

//             <label htmlFor="prenom">Votre prenom:</label>
//             <Input type="text" id="prenom" name="prenom" required />

//             <label htmlFor="email-inscrir">Votre courriel:</label>
//             <Input type="email" id="email-inscrir" name="email" required />

//             <label htmlFor="password-inscrir">Mot de passe:</label>
//             <Input type="current-password" id="password-inscrir" name="password-inscrir" required />

//             <label htmlFor="confirmpass">Confirmez mot de passe:</label>
//             <Input type="current-password" id="confirmpass" name="password" required />

//             <Input type="submit" value="Enregistrer" />
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Inscription;

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

  const handleSubmit = (event) => {
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

    // Soumettre le formulaire si la validation réussit
    // ...
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
            <Input type="email" id="email-inscrir" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="password-inscrir" className="password-label">Mot de passe:</label>
            <Input type="password" id="password-inscrir" name="password-inscrir" value={password} onChange={(e) => setPassword(e.target.value)} required className="password-input" />

            <label htmlFor="confirmpass" className="password-label">Confirmez le mot de passe:</label>
            <Input type="password" id="confirmpass" name="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
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
