import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './Admin.css'

const Admin = () => {

    const estConnecte = useSelector(state => state.auth.estConnecte);
    const navigate = useNavigate();
    const [usager, setUsager] = useState([]);
    const [miseAJour, setMiseAJour] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
      getUsagers();
    }, [miseAJour]);

    let role = null;
    const usagerData = localStorage.getItem('usagerData');
    if (usagerData) {
      const parsedData = JSON.parse(usagerData);
      role = parsedData.role_usager;
    }

    function getUsagers() {
      fetch("http://127.0.0.1:8000/api/usagers/")
        .then((data) => data.json())
        .then((data) => {
          setUsager(data);
         console.log(data);
        });
    }
 
    const handleModifierUsager = (id) => {
      // Handle modify button click here
      console.log("Modify clicked for user with id:", id);
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
            console.log(data.message);
            // Update the user list after successful deletion
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

    return (
      <>
        {estConnecte && role === 2 ? (
          <div className="tableUsagers">
            <h2>Gestion Usagers</h2>
            <table >
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Courriel</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Rôle</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {usager.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nom}</td>
                    <td>{item.prenom}</td>
                    <td>{item.courriel}</td>
                    <td>{item.created_at}</td>
                    <td>{item.updated_at}</td>
                    <td>{item.role}</td>
                    <td>
                      <button onClick={() => handleModifierUsager(item.id)}>Modifier</button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteConfirmation(item.id)}  className="button-supprimer">Supprimer</button>
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
          </div>
        ) : (
          navigate("/")
        )}
      </>
    );
  }
  
  export default Admin;