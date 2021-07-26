import { getEmployeesInBakery } from './axios';

function getUsers(managerEmail, populateEmployees) {
    getEmployeesInBakery(managerEmail, populateEmployees);
}

export default getUsers;