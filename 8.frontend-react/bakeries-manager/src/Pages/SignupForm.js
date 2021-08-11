import React, { useState, useEffect, useContext } from 'react';
import Title from '../Components/Title';
import manage from '../scripts/manageSignUp';
import manageUserSignUp from '../scripts/manageUserSignUp';
import { Link } from "react-router-dom";
import { useParams } from 'react-router';
import clearCookie from '../scripts/manageLogout';
import Page from '../Components/Page';
import Form from '../Components/Form';
import UserContext from '../UserContext';
import { visitorPageHeaderLinks } from '../Constants/VisitorHeaderLinks';

export default function SignUpForm(props) {

    const [isAccount, setIsAccount] = useState(props.isAccount);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [numOfWorkers, setNumOfWorkers] = useState(0);
    const [userPassword, setUserPassword] = useState("");
    const [showFullNameErrorMsg, setShowFullNameErrorMsg] = useState(false);
    const [showEmailErrorMsg, setShowEmailErrorMsg] = useState(false);
    const [showBusinessNameErrorMsg, setShowBusinessNameErrorMsg] = useState(false);
    const [showPhoneNumberErrorMsg, setShowPhoneNumberErrorMsg] = useState(false);
    const [showNumOfWorkersErrorMsg, setShowNumOfWorkersErrorMsg] = useState(false);
    const [showPasswordErrorMsg, setShowPasswordErrorMsg] = useState(false);
    const [showGeneralErrMsg, setShowGeneralErrMsg] = useState(false);
    const [showUserExistsErrMsg, setShowUserExistsErrMsg] = useState(false);
    const { userData } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        clearCookie();
    });

    function sendUserData(event) {
        isAccount ?
            manage(userName, userEmail, businessName, userPhone, numOfWorkers, userPassword,
                setLoggedInUser, setShowFullNameErrorMsg, setShowEmailErrorMsg,
                setShowBusinessNameErrorMsg, setShowPhoneNumberErrorMsg, setShowPasswordErrorMsg,
                setShowNumOfWorkersErrorMsg, event)
            :
            manageUserSignUp(userName, userData, userPhone, userPassword,
                setShowFullNameErrorMsg, setShowPhoneNumberErrorMsg, setShowPasswordErrorMsg, event);
    }

    const fieldsUser =
        [
            {
                type: "input",
                inputType: "text",
                value: userName,
                onChange: (event) => {
                    setUserName(event.target.value);
                    setShowFullNameErrorMsg(false);
                },
                placeholder: "Full Name",
                errMsg: showFullNameErrorMsg ? "Please enter a valid full name" : ""
            },
            {
                type: "input",
                inputType: "text",
                value: userPhone,
                onChange: (event) => {
                    setUserPhone(event.target.value);
                    setShowPhoneNumberErrorMsg(false);
                },
                placeholder: "Phone Number",
                errMsg: showPhoneNumberErrorMsg ? "Phone number should only contain numbers, dashes and + character for prefix and number should be of 10 digits" : ""
            },
            {
                type: "input",
                inputType: "password",
                value: userPassword,
                onChange: (event) => {
                    setUserPassword(event.target.value);
                    setShowPasswordErrorMsg(false);
                },
                placeholder: "Password",
                errMsg: showPhoneNumberErrorMsg ? "password should 8 characters or longer and contain at least one lowercase character, at least one uppercase character, at least one numeric character and at least one special character" : ""
            },
            {
                type: "link",
                to: isAccount ? "/home" : "/user-signup-successful",
                value: "Sign up",
                onClick: (event) => sendUserData(event),
            },
            {
                type: "errorMsg",
                value: showGeneralErrMsg ? "Please try again later" : "",
            },
            {
                type: "errorMsg",
                value: showUserExistsErrMsg ? "User already exists" : "",
            }
        ]

    const fieldsAccount =
        [
            {
                type: "input",
                inputType: "text",
                value: userName,
                onChange: (event) => {
                    setUserName(event.target.value);
                    setShowFullNameErrorMsg(false);
                },
                placeholder: "Full Name",
                errMsg: showFullNameErrorMsg ? "Please enter a valid full name" : ""
            },
            {
                type: "input",
                inputType: "text",
                value: userEmail,
                onChange: (event) => {
                    setUserEmail(event.target.value);
                    setShowEmailErrorMsg(false);
                },
                placeholder: "Email address",
                errMsg: showEmailErrorMsg ? "Please enter an email of the form example@example.example" : ""
            },
            {
                type: "input",
                inputType: "text",
                value: businessName,
                onChange: (event) => {
                    setBusinessName(event.target.value);
                    setShowBusinessNameErrorMsg(false);
                },
                placeholder: "Business Name",
                errMsg: showBusinessNameErrorMsg ? "Business name should not contain !@#$*~? characters" : ""
            },
            {
                type: "input",
                inputType: "text",
                value: userPhone,
                onChange: (event) => {
                    setUserPhone(event.target.value);
                    setShowPhoneNumberErrorMsg(false);
                },
                placeholder: "Phone Number",
                errMsg: showPhoneNumberErrorMsg ? "Phone number should only contain numbers, dashes and + character for prefix and number should be of 10 digits" : ""
            },
            {
                type: "select",
                name: "numOfEmployees",
                // value: numOfWorkers,
                defaultValue: numOfWorkers,
                options: [
                    {
                        'value': "1",
                        'label': "Just me"
                    },
                    {
                        'value': "2",
                        'label': "2 people"
                    },
                    {
                        'value': "3-5",
                        'label': "3-5 people"
                    },
                    {
                        'value': "6-10",
                        'label': "6-10 people"
                    },
                    {
                        'value': "11+",
                        'label': "11 people and more"
                    },

                ],
                onChange: (event) => {
                    setNumOfWorkers(event.value);
                }
            },
            {
                type: "input",
                inputType: "password",
                value: userPassword,
                onChange: (event) => {
                    setUserPassword(event.target.value);
                    setShowPasswordErrorMsg(false);
                },
                placeholder: "Password",
                errMsg: showPhoneNumberErrorMsg ? "password should 8 characters or longer and contain at least one lowercase character, at least one uppercase character, at least one numeric character and at least one special character" : ""
            },
            {
                type: "link",
                to: isAccount ? "/home" : "/user-signup-successful",
                value: "Sign up",
                onClick: (event) => sendUserData(event),
            },
            {
                type: "errorMsg",
                value: showGeneralErrMsg ? "Please try again later" : "",
            },
            {
                type: "errorMsg",
                value: showUserExistsErrMsg ? "User already exists" : "",
            }
        ];

    const mainContent =
        <div>
            <div className="container formFrame">
                <Title title="Sign Up to PIE-CHART!" />
                <Form fields={isAccount ? fieldsAccount : fieldsUser} />
                {!!isAccount &&
                    <div className="linkToLogin">
                        <p className="p">Already have an account? </p>
                        <Link to="/login" className="link">
                            Login!
                            </Link>
                    </div>
                }
            </div>
        </div>

    return (
        <Page
            mainContent={mainContent}
            headerLinks={visitorPageHeaderLinks}
        />
    );
}
