import { useNavigate } from "react-router-dom";
import "./Welcome.scss";

const Welcome = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/choicesPage");
  };

  return (
    <div className="welcome">
      <p className="welcome-text">Tired of scrolling?</p>
      <div className="button-container">
        <button className="welcome-button" onClick={handleStartClick}>
          Start as Guest
        </button>
      </div>
    </div>
  );
};

export default Welcome;