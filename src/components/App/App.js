import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        checkIsMobile();

        window.addEventListener('resize', checkIsMobile);
    }, []);

    function checkIsMobile() {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

    return (
        <div className="App">
            <Route
                exact
                path={['/', '/profile', '/saved-movies', '/movies']}
            >
                <Header isMobile={isMobile} />
            </Route>

            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/movies" component={Movies} />
                <Route
                    exact
                    path="/saved-movies"
                    component={SavedMovies}
                />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/signin" component={Login} />
                <Route exact path="/signup" component={Register} />
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
        </div>
    );
}

export default App;
