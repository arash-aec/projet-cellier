import React from "react";

const Login = () => {
  // const openModalConnexionBtn = document.getElementById("open-modal-connexion-btn");
  // const modalOverlayConnexion = document.querySelector(".modal-overlay-connexion");
  // const modalConnexion = document.querySelector(".modal-connexion");
  // const closeBtnConnexion = document.querySelector(".close-btn-connexion");
  
  // openModalConnexionBtn.addEventListener("click", function() {
  //   modalOverlayConnexion.style.display = "block";
  //   modalConnexion.style.display = "block";
  // });
  
  // closeBtnConnexion.addEventListener("click", function() {
  //   modalOverlayConnexion.style.display = "none";
  //   modalConnexion.style.display = "none";
  // });
  
  return (
    <>
      <div className="modal-overlay-connexion">
        <div className="modal-connexion">
          <span className="close-btn-connexion" >&times;</span>
          <h2>Connexion</h2>
          <form>
            <label htmlFor="email">Votre courriel:</label>
            <input type="email" id="email" name="email" required />
        
            <label htmlFor="password">Votre mot de passe:</label>
            <input type="current-password" id="password" name="password" required />
        
            <input type="submit" value="Connexion" />
          </form>
        </div>
      </div>
    </>
  )
}
export default Login
