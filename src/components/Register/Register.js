import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register({ handleRegister }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleInputChange(e) {
        e.target.id === 'name' && setName(e.target.value);
        e.target.id === 'email' && setEmail(e.target.value);
        e.target.id === 'password' && setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        handleRegister(name, email, password)
    }

    return (
        <div className="register">
            <Link className="register__logo button" to="/">
                <img
                    className="register__logo button"
                    alt="лого"
                    src={logo}
                />
            </Link>
            <h2 className="register__greeting">Добро пожаловать!</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__input-label" htmlFor="name">
                    Имя
                </label>
                <input
                    type="text"
                    className="register__input"
                    id="name"
                    required
                    onChange={handleInputChange}
                    value={name}
                />

                <label className="register__input-label" htmlFor="email">
                    E-mail
                </label>
                <input
                    type="email"
                    className="register__input"
                    id="email"
                    required
                    onChange={handleInputChange}
                    value={email}
                />

                <label
                    className="register__input-label"
                    htmlFor="password"
                >
                    Пароль
                </label>
                <input
                    type="password"
                    className="register__input"
                    id="password"
                    required
                    onChange={handleInputChange}
                    value={password}
                />

                <button className="register__submit button" type="submit">
                    Зарегистрироваться
                </button>
                <p className="register__to-login">
                    Уже зарегистрированы?
                    <Link to="/signin" className="register__to-login-link">
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
