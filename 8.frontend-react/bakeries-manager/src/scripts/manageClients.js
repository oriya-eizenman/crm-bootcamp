import { getClientsInBakery, removeClient, addClient, editClient, getClientData } from './axios-php';

function getClients(bakery_id, populateClients) {
    getClientsInBakery(bakery_id, populateClients);
}

async function getClient(client_id) {
    const clientData = await getClientData(client_id);
    return clientData;
}

function deleteClient(clientEmail) {
    removeClient(clientEmail);
}

async function createClient(bakery_id, client, setClient) {
    await addClient(bakery_id, client, setClient);
}

function updateClient(client) {
    editClient(client);
}

export {
    getClients,
    deleteClient,
    createClient,
    updateClient,
    getClient
};