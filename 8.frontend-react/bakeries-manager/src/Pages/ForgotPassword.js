import React, { useState } from 'react';
import Input from '../Components/Input';
import manage from '../scripts/manageForgotPassword';
import { Link } from "react-router-dom";
import Page from '../Components/Page';

export default function ForgotPassword(props) {
    const [userEmail, setUserEmail] = useState("");
    const [showEmailNotExistErrorMsg, setShowEmailNotExistErrorMsg] = useState(false);

    function handleForgetPassword(event) {
        manage(userEmail);
    }

    const mainContent =
        <div>
            <h2>Please enter your email address:</h2>
            <Input type="email" handleChange={(event) => setUserEmail(event.target.value)} value={userEmail} />
            <Link to="/reset-password-email-sent" onClick={(event) => handleForgetPassword(event)} className="formButton">
                Send email
            </Link>
            {/* {!showEmailNotExistErrorMsg && <Label value="P" />} */}
        </div>

    return (
        <Page mainContent={mainContent} />
    );
}