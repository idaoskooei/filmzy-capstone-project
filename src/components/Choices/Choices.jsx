import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Choices.scss';

const Choices = () => {
  const navigate = useNavigate();

  const handleCategoryButtonClick = () => {
      navigate('/categoryPage');
  };

  const handleSearchButtonClick = () => {
    navigate('/searchPage');
};

const handleRandomButtonClick = () => {
  navigate('/randomMovie');
};


  return (
    <div className="choices">
      <div className="choices-content">
        <p className="choices-text">Choices:</p>
        <div className="choices-buttons">
          <button className="choices-button" onClick={handleCategoryButtonClick}> Pick a  <br /> Category</button>
          <button className="choices-button" onClick={handleRandomButtonClick}> Random <br /> Movie <br />Recommendation</button>
          <button className="choices-button" onClick={handleSearchButtonClick}> Search by <br /> term</button>
        </div>
      </div>
    </div>
  );
};

export default Choices;
