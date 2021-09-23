import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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

function App() {
    const [isMobile, setIsMobile] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        history.push(location.pathname);

        mainApi
            .getUser()
            .then(user => {
                if (user) {
                    setCurrentUser(user);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function checkIsMobile() {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

    function handleRegister(name, email, password) {
        console.log(name, email, password);
        mainApi
            .register(name, email, password)
            .then(res => {
                if (res) {
                    console.log(res);
                    console.log('Пользователь зарегистрирован!');
                } else {
                    console.log('Что-то пошло не так');
                }
            })
            .catch(err => console.log(err));
    }

    function handleLogin(email, password) {
        mainApi
            .login(email, password)
            .then(res => {
                console.log(res);
                setCurrentUser(res);
                history.push('/movies');
            })
            .catch(err => console.log(err));
    }

    function handleLogout() {
        mainApi.logout().then(res => {
            setCurrentUser(null);
            history.push('/');
        });
    }

    function changeUserInfo(email, name) {
        mainApi
            .changeUserInfo(name, email)
            .then(res => {
                console.log(res);
                setCurrentUser({
                    ...currentUser,
                    email: res.email,
                    name: res.name,
                });
            })
            .catch(err => console.log(err));
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
                    />
                    <ProtectedRoute
                        exact
                        path="/saved-movies"
                        component={SavedMovies}
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
            </userContext.Provider>
        </div>
    );
}

export default App;
