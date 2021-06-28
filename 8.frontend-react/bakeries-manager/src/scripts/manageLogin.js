import { sendLoginData, test } from './axios';

function testLoginInput(userEmail, password, populateLoggedInUser) {
    sendLoginData(userEmail, password, populateLoggedInUser);
}

export default testLoginInput;