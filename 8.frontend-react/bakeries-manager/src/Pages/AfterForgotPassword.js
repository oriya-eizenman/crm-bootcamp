import React from 'react';
import Button from '../Components/Button';
import { Link } from "react-router-dom";
import Page from '../Components/Page';

export default function AfterForgotPassword(props) {
    const mainContent =
        <div>
            <h2>Please check your email inbox in order to reset your password.</h2>
            <Link to="/">
                <Button value="Home" />
            </Link>
        </div>

    return (
        <Page mainContent={mainContent} />
    );
}