import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import Toggle from '../Toggle/Toggle';
import { useState, useRef } from 'react';

function SearchForm({ searchMovies, selected, setSelected }) {
    const [inputColor, setInputColor] = useState('#a0a0a0');
    const inputRef = useRef();

    function handleChange() {
        if (inputRef.current.value.length > 0) {
            setInputColor('black');
        } else {
            setInputColor('#a0a0a0');
        }
    }

    function searchHandler(e) {
        e.preventDefault();

        searchMovies(inputRef.current.value, false);
    }

    return (
        <div className="search-form">
            <form className="search-form__form" onSubmit={searchHandler}>
                <div className="search-form__search-bar">
                    <input
                        className="search-form__input"
                        type="text"
                        placeholder="Фильм"
                        style={{ color: inputColor }}
                        ref={inputRef}
                        onChange={handleChange}
                    />
                    <button
                        className="search-form__submit button"
                        type="submit"
                    >
                        <img
                            className="search-form__submit-icon"
                            alt="иконка поиска"
                            src={searchIcon}
                        />
                    </button>
                </div>
                <Toggle
                    label={'Короткометражки'}
                    selected={selected}
                    setSelected={setSelected}
                />
            </form>
        </div>
    );
}

export default SearchForm;
