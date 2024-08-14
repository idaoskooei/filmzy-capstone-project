import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ user }) => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast.success('Signed out successfully!');
            setTimeout(() => {
                navigate('/'); 
            }, 2000);
        } catch (error) {
            toast.error('Error signing out!');
            console.error('Error signing out:', error.message);
        }
    };

    return (
        <div className="profile">
            <div className="profile-header">
                <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                <h2 className="user-name">{user.name}</h2>
            </div>
            <div className="profile-content">
                <div className="favorites">
                    <h3>Favorites</h3>
                    <h3>Edit My Profile</h3>
                    <ul className="favorites-list">
                        {user.favorites.map((item, index) => (
                            <li key={index} className="favorite-item">{item}</li>
                        ))}
                    </ul>
                </div>
                <button className="sign-out" onClick={handleSignOut}>Sign Out</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
