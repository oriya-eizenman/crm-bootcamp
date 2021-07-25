import { addOrderItems, getOrderItems, editOrderItems } from './axios-php';

async function createOrderItems(bakery_id, order_id, order) {
    await addOrderItems(bakery_id, order_id, order);
}

async function getOrder(order_id) {
    const items = await getOrderItems(order_id);
    return items;
}

function updateOrderItems(bakery_id, order_id, items) {
    editOrderItems(bakery_id, order_id, items);
}

export {
    createOrderItems,
    getOrder,
    updateOrderItems
};