import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__title main__title">О проекте</h2>
            <div className="about-project__text">
                <div className="about-project__grid-element">
                    <h3 className="about-project__subtitle">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__paragraph">
                        Составление плана, работу над бэкендом,
                        вёрстку, добавление функциональности и
                        финальные доработки.
                    </p>
                </div>
                <div className="about-project__grid-element">
                    <h3 className="about-project__subtitle">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__paragraph">
                        У каждого этапа был мягкий и жёсткий дедлайн,
                        которые нужно было соблюдать, чтобы успешно
                        защититься.
                    </p>
                </div>
            </div>
            <div className="about-project__timeline">
                <p className="about-project__timeline-text_one about-project__timeline-text">
                    1 неделя
                </p>
                <p className="about-project__timeline-text_four about-project__timeline-text">
                    4 недели
                </p>
                <span className="about-project__timeline-span">
                    Back-end
                </span>
                <span className="about-project__timeline-span">
                    Front-end
                </span>
            </div>
        </section>
    );
}

export default AboutProject;
