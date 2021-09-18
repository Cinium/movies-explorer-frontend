import './AboutMe.css';

function AboutMe() {
    return (
        <div className="about-me" id="about-student">
            <h2 className="about-me__title main__title">Студент</h2>
            <div className="about-me__photo" alt="фото студента" />
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__job-age">
                Фронтенд-разработчик, 30 лет
            </p>
            <p className="about-me__main-text">
                Я родился и живу в Саратове, закончил факультет экономики
                СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё
                увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
                в компании «СКБ Контур». После того, как прошёл курс по
                веб-разработке, начал заниматься фриланс-заказами и ушёл с
                постоянной работы.
            </p>
            <ul className="about-me__links-list">
                <li className="about-me__links-li">
                    <a
                        className="about-me__link button"
                        target="_blank"
                        rel="noreferrer"
                        href="https://facebook.com/"
                    >
                        Facebook
                    </a>
                </li>
                <li className="about-me__links-li">
                    <a
                        className="about-me__link button"
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/"
                    >
                        Github
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default AboutMe;
