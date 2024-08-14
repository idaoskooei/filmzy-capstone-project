import './Profile.scss';

const Profile = ({ user }) => {
    const handleSignOut = () => {
        console.log('Sign out');
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
        </div>
    );
};

export default Profile;
