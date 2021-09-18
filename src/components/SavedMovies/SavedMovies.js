import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { savedMovies } from '../../utils/constants/movies';
import React, { useState } from 'react';

function simulateFetch() {
    return new Promise(res => {
        setTimeout(() => {
            res(savedMovies);
        }, 2000);
    });
}

function SavedMovies() {
    const [isLoading, setIsLoading] = useState(null);
    const [movies, setMovies] = useState([]);

    async function loadMovies() {
        setIsLoading(true);
        try {
            const moviesList = await simulateFetch();
            setMovies(moviesList);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="saved-movies">
            <SearchForm />
            <MoviesCardList
                isCardSaved={true}
                buttonText={'+'}
                loadMovies={loadMovies}
                isLoading={isLoading}
                movies={movies}
            />
        </div>
    );
}

export default SavedMovies;
