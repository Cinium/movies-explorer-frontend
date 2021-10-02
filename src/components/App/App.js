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
import Popup from '../Popup/Popup';

function App() {
    const [isMobile, setIsMobile] = useState(false);
    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const [cardsInRow, setCardsInRow] = useState(3);
    const [numberOfCards, setNumberOfCards] = useState(0);

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('currentUser'))
    );
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
        if (window.innerWidth >= 1280) {
            setCardsInRow(3);
            setNumberOfCards(12);
            setIsMobile(false);
        } else if (768 <= window.innerWidth && window.innerWidth < 1280) {
            setCardsInRow(2);
            setNumberOfCards(8);
            setIsMobile(false);
        } else if (window.innerWidth < 768) {
            setCardsInRow(2);
            setNumberOfCards(5);
            setIsMobile(true);
        }
    }

    async function handleRegister(name, email, password) {
        try {
            const res = await mainApi.register(name, email, password);

            if (!res) {
                throw new Error('Что-то не так');
            }

            await handleLogin(email, password);
        } catch (e) {
            setPopupIsOpen(true);
            setTimeout(() => {
                setPopupIsOpen(false);
            }, 7000);
            console.log(e);
        }
    }

    async function handleLogin(email, password) {
        try {
            const res = await mainApi.login(email, password);
            setCurrentUser(res);
            localStorage.setItem('currentUser', JSON.stringify(res));
            await loadSavedMovies();
            setMainMovies(null);
            history.push('/movies');
        } catch (e) {
            setPopupIsOpen(true);
            setTimeout(() => {
                setPopupIsOpen(false);
            }, 7000);
            console.log(e);
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

    function changeUserInfo(email, name) {
        mainApi
            .changeUserInfo(name, email)
            .then(res => {
                setCurrentUser({
                    ...currentUser,
                    email: res.email,
                    name: res.name,
                });
            })
            .catch(err => {
                setPopupIsOpen(true);
                setTimeout(() => {
                    setPopupIsOpen(false);
                }, 7000);
                console.log(err);
            });
    }

    async function searchMovies(input, moviesList, setMovies, isMain) {
        setIsLoading(true);
        const checkbox = JSON.parse(localStorage.getItem('toggleState'));

        try {
            const searchResult = await moviesList.filter(obj => {
                let RuIncludes = false;
                let EnIncludes = false;

                if (checkbox && obj.duration > 40) {
                    return false;
                }

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
            localStorage.setItem('mainMovies', JSON.stringify(movies));
            setMainMovies(movies);
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
            setSavedMovies(movies);
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
                    setIsLiked(false)
                    setPopupIsOpen(true);
                    setTimeout(() => {
                        setPopupIsOpen(false);
                    }, 7000);
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
                setPopupIsOpen(true);
                setTimeout(() => {
                    setPopupIsOpen(false);
                }, 7000);
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
                    />

                    <Route exact path="/signin">
                        <Login handleLogin={handleLogin} />
                    </Route>
                    <Route exact path="/signup">
                        <Register handleRegister={handleRegister} />
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
                <Popup isOpen={popupIsOpen} setIsOpen={setPopupIsOpen} />
            </userContext.Provider>
        </div>
    );
}

export default App;
