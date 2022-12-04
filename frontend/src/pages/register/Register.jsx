import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Register.css"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirmation = useRef();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // confirm password
        if (password.current.value !== passwordConfirmation.current.value) {
            passwordConfirmation.current.setCustomValidity("Password mismatch.");
        } else {
            try {
                const user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                }

                // call registerApi
                await axios.post("/auth/register", user);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className='loginLogo'>Real SNS</h3>
                    <span className="loginDesc">This is a product made by Quang.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                        <p className="loginMsg">New Register</p>
                        <input
                            type="text"
                            className="loginInput"
                            placeholder='User Name'
                            required
                            ref={username} />
                        <input
                            type="email"
                            className="loginInput"
                            placeholder='E-mail'
                            required
                            ref={email} />
                        <input
                            type="password"
                            className="loginInput"
                            placeholder='Set password'
                            minLength="6"
                            required
                            ref={password} />
                        <input
                            type="password"
                            className="loginInput"
                            placeholder='Confirm password'
                            minLength="6"
                            required
                            ref={passwordConfirmation} />
                        <button className="loginButton" type="submit">Sign up</button>
                        <button className="loginRegisterButton">Login</button>
                    </form>
                </div>
            </div>
        </div>

    );
}
