import React from 'react';
import './FavoritesModal.scss';
import FavoritesList from '../FavoritesList/FavoritesList';

const FavoritesModal = ({ isOpen, onClose, favorites, onMovieClick }) => {
    if (!isOpen) return null;

    return (
        <div className="favorites-modal">
            <div className="modal-content">
                <button onClick={onClose} className="close-btn">Close</button>
                <FavoritesList favorites={favorites} onMovieClick={onMovieClick} />
            </div>
        </div>
    );
};

export default FavoritesModal;