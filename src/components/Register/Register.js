import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useForm from '../../utils/Validation';

function Register({ handleRegister }) {
    const { values, handleChange, errors, isValid, resetForm } = useForm();

    async function handleSubmit(e) {
        e.preventDefault();

        const { name, email, password } = values;

        await handleRegister(name, email, password);
        resetForm();
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
                    className={`register__input ${
                        errors.name && 'register__input_error'
                    }`}
                    id="name"
                    name="name"
                    minLength="2"
                    maxLength="30"
                    required
                    onChange={handleChange}
                />
                <span className="register__input-error">
                    {errors.name}
                </span>

                <label className="register__input-label" htmlFor="email">
                    E-mail
                </label>
                <input
                    type="email"
                    className={`register__input ${
                        errors.email && 'register__input_error'
                    }`}
                    id="email"
                    name="email"
                    required
                    onChange={handleChange}
                />
                <span className="register__input-error">
                    {errors.email}
                </span>

                <label
                    className="register__input-label"
                    htmlFor="password"
                >
                    Пароль
                </label>
                <input
                    type="password"
                    className={`register__input ${
                        errors.password && 'register__input_error'
                    }`}
                    id="password"
                    name="password"
                    required
                    onChange={handleChange}
                />
                <span className="register__input-error">
                    {errors.password}
                </span>

                <button
                    className={`register__submit button ${
                        !isValid && 'register__submit_disabled'
                    }`}
                    type="submit"
                    disabled={!isValid && true}
                >
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
