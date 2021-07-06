import React from 'react';
import { Link } from "react-router-dom";
import Button from '../Components/Button';
import Page from '../Components/Page';

export default function AfterUserSignUp(props) {
    const mainContent =
        <div>
            <h2>Your account in PIE-CHART has been created!</h2>
            <h4>please login to your account.</h4>
            <Link to="/login">
                <Button value="LOGIN" />
            </Link>
        </div>

    return (
        <Page mainContent={mainContent} />
    );
}