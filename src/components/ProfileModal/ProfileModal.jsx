import React from 'react';
import './ProfileModal.scss';

const ProfileModal = ({ isOpen, onClose, onImageChange }) => {
    if (!isOpen) return null;
  
    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            if (typeof onImageChange === 'function') {
                onImageChange(event);
            }        }
    };
  
    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>Close</button>
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
        </div>
    );
};

export default ProfileModal;