import { getEmployeesInBakery, removeUser } from './axios';

function getUsers(managerEmail, populateEmployees) {
    getEmployeesInBakery(managerEmail, populateEmployees);
}

function deleteUser(userEmail) {
    removeUser(userEmail);
}

export { getUsers, deleteUser };