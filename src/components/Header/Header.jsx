import { Link } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="logo">Filmzy</Link>
                <nav className="nav-links">
                    <Link to="/choicesPage" className="nav-icon"><FaHome /></Link>
                    <Link to="/profile" className="nav-icon"><FaUser /></Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;