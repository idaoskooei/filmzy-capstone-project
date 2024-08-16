import { useState, useEffect } from 'react';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, storage } from '../../firebase-config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';

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
            navigate('/'); 
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
    
            await updateProfile(auth.currentUser, { photoURL: downloadURL });
    
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

    return (
        <div className="profile">
            <div className="profile-header">
                <img
                    src={newProfilePicture || 'icon.png'}
                    alt="Profile"
                    className="profile-picture"
                />
                <h2 className="user-name">{authenticatedUser.email}</h2>
            </div>
            <div className="profile-content">
                <div className="favorites">
                    <button className='favorites-btn' disabled={isUploading}>Favorites</button>
                    <button className='edit' onClick={handleEditProfileClick} disabled={isUploading}>Edit My Profile</button>
                </div>
                <button className="sign-out" onClick={handleSignOut} disabled={isUploading}>Sign Out</button>
            </div>
            {isUploading && <div className="spinner"></div>}
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
