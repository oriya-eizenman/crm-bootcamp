import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

export default (props) => {
    const [newPassword, setNewPassword] = useState("");
    const [reenteredPassword, setReenteredPassword] = useState("");
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);

    function handleResetPassword() {
        if (newPassword !== reenteredPassword) {
            setIsPasswordsMatch(false);
        }
    }

    return (
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
            <Button
                value="Reset password"
                handleClick={() => handleResetPassword()}
            />
            {!isPasswordsMatch && <label>Passwords do not match</label>}
        </div>
    );
}