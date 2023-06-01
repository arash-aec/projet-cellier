import PropTypes from 'prop-types';
import './SupprimModal.css';
 function SupprimModalCellier({ showModal, onClose, onConfirm }) {
    
    if (!showModal) return null;
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Confirmation de suppression</h3>
          <p>Êtes-vous sûr de vouloir supprimer ce cellier?</p>
          <div className="modal-actions">
            <button className='btn-annuler' onClick={onClose}>Annuler</button>
            <button className='btn-supprimer' onClick={onConfirm}>Supprimer</button>
          </div>
        </div>
      </div>
    );
  }

  SupprimModalCellier.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };

  export default SupprimModalCellier;