import { useState } from 'react';
import './SignUp.scss';
import logo from '../../assets/icons/welcome-back.png'; // Update this path if necessary

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log('Email:', email);
        console.log('Password:', password);
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
        </div>
    );
};

export default SignUp;
