import { sendSignUpData } from './axios';
import { isEmailValid, isFullNameValid, isBusinessNameValid, isPhoneNumberValid, isPasswordValid } from './validations';

function testSignUpInput(userName, userEmail, businessName, userPhone, numOfWorkers, password,
    populateLoggedInUser, setShowFullNameErrorMsg, setShowEmailErrorMsg,
    setShowBusinessNameErrorMsg, setShowPhoneNumberErrorMsg, setShowPasswordErrorMsg,
    setShowNumOfWorkersErrorMsg, event) {
    if (!isFullNameValid(userName)) {
        event.preventDefault();
        setShowFullNameErrorMsg(true);
    }
    if (!isEmailValid(userEmail)) {
        event.preventDefault();
        setShowEmailErrorMsg(true);
    }
    if (!isBusinessNameValid(businessName)) {
        event.preventDefault();
        setShowBusinessNameErrorMsg(true);
    }
    if (!isPhoneNumberValid(userPhone)) {
        event.preventDefault();
        setShowPhoneNumberErrorMsg(true);
    }
    if (!isPasswordValid(password)) {
        event.preventDefault();
        setShowPasswordErrorMsg(true);
    }
    if (numOfWorkers === 0) {
        event.preventDefault();
        setShowNumOfWorkersErrorMsg(true);
    }
    else
        sendSignUpData(userName, userEmail, businessName, userPhone, numOfWorkers, password, populateLoggedInUser);
}

export default testSignUpInput;