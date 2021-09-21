import './Promo.css';
import logo from '../../../images/landing-logo.svg';

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <img
                className="promo__logo"
                alt="лого практикума"
                src={logo}
            />
        </section>
    );
}

export default Promo;
