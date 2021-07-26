import React, { useState } from 'react';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Label from '../Components/Label';
import manage from '../scripts/manageResetPassword';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import Page from '../Components/Page';

export default function ResetPassword(props) {
    const [newPassword, setNewPassword] = useState("");
    const [reenteredPassword, setReenteredPassword] = useState("");
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
    const [showPasswordErrorMsg, setShowPasswordErrorMsg] = useState(false);
    const { userEmail } = useParams();

    function handleResetPassword() {
        if (newPassword !== reenteredPassword) {
            setIsPasswordsMatch(false);
        }
        console.log(userEmail)
        manage(userEmail, newPassword, setShowPasswordErrorMsg);
    }

    const mainContent =
        <div>
            <h2>Reset your password!</h2>
            <Input
                label="Enter a new password:"
                type="password"
                value={newPassword}
                handleChange={(event) => {
                    setNewPassword(event.target.value);
                    setIsPasswordsMatch(true);
                }
                }
            />
            <Input
                label="Enter the new password again:"
                type="password"
                value={reenteredPassword}
                handleChange={(event) => {
                    setReenteredPassword(event.target.value)
                    setIsPasswordsMatch(true);
                }
                }
            />
            <Link to="/password-updated">
                <Button
                    value="Reset password"
                    handleClick={() => handleResetPassword()}
                />
            </Link>
            {!isPasswordsMatch && <Label value="Passwords do not match" />}
            {!showPasswordErrorMsg && <Label value="password should 8 characters or longer and contain at least one lowercase character, 
                at least one uppercase character, at least one numeric character and 
                at least one special character" />}
        </div>

    return (
        <Page mainContent={mainContent} />
    );
}