import { useNavigate } from 'react-router-dom';
import './Welcome.scss';

const Welcome = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/choicesPage');
    };

    return (
        <div className="welcome">
            <p className="welcome-text">Tired of scrolling?</p>
            <button className="welcome-button" onClick={handleClick}>Start</button>
        </div>
    );
};

export default Welcome;
