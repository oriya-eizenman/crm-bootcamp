import React, { useContext, useEffect, useState } from 'react';
import manage from '../scripts/manageLogin';
import { Link } from "react-router-dom";
import Title from '../Components/Title';
import Page from '../Components/Page';
import Form from '../Components/Form';
import UserContext from '../UserContext';
import { visitorPageHeaderLinks } from '../Constants/VisitorHeaderLinks';

export default function LoginForm(props) {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    function handleLogin(event) {
        manage(userEmail, userPassword, setLoggedInUser, setShowErrorMsg, event);
    }

    const fields =
        [
            {
                type: "input",
                inputType: "text",
                value: userEmail,
                onChange: (event) => {
                    setUserEmail(event.target.value);
                    setShowErrorMsg(false);
                },
                placeholder: "example@example.com",
                label: "Email address"
            },
            {
                type: "input",
                inputType: "password",
                value: userPassword,
                onChange: (event) => {
                    setUserPassword(event.target.value)
                    setShowErrorMsg(false);;
                },
                placeholder: "Passw0rd!",
                label: "Password"
            },
            {
                type: "link",
                to: "/home",
                value: "Login",
                onClick: (event) => handleLogin(event),
                // className: "login-button"
            },
            {
                type: "errorMsg",
                value: showErrorMsg ? "Wrong email or password" : "",
            }
        ];

    const mainContent =
        <div>
            <div className="container formFrame">
                <Title title="Log in to your account" />
                <Form fields={fields} />
                {/* {showErrorMsg && <Label value="Wrong email or password" className="errorMsg" />} */}
                <br />
                <div className="linkToForgotPassword">
                    <Link to="/forgot-password" className="link">
                        forgot my password
                </Link>
                </div>
                <div className="linkToSignUp">
                    <p className="p">Don't have an account yet? </p>
                    <Link to="/signup" className="link">
                        SIGN UP!
                        </Link>
                </div>
            </div>
        </div>

    return (
        <Page mainContent={mainContent} headerLinks={visitorPageHeaderLinks} />
    );
}