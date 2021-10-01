import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import userContext from '../../contexts/userContext';

function ProtectedRoute({ component: Component, ...props }) {
    const currentUser = useContext(userContext);

    return (
        <Route>
            {() =>
                currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect exact to="/" />
                )
            }
        </Route>
    );
}

export default ProtectedRoute;
