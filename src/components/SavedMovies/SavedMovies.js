/* eslint-disable react-hooks/exhaustive-deps */
import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import NothingFound from '../NothingFound/NothingFound';
import React, { useEffect, useState } from 'react';
import { DURATION_OF_SHORTS } from '../../utils/constants/constants';

function SavedMovies({
    loadMovies,
    isLoading,
    deleteSavedMovie,
    movies,
    searchMovies,
    setMovies,
    errorState,
}) {
    const [selected, setSelected] = useState(false);
    const [cardsToShow, setCardsToShow] = useState([]);

    useEffect(() => {
        const savedMovies = JSON.parse(
            localStorage.getItem('savedMovies')
        );

        localStorage.setItem('toggleState', JSON.stringify(false));
        setSelected();

        setMovies(savedMovies);
        setCardsToShow(savedMovies);
    }, []);

    useEffect(() => {
        if (selected) {
            setCardsToShow(
                movies.filter(m => {
                    if (m.duration > DURATION_OF_SHORTS) {
                        return false;
                    }
                    return true;
                })
            );
        } else {
            setCardsToShow(movies);
        }
    }, [selected, movies]);

    async function searchSavedMovies(input) {
        const savedMovies = JSON.parse(
            localStorage.getItem('savedMovies')
        );
        searchMovies(input, savedMovies, setMovies, false);
    }

    return (
        <div className="saved-movies">
            <SearchForm
                selected={selected}
                setSelected={setSelected}
                searchMovies={searchSavedMovies}
            />

            {!movies || movies.length === 0 ? (
                <NothingFound
                    message={!movies ? 'Начните поиск!' : 'Ничего('}
                    errorState={errorState}
                />
            ) : (
                <MoviesCardList
                    deleteSavedMovie={deleteSavedMovie}
                    loadMovies={loadMovies}
                    isLoading={isLoading}
                    movies={cardsToShow}
                    isCardSaved={true}
                    selected={selected}
                />
            )}
        </div>
    );
}

export default SavedMovies;
