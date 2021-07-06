import { sendUserSignUpData } from './axios';
import { isFullNameValid, isPhoneNumberValid, isPasswordValid } from './validations';

function testSignUpInput(userName, userData, userPhone, password,
    setShowFullNameErrorMsg, setShowPhoneNumberErrorMsg, setShowPasswordErrorMsg, event) {
    if (!isFullNameValid(userName)) {
        event.preventDefault();
        setShowFullNameErrorMsg(true);
    }
    if (!isPhoneNumberValid(userPhone)) {
        event.preventDefault();
        setShowPhoneNumberErrorMsg(true);
    }
    if (!isPasswordValid(password)) {
        event.preventDefault();
        setShowPasswordErrorMsg(true);
    }
    else
        sendUserSignUpData(userName, userData, userPhone, password);
}

export default testSignUpInput;