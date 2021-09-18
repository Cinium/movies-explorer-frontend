import './Profile.css';

function Profile() {
	return (
        <div className="profile">
            <h2 className="profile__greeting">Привет, ИМЯ!</h2>
            <div className="profile__data-container">
                <div className="profile__data-item">
                    Имя
                    <p className="profile__user-data">
                        ИМЯ ПОЛЬЗОВАТЕЛЯ
                    </p>
                </div>
                <div className="profile__data-item">
                    E-mail
                    <p className="profile__user-data">
                        pochta@email.ru
                    </p>
                </div>
            </div>

            <div className="profile__buttons">
                <button
                    type="button"
                    className="profile__edit-button"
                >
                    Редактировать
                </button>
                <button
                    type="button"
                    className="profile__logout-button"
                >
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
}

export default Profile;