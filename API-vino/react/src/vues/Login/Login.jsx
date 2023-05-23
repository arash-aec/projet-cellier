// import React from "react";
// import Input from "../../composants/UI/Input/Input";

// const Login = (props) => {


//   return (
//     <>
//       <div className="modal-overlay-connexion">
//         <div className="modal-connexion">
//           <span className="close-btn-connexion" >&times;</span>
//           <h2>Connexion</h2>
//           <form>
//             <label htmlFor="courriel">Votre courriel:</label>
//             <Input type="email" id="courriel" name="courriel" required />
//             <label htmlFor="mot_de_passe">Votre mot de passe:</label>
//             <Input type="password" id="mot_de_passe" name="mot_de_passe" required />
        
//             <Input type="submit" value="Connexion" />
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }
// export default Login



import React, { useState, useContext } from "react";
import Input from "../../composants/UI/Input/Input";
import AuthContext from "../../contexte/AuthProvider";

const Login = (props) => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation
    const validationErrors = [];

    if (email.trim() === "") {
      validationErrors.push("Le courriel est requis.");
    }

    if (password.trim() === "") {
      validationErrors.push("Le mot de passe est requis.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Une erreur s\'est produite lors de la connexion.');
      }
  
      const data = await response.json();
  
      // Set the authenticated user in the auth context
      setAuth(data);
  
      // Reset form fields and errors
      setEmail('');
      setPassword('');
      setErrors([]);
    } catch (error) {
      console.error(error);
      // Handle error
      // ...
    }
  };


  return (
    <>
      <div className="modal-overlay-connexion">
        <div className="modal-connexion">
          <span className="close-btn-connexion" onClick={props.onClose}>&times;</span>
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="courriel">Votre courriel:</label>
            <Input type="email" id="courriel" name="courriel" value={email} onChange={handleEmailChange} required />
            <label htmlFor="mot_de_passe">Votre mot de passe:</label>
            <Input type="password" id="mot_de_passe" name="mot_de_passe" value={password} onChange={handlePasswordChange} required />
        
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
};

export default Login;
