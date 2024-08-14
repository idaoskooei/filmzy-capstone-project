import Profile from '../../components/Profile/Profile';

const user = {
    name: 'John Doe',
};

const ProfilePage = () => {
    return (
        <div>
            <Profile user={user} />
        </div>
    );
};

export default ProfilePage;