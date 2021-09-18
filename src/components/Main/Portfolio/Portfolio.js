import arrow from '../../../images/link-arrow.svg';
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <li className="portfolio__links-li">
                    <a
                        className="portfolio__link button"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.google.com/search?btnG=1&pws=0&q=%D0%A1%D1%82%D0%B0%D1%82%D0%B8%D1%87%D0%BD%D1%8B%D0%B9+%D1%81%D0%B0%D0%B9%D1%82"
                    >
                        Статичный сайт
                        <img
                            className="portfolio-arrow-icon"
                            alt="иконка ссылки"
                            src={arrow}
                        />
                    </a>
                </li>
                <li className="portfolio__links-li">
                    <a
                        className="portfolio__link button"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.google.com/search?btnG=1&pws=0&q=%D0%90%D0%B4%D0%B0%D0%BF%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9+%D1%81%D0%B0%D0%B9%D1%82"
                    >
                        Адаптивный сайт
                        <img
                            className="portfolio-arrow-icon"
                            alt="иконка ссылки"
                            src={arrow}
                        />
                    </a>
                </li>
                <li className="portfolio__links-li">
                    <a
                        className="portfolio__link button"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.google.com/search?btnG=1&pws=0&q=%D0%9E%D0%B4%D0%BD%D0%BE%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%BD%D0%BE%D0%B5+%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5"
                    >
                        Одностраничное приложение
                        <img
                            className="portfolio-arrow-icon"
                            alt="иконка ссылки"
                            src={arrow}
                        />
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
