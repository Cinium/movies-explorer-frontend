import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
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
            <form className="register__form">
                <label
                    className="register__input-label"
                    htmlFor="name"
                >
                    Имя
                </label>
                <input
                    type="email"
                    className="register__input"
                    id="name"
                />

                <label
                    className="register__input-label"
                    htmlFor="email"
                >
                    E-mail
                </label>
                <input
                    type="email"
                    className="register__input"
                    id="email"
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
                />

                <button
                    className="register__submit button"
                    type="submit"
                >
                    Зарегистрироваться
                </button>
                <p className="register__to-login">
                    Уже зарегистрированы?
                    <Link
                        to="/signin"
                        className="register__to-login-link"
                    >
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
