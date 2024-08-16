import "./FavoritesModal.scss";
import FavoritesList from "../FavoritesList/FavoritesList";
import PropTypes from "prop-types";

const FavoritesModal = ({ isOpen, onClose, favorites, onMovieClick }) => {
  if (!isOpen) return null;

  return (
    <div className="favorites-modal">
      <div className="modal-content">
        <FavoritesList favorites={favorites} onMovieClick={onMovieClick} />
        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

FavoritesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default FavoritesModal;
