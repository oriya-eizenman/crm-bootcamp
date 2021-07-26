import { sendAddUserEmail } from './axios';
import { isEmailValid } from './validations';

function addUser(managerEmail, userEmail, setShowEmailErrorMsg) {
    if (!isEmailValid(userEmail))
        setShowEmailErrorMsg(true);
    sendAddUserEmail(managerEmail, userEmail);
}

export default addUser;