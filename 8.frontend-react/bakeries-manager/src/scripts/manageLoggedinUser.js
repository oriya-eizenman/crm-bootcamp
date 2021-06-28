import { getLoggedInUser } from './axios';

function testLoginInput(populateLoggedInUser) {
    getLoggedInUser(populateLoggedInUser);
}

export default testLoginInput;