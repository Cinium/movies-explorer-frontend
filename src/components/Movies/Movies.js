/* eslint-disable react-hooks/exhaustive-deps */
import MoreMovies from './MoreMovies/MoreMovies';
import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import NothingFound from '../NothingFound/NothingFound';
import React, { useEffect, useState } from 'react';
import { DURATION_OF_SHORTS } from '../../utils/constants/constants';

function Movies({
    setMovies,
    toggleLikeState,
    isLoading,
    filteredMovies,
    searchMovies,
    movies,
    loadMovies,
    setLikedMovies,
    errorState,
    numberOfCards,
    setNumberOfCards,
    cardsInRow,
}) {
    const [cardsToShow, setCardsToShow] = useState([]);
    const [cardsToSlice, setCardsToSlice] = useState([]);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        const mainMovies = JSON.parse(localStorage.getItem('mainMovies'));
        const filteredLikedMovies = JSON.parse(
            localStorage.getItem('filteredLikedMovies')
        );

        if (mainMovies) {
            setMovies(mainMovies);
            setLikedMovies(filteredLikedMovies);
        } else {
            setMovies([]);
        }
    }, []);

    useEffect(() => {
        setCardsToShow([]);
        filterShorts();
    }, [selected, movies]);

    function filterShorts() {
        if (selected) {
            setCardsToSlice(
                movies.filter(m => {
                    if (m.duration > DURATION_OF_SHORTS) {
                        return false;
                    }
                    return true;
                })
            );
        } else {
            setCardsToSlice(movies);
        }
    }

    function searchMainMovies(input) {
        if (!localStorage.getItem('allMovies')) {
            loadMovies();
        }
        const allMovies = JSON.parse(localStorage.getItem('allMovies'));
        searchMovies(input, allMovies, setMovies, true);
        setCardsToShow([]);
    }

    function sliceMovies(start, end) {
        const slicedPosts = cardsToSlice.slice(start, end);
        setCardsToShow([...cardsToShow, ...slicedPosts]);
    }

    return (
        <div className="movies">
            <SearchForm
                selected={selected}
                setSelected={setSelected}
                searchMovies={searchMainMovies}
            />

            {!movies || movies.length === 0 ? (
                <NothingFound
                    message={
                        movies === null
                            ? 'Начните поиск!'
                            : 'Ничего не найдено :-('
                    }
                    errorState={errorState}
                />
            ) : (
                <>
                    <MoviesCardList
                        toggleLikeState={toggleLikeState}
                        isLoading={isLoading}
                        movies={
                            cardsToSlice.length > numberOfCards
                                ? cardsToShow
                                : cardsToSlice
                        }
                        likedMovies={filteredMovies}
                        isCardSaved={false}
                        selected={selected}
                    />
                    {cardsToSlice.length > numberOfCards && (
                        <MoreMovies
                            movies={cardsToSlice}
                            sliceMovies={sliceMovies}
                            numberOfCards={numberOfCards}
                            setNumberOfCards={setNumberOfCards}
                            cardsInRow={cardsInRow}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Movies;
