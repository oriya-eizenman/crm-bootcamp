import {
    getBakeryIncomes,
    getBakeryEmployeesPerformance,
    getBakeryEmployeesOrders,
    getBakeryItemsSells,
    getBakeryTotalRevenue,
    getBakeryTotalOrders,
    getBakeryTotalClients
} from './axios-php';

async function getIncomes(bakery_id) {
    return await getBakeryIncomes(bakery_id);
}

async function getEmployeesPerformance(bakery_id) {
    return await getBakeryEmployeesPerformance(bakery_id);
}

async function getEmployeesOrders(bakery_id) {
    return await getBakeryEmployeesOrders(bakery_id);
}

async function getItemsSells(bakery_id) {
    return await getBakeryItemsSells(bakery_id);
}

async function getTotalRevenue(bakery_id) {
    return await getBakeryTotalRevenue(bakery_id);
}

async function getTotalOrders(bakery_id) {
    return await getBakeryTotalOrders(bakery_id);
}

async function getTotalClients(bakery_id) {
    return await getBakeryTotalClients(bakery_id);
}

export {
    getIncomes,
    getEmployeesPerformance,
    getEmployeesOrders,
    getItemsSells,
    getTotalRevenue,
    getTotalOrders,
    getTotalClients
};