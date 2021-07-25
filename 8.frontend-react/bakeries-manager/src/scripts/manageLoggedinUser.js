import { getLoggedInUser } from './axios';

function testLoginInput(loggedInUser, populateLoggedInUser) {
    getLoggedInUser(loggedInUser, populateLoggedInUser);
}

export default testLoginInput;