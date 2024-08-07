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


  return (
    <div className="choices">
      <div className="choices-content">
        <p className="choices-text">Choices:</p>
        <div className="choices-buttons">
          <button className="choices-button" onClick={handleCategoryButtonClick}> Pick a  <br /> Category</button>
          <button className="choices-button"> Pick a <br /> Random <br />Movie</button>
          <button className="choices-button" onClick={handleSearchButtonClick}> Search by <br /> term</button>
        </div>
      </div>
    </div>
  );
};

export default Choices;
