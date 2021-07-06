import { sendLoginData, test } from './axios';
import { isEmailValid, isPasswordValid } from './validations';

function testLoginInput(userEmail, password, populateLoggedInUser, setShowErrorMsg, event) {
    // if (!isEmailValid(userEmail) || !isPasswordValid(password)) {
    //     console.log('here')
    //     event.preventDefault();
    //     setShowErrorMsg(true);
    // }
    // else
    sendLoginData(userEmail, password, populateLoggedInUser);
}

export default testLoginInput;