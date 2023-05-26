import React, { useState, useContext, useEffect } from "react";
import Input from "../../composants/UI/Input/Input";
import AuthContext from "../../contexte/AuthProvider";
import Entete from "../../composants/Entete/Entete";

const Login = (props) => {
  const {setConnecter, connecter} = props;
  const { setAuth  } = useContext(AuthContext);
  const [courriel, setCourriel] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [errors, setErrors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  let [miseAJour, setMiseAJour] = useState(false);



  const handleCourrielChange = (event) => {
    setCourriel(event.target.value);
  };

  const handleMotDePasseChange = (event) => {
    setMotDePasse(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation
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

      console.log("Response:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);

        // Set the authenticated user in the auth context
        setAuth(data);
       
        const isConnected = ()=> {
          setConnecter(true);
        }



        // Reset form fields and errors
        setCourriel("");
        setMotDePasse("");
        setErrors([]);
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        // Update the state with the error message or perform any other error handling
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network or other errors
      // ...
    }
  };

  useEffect(() => {
    console.log("connecter updated:", connecter);
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
            <Input
              type="email"
              id="courriel"
              name="courriel"
              value={courriel}
              onChange={handleCourrielChange}
              required
            />
            <label htmlFor="mot_de_passe">Votre mot de passe:</label>
            <Input
              type="password"
              id="mot_de_passe"
              name="mot_de_passe"
              value={mot_de_passe}
              onChange={handleMotDePasseChange}
              required
            />
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
