import './MoviesCard.css';
import likedIcon from '../../../images/saved-icon.svg';
import xIcon from '../../../images/x-icon.svg';
import { useState } from 'react';

function MoviesCard({
    movie,
    toggleLikeState,
    deleteSavedMovie,
    saved,
    liked,
}) {
    const [isLiked, setIsLiked] = useState(liked);

    const buttonIcon = (
        <img src={saved ? xIcon : likedIcon} alt="сохранено" />
    );

    async function handleLike() {
        await toggleLikeState(movie, isLiked);
        setIsLiked(!isLiked);
    }

    function handleDelete() {
        deleteSavedMovie(movie.movieId);
    }

    function showTrailer() {
        saved
            ? window.open(movie.trailer)
            : window.open(movie.trailerLink);
    }

    return (
        <div className="movies-card">
            <div className="movies-card__info">
                <h3 className="movies-card__name">{movie.nameRU}</h3>
                <p className="movies-card__duration">
                    {movie.duration} минут
                </p>
            </div>

            <div
                className="movies-card__image-container"
                onClick={showTrailer}
            >
                <img
                    className="movies-card__image"
                    alt={`изображение фильма «${movie.nameRU}»`}
                    src={
                        saved
                            ? movie.image
                            : `https://api.nomoreparties.co${movie.image.url}`
                    }
                />
            </div>

            <button
                type="button"
                className={`movies-card__button button ${
                    isLiked ? 'movies-card__button_liked' : ''
                }`}
                onClick={!saved ? handleLike : handleDelete}
            >
                <p className={`movies-card__button-text`}>
                    {isLiked || saved ? buttonIcon : 'Сохранить'}
                </p>
            </button>
        </div>
    );
}

export default MoviesCard;
