import React from 'react';
import Button from '../Components/Button';
import { Link } from "react-router-dom";
import Page from '../Components/Page';

export default function AfterPasswordReset(props) {
    const mainContent =
        <div>
            <h2>Password updated!</h2>
            <h4>Please login with your new password.</h4>
            <Link to="/login">
                <Button value="LOGIN" />
            </Link>
        </div>

    return (
        <Page mainContent={mainContent} />
    );
}