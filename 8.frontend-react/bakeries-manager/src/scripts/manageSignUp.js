import { sendSignUpData } from './axios';

function testSignUpInput(userName, userEmail, businessName, userPhone, numOfWorkers, password, populateLoggedInUser) {
    // TODO: add validations
    let isValid = true;
    if (isValid) {
        sendSignUpData(userName, userEmail, businessName, userPhone, numOfWorkers, password, populateLoggedInUser);
    }
}

export default testSignUpInput;