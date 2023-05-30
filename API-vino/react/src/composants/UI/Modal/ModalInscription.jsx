import React from "react";
import '../../../assets/css/modales.css'
const ModalInscription = () => {
    
    function gereDOM(elements) {
        if (elements) {
    
          // Gestion modal Inscription
          const openModalBtnInscription = document.querySelector('[data-js-inscription]');
          const modalOverlayInscription = document.querySelector(".modal-overlay-inscription");
          const modalInscription = document.querySelector(".modal-inscription");
          const closeBtnInscription = document.querySelector(".close-btn-inscription");
          
          openModalBtnInscription.addEventListener("click", function() {
            modalOverlayInscription.style.display = "block";
            modalInscription.style.display = "block";
          });
          
          closeBtnInscription.addEventListener("click", function() {
            modalOverlayInscription.style.display = "none";
            modalInscription.style.display = "none";
          });
        }
      }
    
    
    
    
    
    
    
    
    return (
        <>
        </>
    )
}

export default ModalInscription