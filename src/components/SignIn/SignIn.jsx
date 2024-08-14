import { useState } from 'react';
import './SignIn.scss';
import logo from '../../assets/icons/welcome-back.png';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="sign-in">
            <img src={logo} alt="Logo" className="sign-in-logo" />
            <form className="sign-in-form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" id="password" className="form-input" />
                </div>
                <button type="submit" className="sign-in-button">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
