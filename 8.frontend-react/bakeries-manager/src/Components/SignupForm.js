import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import RadioButtons from './RadioButtons';
import RadioOption from './RadioOption';
import manage from '../scripts/manageSignUp';
import { Link } from "react-router-dom";

export default (props) => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [numOfWorkers, setNumOfWorkers] = useState(0);
    const [userPassword, setUserPassword] = useState("");

    function sendUserData(event) {
        manage(userName, userEmail, businessName, userPhone, numOfWorkers, userPassword, props.populateLoggedInUser);
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
                    handleChange={(event) => setUserName(event.target.value)}
                    value={userName}
                />
                <Input
                    label="Email:"
                    type="email"
                    handleChange={(event) => setUserEmail(event.target.value)}
                    value={userEmail}
                />
                <Input
                    label="Your Business Name:"
                    type="text"
                    handleChange={(event) => setBusinessName(event.target.value)}
                    value={businessName}
                />
                <Input
                    label="Phone Number:"
                    type="text"
                    handleChange={(event) => setUserPhone(event.target.value)}
                    value={userPhone}
                />

                <label>
                    How many people work in your business?
            </label>
                <RadioOption
                    label="Just me"
                    type="radio"
                    value="oneWorker"
                    name="numberOfWorkers"
                    handleChange={(event) => setNumOfWorkers(event.target.value)}
                    selectedOption={numOfWorkers}
                />
                <RadioOption
                    label="2 people"
                    type="radio"
                    value="twoWorkers"
                    name="numberOfWorkers"
                    handleChange={(event) => setNumOfWorkers(event.target.value)}
                    selectedOption={numOfWorkers}
                />
                <RadioOption
                    label="3-5 people"
                    type="radio"
                    value="threeToFiveWorkers"
                    name="numberOfWorkers"
                    handleChange={(event) => setNumOfWorkers(event.target.value)}
                    selectedOption={numOfWorkers}
                />
                <RadioOption
                    label="6-10 people"
                    type="radio"
                    value="sixToTenWorkers"
                    name="numberOfWorkers"
                    handleChange={(event) => setNumOfWorkers(event.target.value)}
                    selectedOption={numOfWorkers}
                />
                <RadioOption
                    label="11 or more people"
                    type="radio"
                    value="moreThanTenWorkers"
                    name="numberOfWorkers"
                    handleChange={(event) => setNumOfWorkers(event.target.value)}
                    selectedOption={numOfWorkers}
                />

                <Input
                    label="Password:"
                    type="password"
                    handleChange={(event) => setUserPassword(event.target.value)}
                    value={userPassword}
                />

                <Button
                    value="Sign up!"
                    handleClick={(event) => sendUserData(event)}
                />
            </form>
        </div>
    );
}
