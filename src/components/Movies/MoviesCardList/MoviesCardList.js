import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React, { useEffect } from 'react';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList({
    isCardSaved,
    buttonText,
    loadMovies,
    isLoading,
    movies,
    location,
}) {
    
    useEffect(() => {
        loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return isLoading ? (
        <Preloader />
    ) : (
        <div className="movies-list">
            {movies.map((movie, i) => {
                return (
                    <MoviesCard
                        isSaved={isCardSaved}
                        buttonText={buttonText}
                        movie={movie}
                        key={i}
                    />
                );
            })}
        </div>
    );
}

export default MoviesCardList;
