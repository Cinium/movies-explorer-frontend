import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React, { useContext } from 'react';
import Preloader from '../../Preloader/Preloader';
import userContext from '../../../contexts/userContext';

function MoviesCardList({
    toggleLikeState,
    deleteSavedMovie,
    isLoading,
    movies,
    likedMovies,
    isCardSaved,
}) {
    const user = useContext(userContext);

    function checkMovieLike(movie) {
        if (likedMovies) {
            return likedMovies.some(m => movie.id === m.movieId);
        }
    }

    return isLoading ? (
        <Preloader />
    ) : (
        <div className="movies-list">
            {movies.map(movie => {
                return (
                    <MoviesCard
                        isOwner={user._id}
                        movie={movie}
                        key={movie.id || movie.movieId}
                        toggleLikeState={toggleLikeState}
                        deleteSavedMovie={deleteSavedMovie}
                        saved={isCardSaved}
                        liked={isCardSaved ? false : checkMovieLike(movie)}
                    />
                );
            })}
        </div>
    );
}

export default MoviesCardList;
