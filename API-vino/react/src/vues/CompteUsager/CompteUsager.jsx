import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ModifieBouteilleSAQ from "../Formulaire/ModifieBouteilleSAQ";
import { useParams } from "react-router-dom";
import { deconnexion } from '../../global/authentification/authAction.jsx';
import { useDispatch } from 'react-redux';
import '../../assets/css/modales.css';
import '../../assets/css/general.css'


const CompteUsager = (props) => {
    const estConnecte = useSelector(state => state.auth.estConnecte);

    const reference = useRef(null);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [courriel, setCourriel] = useState("");
    const [mot_de_passe, setmotDePasse] = useState("");


    const [usager, setUsager] = useState([]);
    const [miseAJour, setMiseAJour] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

     const { id } = useParams();

     const dispatch = useDispatch();
     const navigate = useNavigate();

    useEffect(() => {
        getUsager();
    }, [miseAJour]);

  function getUsager() {
    fetch(`http://127.0.0.1:8000/api/usager/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setNom(data.nom);
        setPrenom(data.prenom);
        setCourriel(data.courriel);
        setmotDePasse(data.mot_de_passe);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }

  const handleModifierUsager = (id) => {
    navigate(`/modifierProfil/${id}`);
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
          navigate("/")
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          // Handle error scenario or show error message to the user
        });
    }


    // Close the modal
    handleModalClose();
  };

  const handleLogout = () => {
    handleDeleteConfirmed();
    dispatch(deconnexion());
    localStorage.removeItem('usagerData');
    // Redirection vers la page Accueil
    navigate("/");
    // Mettre deconnexion Laravel 
  };



  return (
    <>
   
        <div className="admin" ref={reference}>
          <h1>Salut, {prenom}!</h1>
          <div className="tableUsagers">
            <table >
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénoms</th>
                  <th>Courriel</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>{nom}</td>
                    <td>{prenom}</td>
                    <td>{courriel}</td>
                    <td>
                        <i className="btnModifier bouteille-icone__fa fa fa-edit"onClick={() => handleModifierUsager(id)}></i>
                    </td>
                    <td>
                        <i className="btnSupprimer bouteille-icone__fa fa fa-trash" onClick={() => handleDeleteConfirmation(id)} ></i>
                    </td>
                  </tr>
              </tbody>
            </table>
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <p>Confirmation</p>
                  <strong >Es-tu sûr de vouloir supprimer ton compte ?</strong>
                  <div className="modal-buttons">
                    <button onClick={handleLogout}>Yes</button>
                    <button onClick={handleModalClose}>No</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
  
  export default CompteUsager;
