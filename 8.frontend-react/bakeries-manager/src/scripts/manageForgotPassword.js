import { requestResetPassword } from './axios';

function resetPassword(userEmail) {
    requestResetPassword(userEmail);
}

export default resetPassword;