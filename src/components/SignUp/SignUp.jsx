import { useState } from "react";
import "./SignUp.scss";
import logo from "../../assets/icons/icon.png";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrors({ ...errors, email: "Invalid email address" });
      return;
    }
    if (password.length < 6) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters long",
      });
      return;
    }
    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Sign up successful!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/choicespage");
      }, 2000);
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      }
      toast.error(errorMessage);
      console.error("Error signing up:", error.message);
    }
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <div className="sign-up">
      <img src={logo} alt="Logo" className="sign-up-logo" />
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: "" });
            }}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirm-password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors({ ...errors, confirmPassword: "" });
            }}
            required
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" className="sign-up-button">
          Sign Up
        </button>
      </form>
      <div className="sign-in-prompt">
        <p>
          Already have an account?{" "}
          <span onClick={handleSignInClick} className="sign-in-link">
            Sign in here!
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
