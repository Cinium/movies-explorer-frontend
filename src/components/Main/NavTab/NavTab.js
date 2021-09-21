import './NavTab.css';

function NavTab() {
    return (
        <nav className="nav-tab">
            <ul className="nav-tab__links-list">
                <li className="nav-tab__li">
                    <a
                        className="nav-tab__link button"
                        href="#about-project">
                        О проекте
                    </a>
                </li>
                <li className="nav-tab__li button">
                    <a className="nav-tab__link" href="#techs">
                        Технологии
                    </a>
                </li>
                <li className="nav-tab__li button">
                    <a
                        className="nav-tab__link"
                        href="#about-student">
                        Студент
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;
