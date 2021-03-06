import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import userContext from '../../contexts/userContext';
import movieApi from '../../utils/MoviesApi';
import {
    DURATION_OF_SHORTS,
    SCREEN_SIZE,
    CARDS_FOR,
    MORE_CARDS,
} from '../../utils/constants/constants';

function App() {
    const [isMobile, setIsMobile] = useState(false);
    const [responseMessage, setResponseMessage] = useState({});

    const [cardsInRow, setCardsInRow] = useState(3);
    const [numberOfCards, setNumberOfCards] = useState(0);

    const [currentUser, setCurrentUser] = useState({});

    const [isLoading, setIsLoading] = useState(null);

    const [mainMovies, setMainMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [likedMovies, setLikedMovies] = useState([]);

    const [errorState, setErrorState] = useState(false);

    const history = useHistory();

    useEffect(() => {
        checkViewWidth();
        window.addEventListener('resize', checkViewWidth);

        getUserDataFromLocal();
    }, []);

    function checkViewWidth() {
        if (window.innerWidth >= SCREEN_SIZE.BIG) {
            setCardsInRow(MORE_CARDS.MANY);
            setNumberOfCards(CARDS_FOR.BIG_SCREEN);
            setIsMobile(false);
        } else if (
            SCREEN_SIZE.MIDDLE <= window.innerWidth &&
            window.innerWidth < SCREEN_SIZE.BIG
        ) {
            setCardsInRow(MORE_CARDS.FEW);
            setNumberOfCards(CARDS_FOR.MIDDLE_SCREEN);
            setIsMobile(false);
        } else if (window.innerWidth < SCREEN_SIZE.MIDDLE) {
            setCardsInRow(MORE_CARDS.FEW);
            setNumberOfCards(CARDS_FOR.MOBILE);
            setIsMobile(true);
        }
    }

    async function handleRegister(name, email, password, resetForm) {
        setIsLoading(true);
        try {
            const res = await mainApi.register(name, email, password);

            if (!res) {
                throw new Error('??????-???? ???? ??????');
            }
            resetForm();
            await handleLogin(email, password);
        } catch (e) {
            const errText = await e.text();
            setResponseMessage({ text: errText.slice(12, -2), err: true });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleLogin(email, password, resetForm) {
        setIsLoading(true);
        try {
            const res = await mainApi.login(email, password);
            setCurrentUser(res);
            localStorage.setItem('currentUser', JSON.stringify(res));
            await loadSavedMovies();
            setMainMovies(null);
            history.push('/movies');
            resetForm && resetForm();
        } catch (e) {
            const errText = await e.text();
            setResponseMessage({ text: errText.slice(12, -2), err: true });
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        mainApi.logout().then(() => {
            setCurrentUser(null);
            localStorage.clear();
            history.push('/');
        });
    }

    function getUserDataFromLocal() {
        setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
        setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
        setLikedMovies(
            JSON.parse(localStorage.getItem('filteredLikedMovies'))
        );
        setMainMovies(JSON.parse(localStorage.getItem('mainMovies')));
        localStorage.setItem('toggleState', JSON.stringify(false));
    }

    async function changeUserInfo(email, name, resetForm) {
        setIsLoading(true);
        try {
            const res = await mainApi.changeUserInfo(email, name);
            localStorage.setItem('currentUser', JSON.stringify(res));
            setCurrentUser({
                ...currentUser,
                email: res.email,
                name: res.name,
            });
            setResponseMessage({ text: '??????????????????!', err: false });
            resetForm();
            setTimeout(() => {
                setResponseMessage({});
            }, 5000);
        } catch (e) {
            const errText = await e.text();
            setResponseMessage({ text: errText.slice(12, -2), err: true });
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    async function searchMovies(input, moviesList, setMovies, isMain) {
        setIsLoading(true);

        try {
            const searchResult = await moviesList.filter(obj => {
                let RuIncludes = false;
                let EnIncludes = false;

                if (typeof obj.nameRU === 'string') {
                    RuIncludes = obj.nameRU
                        .toLowerCase()
                        .includes(input.toLowerCase());
                }
                if (typeof obj.nameEN === 'string') {
                    EnIncludes = obj.nameEN
                        .toLowerCase()
                        .includes(input.toLowerCase());
                }

                return RuIncludes || EnIncludes;
            });

            if (isMain) {
                const savedMoviesList = JSON.parse(
                    localStorage.getItem('savedMovies')
                );

                const filteredLikedMovies = await savedMoviesList.filter(
                    sm => searchResult.some(sr => sr.id === sm.movieId)
                );

                localStorage.setItem(
                    'filteredLikedMovies',
                    JSON.stringify(filteredLikedMovies)
                );
                setLikedMovies(filteredLikedMovies);

                localStorage.setItem(
                    'mainMovies',
                    JSON.stringify(searchResult)
                );
            }

            setMovies(searchResult);
        } catch (err) {
            setErrorState(true);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function loadMainMovies() {
        setIsLoading(true);
        try {
            const movies = await movieApi.getMovies();
            localStorage.setItem('allMovies', JSON.stringify(movies));
            return movies;
        } catch (err) {
            console.log(err);
            setErrorState(true);
        } finally {
            setIsLoading(false);
        }
    }

    async function loadSavedMovies() {
        setIsLoading(true);
        try {
            const movies = await mainApi.getSavedMovies();
            localStorage.setItem('savedMovies', JSON.stringify(movies));
            return movies;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    function toggleLikeState(data, isLiked, setIsLiked) {
        if (!isLiked) {
            const thumbnail = `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`;

            mainApi
                .createMovie(
                    data.country,
                    data.description,
                    data.director,
                    data.duration,
                    data.id,
                    `https://api.nomoreparties.co${data.image.url}`,
                    data.nameEN,
                    data.nameRU,
                    data.trailerLink,
                    data.year,
                    thumbnail
                )
                .then(res => {
                    setSavedMovies([...savedMovies, res]);
                    localStorage.setItem(
                        'savedMovies',
                        JSON.stringify([...savedMovies, res])
                    );
                    localStorage.setItem(
                        'filteredLikedMovies',
                        JSON.stringify([...likedMovies, res])
                    );
                })
                .catch(e => {
                    setIsLiked(false);
                    console.log(e);
                });
        } else {
            deleteSavedMovie(data.id);
        }
    }

    function deleteSavedMovie(movieId) {
        mainApi
            .deleteMovie(movieId)
            .then(res => {
                const newSavedMovies = savedMovies.filter(
                    m => m.movieId !== movieId
                );
                const newFilteredLikedMovies = likedMovies.filter(
                    lm => lm.movieId !== movieId
                );

                setSavedMovies(newSavedMovies);
                localStorage.setItem(
                    'savedMovies',
                    JSON.stringify(newSavedMovies)
                );

                setLikedMovies(newFilteredLikedMovies);
                localStorage.setItem(
                    'filteredLikedMovies',
                    JSON.stringify(newFilteredLikedMovies)
                );
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="App">
            <userContext.Provider value={currentUser}>
                <Route
                    exact
                    path={['/', '/profile', '/saved-movies', '/movies']}
                >
                    <Header isMobile={isMobile} />
                </Route>

                <Switch>
                    <Route exact path="/" component={Main} />

                    <ProtectedRoute
                        exact
                        path="/movies"
                        component={Movies}
                        setMovies={setMainMovies}
                        setLikedMovies={setLikedMovies}
                        movies={mainMovies}
                        loadMovies={loadMainMovies}
                        filteredMovies={likedMovies}
                        toggleLikeState={toggleLikeState}
                        isLoading={isLoading}
                        searchMovies={searchMovies}
                        errorState={errorState}
                        numberOfCards={numberOfCards}
                        setNumberOfCards={setNumberOfCards}
                        cardsInRow={cardsInRow}
                    />
                    <ProtectedRoute
                        exact
                        path="/saved-movies"
                        component={SavedMovies}
                        setMovies={setSavedMovies}
                        movies={savedMovies}
                        loadMovies={loadSavedMovies}
                        deleteSavedMovie={deleteSavedMovie}
                        isLoading={isLoading}
                        searchMovies={searchMovies}
                        errorState={errorState}
                    />
                    <ProtectedRoute
                        exact
                        path="/profile"
                        logout={handleLogout}
                        changeUserInfo={changeUserInfo}
                        component={Profile}
                        responseMessage={responseMessage}
                        setResponseMessage={setResponseMessage}
                        isLoading={isLoading}
                    />

                    <Route exact path="/signin">
                        <Login
                            handleLogin={handleLogin}
                            responseMessage={responseMessage}
                            setResponseMessage={setResponseMessage}
                            isLoading={isLoading}
                        />
                    </Route>
                    <Route exact path="/signup">
                        <Register
                            handleRegister={handleRegister}
                            responseMessage={responseMessage}
                            setResponseMessage={setResponseMessage}
                            isLoading={isLoading}
                        />
                    </Route>
                    <Route component={NotFound} />
                </Switch>

                <Route
                    exact
                    path={[
                        '/',
                        !isMobile ? '/profile' : '',
                        '/saved-movies',
                        '/movies',
                    ]}
                    component={Footer}
                />
            </userContext.Provider>
        </div>
    );
}

export default App;
