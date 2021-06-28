import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import manage from '../scripts/manageLogin';
import resetPassword from '../scripts/manageForgotPassword';
import { Link } from "react-router-dom";

export default (props) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function handleLogin(event) {
        manage(userEmail, userPassword, props.populateLoggedInUser);
    }

    return (
        <div>
            <header>
                <p>Don't have an account yet?</p>
                <Link to="/signup">
                    <Button
                        handleClick={props.handleRouteToSignUp}
                        value="SIGN UP!"
                    />
                </Link>
            </header>
            <form>
                <h1>Login to PIE-CHART!</h1>

                <Input
                    label="Email:"
                    type="text"
                    handleChange={(event) => setUserEmail(event.target.value)}
                    value={userEmail}
                />
                <Input
                    label="Password:"
                    type="password"
                    handleChange={(event) => setUserPassword(event.target.value)}
                    value={userPassword}
                />

                <Link to="/home">
                    <Button
                        value="LOGIN"
                        handleClick={(event) => handleLogin(event)}
                    />
                </Link>
                <br />
            </form>
            <Link to="/forgot-password">
                <Button
                    value="forgot my password"
                    handleClick={() => resetPassword(userEmail)}
                />
            </Link>
        </div>
    );
}