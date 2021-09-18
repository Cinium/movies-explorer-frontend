import MoreMovies from './MoreMovies/MoreMovies';
import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import {moviesList} from '../../utils/constants/movies';
import React, { useState } from 'react';

function simulateFetch() {
    return new Promise(res => {
        setTimeout(() => {
            res(moviesList);
        }, 2000);
    });
}

function Movies() {
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
        <div className="movies">
            <SearchForm />
            <MoviesCardList
                isCardSaved={false}
                buttonText={'Сохранить'}
                loadMovies={loadMovies}
                isLoading={isLoading}
                movies={movies}
            />
            <MoreMovies />
        </div>
    );
}

export default Movies;
