/* eslint-disable react-hooks/exhaustive-deps */
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React, { useContext, useEffect, useState } from 'react';
import Preloader from '../../Preloader/Preloader';
import userContext from '../../../contexts/userContext';
import { DURATION_OF_SHORTS } from '../../../utils/constants/constants';

function MoviesCardList({
    toggleLikeState,
    deleteSavedMovie,
    isLoading,
    movies,
    likedMovies,
    isCardSaved,
    selected,
}) {
    const user = useContext(userContext);
    const [moviesToRender, setMoviesToRender] = useState([]);

    function checkMovieLike(movie) {
        if (likedMovies) {
            return likedMovies.some(m => movie.id === m.movieId);
        }
    }

    useEffect(() => {
        if (selected) {
            setMoviesToRender(
                movies.filter(m => {
                    if (m.duration > DURATION_OF_SHORTS) {
                        return false;
                    }
                    return true;
                })
            );
        } else {
            setMoviesToRender(movies);
        }
    }, [movies, selected]);

    return isLoading ? (
        <Preloader />
    ) : (
        <div className="movies-list">
            {moviesToRender.map(movie => {
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
