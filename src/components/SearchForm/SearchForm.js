import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import Toggle from '../Toggle/Toggle';
import { useState, useRef } from 'react';

function SearchForm(props) {
    const [input, setInput] = useState('');
    const [inputColor, setInputColor] = useState('#a0a0a0');
    const [searchBarColor, setSearchBarColor] = useState(
        'rgba(170, 170, 170, 0.2)'
    );
    const inputRef = useRef();

    function handleChange(e) {
        setInput(inputRef.current.value);

        if (inputRef.current.value.length > 0) {
            setInputColor('black');
        } else {
            setInputColor('#a0a0a0');
        }
    }

    function changeColor(e) {
        e.type === 'focus'
            ? setSearchBarColor('#2be080')
            : setSearchBarColor('rgba(170, 170, 170, 0.2)');
    }

    function searchHandler(e) {
        e.preventDefault();
    }

    return (
        <div className="search-form">
            <form
                className="search-form__form"
                onSubmit={searchHandler}>
                <div
                    className="search-form__search-bar"
                    style={{ borderColor: searchBarColor }}>
                    <input
                        className="search-form__input"
                        type="text"
                        placeholder="Фильм"
                        required
                        style={{ color: inputColor }}
                        ref={inputRef}
                        onChange={handleChange}
                        onFocus={changeColor}
                        onBlur={changeColor}
                    />
                    <button
                        className="search-form__submit button"
                        type="submit">
                        <img
                            className="search-form__submit-icon"
                            alt="иконка поиска"
                            src={searchIcon}
                        />
                    </button>
                </div>
                <Toggle label={'Короткометражки'} />
            </form>
        </div>
    );
}

export default SearchForm;
