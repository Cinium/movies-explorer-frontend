import './Footer.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Footer() {
    const location = useLocation();
    const [color, setColor] = useState('');

    useEffect(() => {
        if (location.pathname === '/') {
            setColor('#FAFAFA');
        } else {
            setColor('white');
        }
    }, [location.pathname, color]);

    return (
        <div className="footer" style={{ backgroundColor: color }}>
            <p className="footer__title">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>

            <div className="footer__container">
                <p className="footer__copyright">&copy; 2021</p>

                <ul className="footer__links-list">
                    <li className="footer__links-li">
                        <a
                            className="footer__link button"
                            target="_blank"
                            rel="noreferrer"
                            href="https://practicum.yandex.ru/web"
                        >
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className="footer__links-li">
                        <a
                            className="footer__link button"
                            target="_blank"
                            rel="noreferrer"
                            href="https://github.com/"
                        >
                            Github
                        </a>
                    </li>
                    <li className="footer__links-li">
                        <a
                            className="footer__link button"
                            target="_blank"
                            rel="noreferrer"
                            href="https://facebook.com/"
                        >
                            Facebook
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
