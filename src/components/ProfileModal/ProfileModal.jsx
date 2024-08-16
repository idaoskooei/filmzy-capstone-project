import "./ProfileModal.scss";
import PropTypes from "prop-types";

const ProfileModal = ({ isOpen, onClose, onImageChange }) => {
  if (!isOpen) return null;

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      if (typeof onImageChange === "function") {
        onImageChange(event);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

ProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
};

export default ProfileModal;
