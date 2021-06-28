import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import RadioButtons from './RadioButtons';
import RadioOption from './RadioOption';
import manage from '../scripts/manageSignUp';
import { Link } from "react-router-dom";
import Label from './Label';

export default (props) => {
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

    function sendUserData(event) {
        manage(userName, userEmail, businessName, userPhone, numOfWorkers, userPassword,
            props.populateLoggedInUser, setShowFullNameErrorMsg, setShowEmailErrorMsg,
            setShowBusinessNameErrorMsg, setShowPhoneNumberErrorMsg, setShowPasswordErrorMsg,
            setShowNumOfWorkersErrorMsg);
    }

    // const radioOptions = [
    //     <Input label="Just me" type="radio" value="oneWorker" name="numberOfWorkers" handleChange={(event) => setNumOfWorkers(event.target.value)} checked={numOfWorkers == "oneWorker"} />,
    //     <Input label="2 people" type="radio" value="twoWorkers" name="numberOfWorkers" />,
    //     <Input label="3-5 people" type="radio" value="threeToFiveWorkers" name="numberOfWorkers" />,
    //     <Input label="6-10 people" type="radio" value="sixToTenWorkers" name="numberOfWorkers" />,
    //     <Input label="11 or more people" type="radio" value="moreThanTenWorkers" name="numberOfWorkers" />,
    //     <Input label="Password:" type="password" handleChange={(event) => setUserPassword(event.target.value)} value={userPassword} />];

    return (
        <div>
            <header>
                <p>Already have an account?</p>
                <Link to="/login">
                    <Button onClick={props.handleRouteToSignUp} value="LOGIN!" />
                </Link>
                <h1>Sign Up to PIE-CHART!</h1>
            </header>
            <form>
                <Input
                    label="Full Name:"
                    type="text"
                    handleChange={(event) => {
                        setUserName(event.target.value);
                        setShowFullNameErrorMsg(false);
                    }
                    }
                    value={userName}
                />
                {showFullNameErrorMsg && <Label value="Please enter a valid full name" />}
                <Input
                    label="Email:"
                    type="email"
                    handleChange={(event) => {
                        setUserEmail(event.target.value);
                        setShowEmailErrorMsg(false);
                    }
                    }
                    value={userEmail}
                />
                {showEmailErrorMsg && <Label value="Please enter an email of the form example@example.example" />}
                <Input
                    label="Your Business Name:"
                    type="text"
                    handleChange={(event) => {
                        setBusinessName(event.target.value);
                        setShowBusinessNameErrorMsg(false);
                    }
                    }
                    value={businessName}
                />
                {showBusinessNameErrorMsg && <Label value="Business name should not contain !@#$*~? characters" />}

                <Input
                    label="Phone Number:"
                    type="text"
                    handleChange={(event) => {
                        setUserPhone(event.target.value);
                        setShowPhoneNumberErrorMsg(false);
                    }
                    }
                    value={userPhone}
                />
                {showPhoneNumberErrorMsg && <Label value="Phone number should only contain numbers, 
                dashes and + character for prefix and number should be of 10 digits" />}

                <label>
                    How many people work in your business?
                </label>
                <RadioOption
                    label="Just me"
                    type="radio"
                    value="oneWorker"
                    name="numberOfWorkers"
                    handleChange={(event) => {
                        setNumOfWorkers(event.target.value);
                        setShowNumOfWorkersErrorMsg(false);
                    }
                    }
                    selectedOption={numOfWorkers}
                />
                <RadioOption
                    label="2 people"
                    type="radio"
                    value="twoWorkers"
                    name="numberOfWorkers"
                    handleChange={(event) => {
                        setNumOfWorkers(event.target.value);
                        setShowNumOfWorkersErrorMsg(false);
                    }
                    }
                    selectedOption={numOfWorkers}
                />
                <RadioOption
                    label="3-5 people"
                    type="radio"
                    value="threeToFiveWorkers"
                    name="numberOfWorkers"
                    handleChange={(event) => {
                        setNumOfWorkers(event.target.value);
                        setShowNumOfWorkersErrorMsg(false);
                    }
                    }
                    selectedOption={numOfWorkers}
                />
                <RadioOption
                    label="6-10 people"
                    type="radio"
                    value="sixToTenWorkers"
                    name="numberOfWorkers"
                    handleChange={(event) => {
                        setNumOfWorkers(event.target.value);
                        setShowNumOfWorkersErrorMsg(false);
                    }
                    }
                    selectedOption={numOfWorkers}
                />
                <RadioOption
                    label="11 or more people"
                    type="radio"
                    value="moreThanTenWorkers"
                    name="numberOfWorkers"
                    handleChange={(event) => {
                        setNumOfWorkers(event.target.value);
                        setShowNumOfWorkersErrorMsg(false);
                    }
                    }
                    selectedOption={numOfWorkers}
                />
                {showNumOfWorkersErrorMsg && <Label value="Please choose number of employees" />}


                <Input
                    label="Password:"
                    type="password"
                    handleChange={(event) => {
                        setUserPassword(event.target.value);
                        setShowPasswordErrorMsg(false);
                    }
                    }
                    value={userPassword}
                />
                {showPasswordErrorMsg && <Label
                    value="password should 8 characters or longer and contain at least one lowercase character, 
                at least one uppercase character, at least one numeric character and 
                at least one special character" />}


                <Button
                    value="Sign up!"
                    handleClick={(event) => sendUserData(event)}
                />
            </form>
        </div>
    );
}
