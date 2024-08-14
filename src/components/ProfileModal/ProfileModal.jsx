// ProfileModal.jsx
import React from 'react';
import './ProfileModal.scss'; // Create styles for the modal as needed

const ProfileModal = ({ isOpen, onClose, onImageChange }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Upload Profile Picture</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                />
            </div>
        </div>
    );
};

export default ProfileModal;
