import './NothingFound.css';

function NothingFound({ errorState, message }) {
    return (
        <h2 className="nothing-found">{`${
            errorState
                ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
                : message
        }`}</h2>
    );
}

export default NothingFound;;