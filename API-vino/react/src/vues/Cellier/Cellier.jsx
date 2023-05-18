import React from "react";
import ListeCellier from "../../ListeCellier/ListeCellier";

const Cellier = () => {
  
  return (
    <>
      <div className="cellier">
        <section className="header-image">
            <img src="../public/images/cellier.jpeg" alt="image d'un cellier"/>
            <div className="header-contenu">
                <h1>Cellier</h1>
                <ListeCellier />
                <div className="header-image-btn">
                  <div>
                    <a className="header-image-button" href="#">Ajoute un cellier</a>
                  </div>
                </div>
            </div>
        </section>  
      </div>
    </>
  )
}
export default Cellier
