import { sendSignUpData } from './axios';
import { isEmailValid, isFullNameValid, isBusinessNameValid, isPhoneNumberValid, isPasswordValid } from './validations';

function testSignUpInput(userName, userEmail, businessName, userPhone, numOfWorkers, password,
    populateLoggedInUser, setShowFullNameErrorMsg, setShowEmailErrorMsg,
    setShowBusinessNameErrorMsg, setShowPhoneNumberErrorMsg, setShowPasswordErrorMsg,
    setShowNumOfWorkersErrorMsg) {
    if (!isFullNameValid(userName))
        setShowFullNameErrorMsg(true);
    if (!isEmailValid(userEmail))
        setShowEmailErrorMsg(true);
    if (!isBusinessNameValid(businessName))
        setShowBusinessNameErrorMsg(true);
    if (!isPhoneNumberValid(userPhone))
        setShowPhoneNumberErrorMsg(true);
    if (!isPasswordValid(password))
        setShowPasswordErrorMsg(true);
    if (numOfWorkers === 0)
        setShowNumOfWorkersErrorMsg(true);
    else
        sendSignUpData(userName, userEmail, businessName, userPhone, numOfWorkers, password, populateLoggedInUser);
}

export default testSignUpInput;