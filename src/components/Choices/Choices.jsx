import React from 'react';
import './Choices.scss';

const Choices = () => {
  return (
    <div className="choices">
      <div className="choices-content">
        <p className="choices-text">Choices:</p>
        <div className="choices-buttons">
          <button className="choices-button"> Pick a  <br /> Category</button>
          <button className="choices-button"> Pick a <br /> Random <br />Movie</button>
          <button className="choices-button"> Search by <br /> term</button>
        </div>
      </div>
    </div>
  );
};

export default Choices;
