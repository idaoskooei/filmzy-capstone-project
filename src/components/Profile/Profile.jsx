import { useState, useEffect } from 'react';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, storage, firestore } from '../../firebase-config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
    const navigate = useNavigate();
    const { authenticatedUser } = useAuth();
    const [isUploading, setUploading] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState(authenticatedUser?.photoURL || '');
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (authenticatedUser) {
            setNewProfilePicture(authenticatedUser.photoURL || '');
        }
    }, [authenticatedUser]);

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

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setModalOpen(false);

        try {
            if (!authenticatedUser || !authenticatedUser.uid) {
                throw new Error('User ID is missing');
            }

            const storageRef = ref(storage, `profilePictures/${authenticatedUser.uid}`);
            await uploadBytes(storageRef, file);

            const downloadURL = await getDownloadURL(storageRef);

            const userDocRef = doc(firestore, 'users', authenticatedUser.uid);
            await updateDoc(userDocRef, {
                profilePicture: downloadURL,
            });

            toast.success('Profile picture updated successfully!');
            setNewProfilePicture(downloadURL);
        } catch (error) {
            toast.error('Error uploading profile picture!');
            console.error('Error uploading profile picture:', error.message);
        } finally {
            setUploading(false);
        }
    };
    

    const handleEditProfileClick = () => {
        setModalOpen(true); 
    };

    const handleStartButton = () => {
        navigate("/")
    };

    if (!authenticatedUser) {
        return (
            <div className='no-user-container'>
                <p className="profile-message">Please Sign in to see your profile!</p>
                <button className='start-button' onClick={handleStartButton}> Start Here!</button>
            </div>
        ); 
    }

    return (
        <div className="profile">
            <div className="profile-header">
                <img
                    src={newProfilePicture || authenticatedUser.photoURL || 'default-profile.png'}
                    alt="Profile"
                    className="profile-picture"
                />
                <h2 className="user-name">{authenticatedUser.displayName || 'User'}</h2>
            </div>
            <div className="profile-content">
                <div className="favorites">
                    <button className='favorites-btn'>Favorites</button>
                    <button className='edit' onClick={handleEditProfileClick}>Edit My Profile</button>
                </div>
                <button className="sign-out" onClick={handleSignOut}>Sign Out</button>
            </div>
            <ProfileModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onImageChange={handleImageChange}
            />
            <ToastContainer />
        </div>
    );
};

export default Profile;