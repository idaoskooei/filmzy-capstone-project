import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="logo">Filmzy</Link>
            </div>
            <hr className="separator" />
        </header>
    );
};

export default Header;