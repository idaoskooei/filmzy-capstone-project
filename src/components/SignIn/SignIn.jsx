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
    const [errors, setErrors] = useState({ email: '', password: '' });

    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrors({ ...errors, email: 'Invalid email address' });
            return;
        }
        if (password.length < 6) {
            setErrors({ ...errors, password: 'Password must be at least 6 characters long' });
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast.success('Sign in successful!');
            setEmail('');
            setPassword('');
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (error) {
            let errorMessage = 'An error occurred';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No user found with this email';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            }
            toast.error(errorMessage);
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
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, email: '' }); 
                        }} 
                        required 
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-input" 
                        value={password} 
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({ ...errors, password: '' }); 
                        }} 
                        required 
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>
                <button type="submit" className="sign-in-button">Sign In</button>
            </form>
            <div className="sign-up-link">
                <p> Don't have an account yet?  <a href="/signup">  Sign up here</a></p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignIn;
