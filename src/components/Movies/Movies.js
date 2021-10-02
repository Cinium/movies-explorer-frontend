/* eslint-disable react-hooks/exhaustive-deps */
import MoreMovies from './MoreMovies/MoreMovies';
import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import NothingFound from '../NothingFound/NothingFound';
import React, { useEffect, useState } from 'react';

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

    async function searchMainMovies(input, checkbox) {
        if (!localStorage.getItem('allMovies')) {
            const movies = await loadMovies();
            localStorage.setItem('allMovies', JSON.stringify(movies));
        }

        const mainMovies = JSON.parse(localStorage.getItem('allMovies'));
        searchMovies(input, mainMovies, setMovies, true, checkbox);
        setCardsToShow([]);
    }

    function sliceMovies(start, end) {
        const slicedPosts = movies.slice(start, end);
        setCardsToShow([...cardsToShow, ...slicedPosts]);
    }
    
    return (
        <div className="movies">
            <SearchForm
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
