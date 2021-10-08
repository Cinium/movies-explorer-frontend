import './Header.css';
import {
    useLocation,
    Link,
    NavLink,
} from 'react-router-dom';
import logo from '../../images/logo.svg';
import profileIcon from '../../images/profile-icon.svg';
import { useState, useEffect, useContext } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import userContext from '../../contexts/userContext';

function Header({ isMobile }) {
    const location = useLocation();
    const [color, setColor] = useState('');
    const [textColor, setTextColor] = useState('');
    const currentUser = useContext(userContext);

    useEffect(() => {
        if (location.pathname === '/') {
            setColor('#5C5C5C');
            setTextColor('white')
        } else {
            setColor('white');
            setTextColor('black')
        }
    }, [location.pathname, color]);

    return (
        <div className="header" style={{ backgroundColor: color }}>
            <Link className="header__logo button" to="/">
                <img
                    className="header__logo-icon button"
                    alt="лого"
                    src={logo}
                />
            </Link>

            {currentUser ? (
                <div className="header__wrapper">
                    {isMobile ? (
                        <BurgerMenu textColor={textColor} />
                    ) : (
                        <>
                            <nav className="header__nav-container">
                                <NavLink
                                    to="/movies"
                                    activeClassName="header__nav_active"
                                    className="header__nav button"
                                    style={{ color: textColor }}
                                >
                                    Фильмы
                                </NavLink>
                                <NavLink
                                    to="/saved-movies"
                                    activeClassName="header__nav_active"
                                    className="header__nav button"
                                    style={{ color: textColor }}
                                >
                                    Сохранённые фильмы
                                </NavLink>
                            </nav>

                            <div className="header__account-buttons">
                                <Link
                                    to="/profile"
                                    className="header__profile-button button"
                                    style={{ color: textColor }}
                                >
                                    Аккаунт
                                    <img
                                        className="header__profile-icon"
                                        src={profileIcon}
                                        alt="иконка профиля"
                                    />
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="header__wrapper">
                    <nav className="header__nav-container"></nav>

                    <div className="header__account-buttons">
                        <Link
                            to="/signup"
                            className="header__register-button button"
                        >
                            Регистрация
                        </Link>
                        <Link
                            to="/signin"
                            className="header__login-button button"
                        >
                            Войти
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
