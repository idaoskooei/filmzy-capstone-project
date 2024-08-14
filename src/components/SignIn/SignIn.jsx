import { useState } from 'react';
import './SignIn.scss';
import logo from '../../assets/icons/welcome-back.png';
import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            toast.success('Sign in successful!');
            setTimeout(() => {
                navigate('/choicespage');
            }, 2000);

        } catch (error) {
            toast.error(error.message);
            console.error('Error signing in:', error.message);
        }
    };

    return (
        <div className="sign-in">
            <img src={logo} alt="Logo" className="sign-in-logo" />
            <form className="sign-in-form" onSubmit={handleSubmit}>
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
                <button type="submit" className="sign-in-button">Sign In</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignIn;
