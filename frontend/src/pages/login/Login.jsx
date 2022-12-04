import React, { useContext, useRef } from 'react';
import { loginCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext';
import "./Login.css";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(email.current.value);
        // console.log(password.current.value);
        loginCall(
            {
                email: email.current.value,
                password: password.current.value,
            },
            dispatch
        );
    };

    console.log(user);

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className='loginLogo'>Real SNS</h3>
                    <span className="loginDesc">This is a product made by Quang.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                        <p className="loginMsg">Login</p>
                        <input
                            type="email"
                            className="loginInput"
                            placeholder='E-mail'
                            required
                            ref={email} />
                        <input
                            type="password"
                            className="loginInput"
                            placeholder='Password'
                            required
                            minLength="6"
                            ref={password} />
                        <button className="loginButton">Login this way</button>
                        <span className="loginForgot">I forgot my password...</span>
                        <button className="loginRegisterButton">Create new account</button>
                    </form>
                </div>
            </div>
        </div>

    );
}
