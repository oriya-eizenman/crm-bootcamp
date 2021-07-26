import { getItemsInBakery, removeItem, createItem, updateItem } from './axios-php';

function getItems(bakery_id, populateItems) {
    getItemsInBakery(bakery_id, populateItems);
}

function deleteItem(bakery_id, item) {
    removeItem(bakery_id, item);
}

function addItem(bakery_id, item, selectedFile) {
    createItem(bakery_id, item, selectedFile);
}

function setItemInBakery(item) {
    updateItem(item);
}

export { getItems, deleteItem, addItem, setItemInBakery };