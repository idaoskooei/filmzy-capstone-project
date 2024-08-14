import { useState } from 'react';
import './SignUp.scss';
import logo from '../../assets/icons/icon.png';
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            toast.success('Sign up successful!');
            setTimeout(() => {
                navigate('/choicespage'); 
            }, 2000);

        } catch (error) {
            toast.error(error.message);
            console.error('Error signing up:', error.message);
        }
    };

    return (
        <div className="sign-up">
            <img src={logo} alt="Logo" className="sign-up-logo" />
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="form-input" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
                    <input 
                        type="password" 
                        id="confirm-password" 
                        className="form-input" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="sign-up-button">Sign Up</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
