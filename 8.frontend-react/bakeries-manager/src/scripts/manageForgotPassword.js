import { sendResetPasswordEmail } from './axios';

function resetPassword(userEmail) {
    sendResetPasswordEmail(userEmail);
}

export default resetPassword;