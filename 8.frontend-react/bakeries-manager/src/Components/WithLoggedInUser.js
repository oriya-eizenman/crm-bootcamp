import React from 'react';
import { Route } from "react-router-dom";

export default (props) => {
    return (
        <Route {...props.exact} path={props.path}>
            {
                props.isUserLoggedIn ?
                    props.ifLoggedInPage :
                    props.ifLoggedOutPage
            }
        </Route>
    );
}
