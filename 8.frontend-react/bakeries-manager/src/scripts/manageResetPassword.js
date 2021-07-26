import { resetPassword } from './axios';
import { isPasswordValid } from './validations';

function setPassword(userEmail, password, setShowErrorMsg) {
    if (isPasswordValid(password))
        setShowErrorMsg(true);
    resetPassword(userEmail, password);
}

export default setPassword;