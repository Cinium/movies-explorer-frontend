/* eslint-disable react-hooks/exhaustive-deps */
import './MoreMovies.css';
import React, { useEffect } from 'react';

function MoreMovies({
    movies,
    sliceMovies,
    numberOfCards,
    setNumberOfCards,
    cardsInRow,
}) {
    useEffect(() => {
        sliceMovies(0, numberOfCards);
    }, [movies]);

    function showMoreCards() {
        sliceMovies(numberOfCards, numberOfCards + cardsInRow);
        setNumberOfCards(numberOfCards + cardsInRow);
    }

    return (
        <div className="more-movies">
            <button
                onClick={showMoreCards}
                type="button"
                className="more-movies__button button"
            >
                Ещё
            </button>
        </div>
    );
}

export default MoreMovies;
