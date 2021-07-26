import { getOrdersInBakery, removeOrder, addOrder, editOrder } from './axios-php';

function getOrders(bakery_id, populateOrders) {
    getOrdersInBakery(bakery_id, populateOrders);
}

function deleteOrder(bakery_id, order_id) {
    removeOrder(bakery_id, order_id);
}

async function createOrder(bakery_id, user_id, client_id, order, setOrder) {
    return await addOrder(bakery_id, user_id, client_id, order, setOrder);
}

function updateOrder(order_id, total) {
    editOrder(order_id, total);
}

export { getOrders, deleteOrder, createOrder, updateOrder };