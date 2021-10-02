import './Popup.css';

function Popup({ isOpen, setIsOpen }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__close-button-container">
                <button
                    className="popup__close-button"
                    onClick={() => setIsOpen(false)}
                >
                    &times;
                </button>
            </div>
            <div className="popup__text-container">
                <h2 className="popup__title">Упс!</h2>
                <p className="popup__message">Что-то пошло не так</p>
            </div>
        </div>
    );
}

export default Popup;
