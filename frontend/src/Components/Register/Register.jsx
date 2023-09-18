import { useEffect, useState } from "react";
import "./register.css";
import { registerUser } from "../../redux1/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // const [registerMessage, setRegisterMessage] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        // Regular expression pattern for a valid email address
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // Test the email against the pattern
        return emailPattern.test(email);
    }

    let msg = useSelector((state) => state.auth.register?.message)

    const handleRegister = async (e) => {
        if (isValidEmail(email) === false) {
            return msg = "Your input email is invalid"
        } else {
            e.preventDefault();
            const newUser = {
                username: username,
                password: password,
                email: email,
            };
            registerUser(newUser, dispatch, navigate)
        }
    }

    return (
        <>
            <section className="register-container">
                <div className="register-title"> Sign up </div>
                <form onSubmit={handleRegister}
                    className="login-form"
                >
                    <label>EMAIL</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>USERNAME</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label>PASSWORD</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit"> Create account </button>
                </form>
            </section>
            {msg !== null &&
                <div className="register-error">
                    {msg}
                </div>
            }
        </>
    );
}

export default Register;