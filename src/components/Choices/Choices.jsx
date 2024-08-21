import { useNavigate } from "react-router-dom";
import "./Choices.scss";

const Choices = () => {
  const navigate = useNavigate();

  return (
    <div className="choices">
      <div className="choices-content">
        <p className="choices-text">Choices:</p>
        <div className="choices-buttons">
          <button
            className="choices-button"
            onClick={() => navigate("/categoryPage")}
          >
            Pick a <br /> Category
          </button>
          <button
            className="choices-button"
            onClick={() => navigate("/randomMovie")}
          >
            Surprise me!
          </button>
          <button
            className="choices-button"
            onClick={() => navigate("/searchPage")}
          >
            Search by <br /> term
          </button>
        </div>
      </div>
    </div>
  );
};

export default Choices;
