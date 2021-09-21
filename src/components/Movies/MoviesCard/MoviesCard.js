import './MoviesCard.css';
import likedIcon from '../../../images/saved-icon.svg';
import { useState } from 'react';

function MoviesCard({ movie, isSaved, buttonText }) {
    const [isLiked, setIsLiked] = useState(false);

    const buttonLikedIcon = <img src={likedIcon} alt="сохранено" />;

    function handleLike() {
        setIsLiked(!isLiked);
        console.log('liked!');
    }

    function handleDelete() {
        console.log('deleted!');
    }

    return (
        <div className="movies-card">
            <div className="movies-card__info">
                <h3 className="movies-card__name">{movie.nameRU}</h3>
                <p className="movies-card__duration">
                    {movie.duration} минут
                </p>
            </div>

            <div className="movies-card__image-container">
                <img
                    className="movies-card__image"
                    alt={`изображение фильма «${movie.nameRU}»`}
                    src={movie.image}
                />
            </div>

            <button
                type="button"
                className={`movies-card__button button ${
                    isLiked && !isSaved
                        ? 'movies-card__button_liked'
                        : ''
                }`}
                onClick={isSaved ? handleDelete : handleLike}
            >
                <p
                    className={`movies-card__button-text ${
                        isSaved
                            ? 'movies-card__button-text_delete'
                            : ''
                    }`}
                >
                    {isLiked && !isSaved
                        ? buttonLikedIcon
                        : buttonText}
                </p>
            </button>
        </div>
    );
}

export default MoviesCard;
