import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const { authenticatedUser } = useAuth();

  const handleProfileClick = () => {
    if (authenticatedUser) {
      navigate("/profile");
    } else {
      navigate("/signin");
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Filmzy
        </Link>
        <nav className="nav-links">
          <Link to="/choicesPage" className="nav-icon">
            <FaHome />
          </Link>
          <button onClick={handleProfileClick} className="nav-icon">
            <FaUser />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;