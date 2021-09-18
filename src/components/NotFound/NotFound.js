import './NotFound.css';
import { useHistory } from 'react-router-dom';

function NotFound() {
	const history = useHistory();


    return (
        <div className="not-found">
            <h2 className="not-found__status-code">404</h2>
            <p className="not-found__error-text">
                Страница не найдена
            </p>

            <div className="not-found__button-container">
                <button
                    className="not-found__back-button button"
                    type="button"
                    onClick={history.goBack}
                >
                    Назад
                </button>
            </div>
        </div>
    );
}

export default NotFound;
