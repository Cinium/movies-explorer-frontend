import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleInputChange(e) {
        e.target.id === 'email' && setEmail(e.target.value);
        e.target.id === 'password' && setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        handleLogin(email, password);
    }

    return (
        <div className="login">
            <Link to="/" className="login__logo button">
                <img
                    className="login__logo button"
                    alt="лого"
                    src={logo}
                />
            </Link>
            <h2 className="login__greeting">Рады видеть!</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__input-label" htmlFor="email">
                    E-mail
                </label>
                <input
                    type="email"
                    className="login__input"
                    id="email"
                    required
                    onChange={handleInputChange}
                    value={email}
                />

                <label className="login__input-label" htmlFor="password">
                    Пароль
                </label>
                <input
                    type="password"
                    className="login__input"
                    id="password"
                    required
                    onChange={handleInputChange}
                    value={password}
                />

                <button className="login__submit button" type="submit">
                    Войти
                </button>
                <p className="login__to-register">
                    Ещё не зарегистрированы?
                    <Link to="/signup" className="login__to-register-link">
                        Регистрация
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
