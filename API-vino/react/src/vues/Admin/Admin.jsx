import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ModifieBouteilleSAQ from "../Formulaire/ModifieBouteilleSAQ";
import './Admin.css'
import '../../assets/css/modales.css';
import '../../assets/css/general.css'

import ImportationSAQ from "../../composants/ImportationSAQ/ImportationSAQ";

const Admin = () => {

    const estConnecte = useSelector(state => state.auth.estConnecte);
    const navigate = useNavigate();
    const reference = useRef(null);
    const [usager, setUsager] = useState([]);
    const [miseAJour, setMiseAJour] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
      getUsagers();

      const element = reference.current;
      modifieBouteille(element);
    }, [miseAJour]);

  let role = null;
  const usagerData = localStorage.getItem('usagerData');
  if (usagerData) {
    const parsedData = JSON.parse(usagerData);
    role = parsedData.role_usager;
  }
  
  useEffect(() => {
    if (!estConnecte || role !== 2) {
      navigate("/");
    }
  }, [estConnecte]);

  function getUsagers() {
    fetch("http://127.0.0.1:8000/api/usagers/")
      .then((data) => data.json())
      .then((data) => {
        setUsager(data);
      });
  }

  const handleModifierUsager = (id) => {
    navigate(`/ModifieUsager/${id}`);
  };
  const handleAjouterUsager = () => {
    navigate(`/ajouterUsager`);
  };
  
  const handleDeleteConfirmation = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };
  
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };
  
  const handleDeleteConfirmed = () => {
    if (selectedUserId) {
      // Delete the user
      fetch(`http://127.0.0.1:8000/api/usager/${selectedUserId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
       
          setUsager(prevUsager => prevUsager.filter(item => item.id !== selectedUserId));
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          // Handle error scenario or show error message to the user
        });
    }
    // Close the modal
    handleModalClose();
  };

  function modifieBouteille(element) {
    // Gestion modal modifie bouteille SAQ
    const btnModifieBouteille = element.querySelector('[data-js-modifier-bouteille]');
    const modalOverlayModifieBouteille = document.querySelector(".modal-overlay-modifieBouteille");
    const modalModifieBouteille = document.querySelector(".modal-modifieBouteille");
    const closeBtnModifieBouteille = document.querySelector(".close-btn-modifieBouteille");

    btnModifieBouteille.addEventListener("click", function(e) {
      e.preventDefault();
      modalOverlayModifieBouteille.style.display = "block";
      modalModifieBouteille.style.display = "block";
    });

    closeBtnModifieBouteille.addEventListener("click", function() {
      modalOverlayModifieBouteille.style.display = "none";
      modalModifieBouteille.style.display = "none";
    });    
  } 

  return (
    <>
      {estConnecte && role === 2 ? (
        <div className="admin" ref={reference}>
          <h1>Espace Admin</h1>
          <div className="liste-admin">
            <div className="admin-entete">
              <h2>Voir les statistiques du site et des utilisateurs</h2>
              <Link to="/admin/statistique" className="bouton button-black">Voir les statistiques</Link>
            </div>
            <div className="admin-entete">
              <h2>Modifier une bouteille du catalogue</h2>
              <button id="open-modal-modifier-bouteille" className="bouton button-rouge" data-js-modifier-bouteille>Modifier une bouteille</button>
            </div>
            <div className="admin-entete">
              <ImportationSAQ />
            </div>
          </div>
          <div className="tableUsagers">
            <h2>Gestion Usagers</h2>
            <table >
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Courriel</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {usager.map((item) => (
                  <tr key={item.id}>
                   
                    <td>{item.nom}</td>
                    <td>{item.prenom}</td>
                    <td>{item.courriel}</td>
                    <td>
                        <i className="btnModifier bouteille-icone__fa fa fa-edit"onClick={() => handleModifierUsager(item.id)}></i>
                    </td>
                    <td>
                        <i className="btnSupprimer bouteille-icone__fa fa fa-trash" onClick={() => handleDeleteConfirmation(item.id)} ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Confirmation</h3>
                  <p>Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{usager.find(item => item.id === selectedUserId)?.prenom} {usager.find(item => item.id === selectedUserId)?.nom}?</strong> </p>
                  <div className="modal-buttons">
                    <button onClick={handleDeleteConfirmed}>Yes</button>
                    <button onClick={handleModalClose}>No</button>
                  </div>
                </div>
              </div>
            )}
            <button onClick={() => handleAjouterUsager()} className="boutonAjouter">Ajouter Usager</button>
          </div>
          <ModifieBouteilleSAQ />
        </div>
        ) : (
          navigate("/")
        )}
      </>
    );
  }
  
  export default Admin;
