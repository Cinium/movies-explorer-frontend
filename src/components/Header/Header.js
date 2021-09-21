import './Header.css';
import {
    useLocation,
    Link,
    NavLink,
    Route,
    Switch,
} from 'react-router-dom';
import logo from '../../images/logo.svg';
import profileIcon from '../../images/profile-icon.svg';
import { useState, useEffect } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({ isMobile }) {
    const location = useLocation();
    const [color, setColor] = useState('');
    const headerLogo = (
        <Link className="header__logo button" to="/">
            <img
                className="header__logo-icon button"
                alt="лого"
                src={logo}
            />
        </Link>
    );

    useEffect(() => {
        if (location.pathname === '/') {
            setColor('#5C5C5C');
        } else {
            setColor('white');
        }
    }, [location.pathname, color]);

    if (isMobile) {
        return (
            <div className="header" style={{ backgroundColor: color }}>
                {headerLogo}
                <Switch>
                    <Route exact path="/">
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
                    </Route>

                    <Route>
                        <BurgerMenu />
                    </Route>
                </Switch>
            </div>
        );
    }

    return (
        <div className="header" style={{ backgroundColor: color }}>
            <Switch>
                <Route exact path="/">
                    {headerLogo}
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
                </Route>

                <Route>
                    <nav className="header__nav-container">
                        {headerLogo}
                        <NavLink
                            to="/movies"
                            activeClassName="header__nav_active"
                            className="header__nav button"
                        >
                            Фильмы
                        </NavLink>
                        <NavLink
                            to="/saved-movies"
                            activeClassName="header__nav_active"
                            className="header__nav button"
                        >
                            Сохранённые фильмы
                        </NavLink>
                    </nav>

                    <div className="header__account-buttons">
                        <Link
                            to="/profile"
                            className="header__profile-button button"
                        >
                            Аккаунт
                            <img
                                className="header__profile-icon"
                                src={profileIcon}
                                alt="иконка профиля"
                            />
                        </Link>
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

export default Header;
