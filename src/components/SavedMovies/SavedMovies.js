/* eslint-disable react-hooks/exhaustive-deps */
import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import NothingFound from '../NothingFound/NothingFound';
import React, { useEffect } from 'react';

function SavedMovies({
    loadMovies,
    isLoading,
    deleteSavedMovie,
    movies,
    searchMovies,
    setMovies,
    errorState,
}) {
    useEffect(() => {
        const savedMovies = JSON.parse(
            localStorage.getItem('savedMovies')
        );

        localStorage.setItem('toggleState', JSON.stringify(false))

        setMovies(savedMovies);
    }, []);

    async function searchSavedMovies(input, checkbox) {
        const savedMovies = await loadMovies();
        searchMovies(input, savedMovies, setMovies, checkbox);
    }

    return (
        <div className="saved-movies">
            <SearchForm searchMovies={searchSavedMovies} />

            {!movies || movies.length === 0 ? (
                <NothingFound
                    message={
                        !movies
                            ? 'Начните поиск!'
                            : 'Ничего('
                    }
                    errorState={errorState}
                />
            ) : (
                <MoviesCardList
                    deleteSavedMovie={deleteSavedMovie}
                    loadMovies={loadMovies}
                    isLoading={isLoading}
                    movies={movies}
                    isCardSaved={true}
                />
            )}
        </div>
    );
}

export default SavedMovies;
