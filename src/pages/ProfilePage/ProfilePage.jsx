import Profile from '../../components/Profile/Profile';

const user = {
    profilePicture: 'https://via.placeholder.com/100',
    name: 'John Doe',
    favorites: ['Movie 1', 'Movie 2', 'Movie 3']
};

const ProfilePage = () => {
    return (
        <div>
            <Profile user={user} />
        </div>
    );
};

export default ProfilePage;