import './BurgerMenu.css';
import profileIcon from '../../images/profile-icon.svg';
import { Link, NavLink } from 'react-router-dom';
import { useRef } from 'react';

function BurgerMenu({ textColor }) {
    const checkboxRef = useRef();

    const closeMenu = () => {
        checkboxRef.current.checked = false;
    };

    return (
        <div className="burger-menu">
            <input id="burger-toggle" type="checkbox" ref={checkboxRef} />

            <label className="burger-menu__button" htmlFor="burger-toggle">
                <span
                    className="burger-menu__icon"
                    style={{ backgroundColor: textColor }}
                ></span>
            </label>

            <ul className="burger-menu__menu">
                <div className="burger-menu__nav">
                    <li>
                        <NavLink
                            className="burger-menu__item"
                            activeClassName="burger-menu__item_active"
                            exact
                            to="/"
                            onClick={closeMenu}
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="burger-menu__item"
                            activeClassName="burger-menu__item_active"
                            to="/movies"
                            onClick={closeMenu}
                        >
                            Фильмы
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="burger-menu__item"
                            activeClassName="burger-menu__item_active"
                            to="/saved-movies"
                            onClick={closeMenu}
                        >
                            Сохранённые фильмы
                        </NavLink>
                    </li>
                </div>
                <Link
                    to="/profile"
                    className="burger-menu__profile-button"
                    onClick={closeMenu}
                >
                    Аккаунт
                    <img
                        className="burger-menu__profile-icon"
                        src={profileIcon}
                        alt="иконка профиля"
                    />
                </Link>
            </ul>
        </div>
    );
}

export default BurgerMenu;
