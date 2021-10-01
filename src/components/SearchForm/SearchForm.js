import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import Toggle from '../Toggle/Toggle';
import { useState, useRef, useCallback } from 'react';

function SearchForm({ searchMovies }) {
    const [input, setInput] = useState('');
    const [inputColor, setInputColor] = useState('#a0a0a0');
    const inputRef = useRef();
    const [selected, setSelected] = useState(JSON.parse(localStorage.getItem('toggleState')));

    function handleChange(e) {
        setInput(inputRef.current.value);

        if (inputRef.current.value.length > 0) {
            setInputColor('black');
        } else {
            setInputColor('#a0a0a0');
        }
    }

    function searchHandler(e) {
        e.preventDefault();

        searchMovies(input, selected);
    }

    const memo = useCallback(() => {
        searchMovies(input, selected);
    }, [input, searchMovies, selected])

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
                        value={input}
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
                    memo={memo}
                />
            </form>
        </div>
    );
}

export default SearchForm;
