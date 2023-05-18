import React from "react";




  return (
    <>
      <div className="modal-overlay-connexion">
        <div className="modal-connexion">
          <span className="close-btn-connexion" >&times;</span>
          <h2>Connexion</h2>
          <form>
            <label htmlFor="email">Votre courriel:</label>
            <Input type="email" id="email" name="email" required />
            <label htmlFor="password">Votre mot de passe:</label>
            <Input type="current-password" id="password" name="password" required />
        
            <Input type="submit" value="Connexion" />
          </form>
        </div>
      </div>
    </>
  )
}
export default Login
