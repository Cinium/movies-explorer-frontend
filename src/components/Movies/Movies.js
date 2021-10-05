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
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setCardsToShow([]);
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
        filterShorts();
    }, [selected, movies]);

    function filterShorts() {
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
        const slicedPosts = movies.slice(start, end);
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
                            movies.length > numberOfCards
                                ? cardsToShow
                                : movies
                        }
                        likedMovies={filteredMovies}
                        isCardSaved={false}
                        selected={selected}
                    />
                    {movies.length > numberOfCards && (
                        <MoreMovies
                            movies={movies}
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
