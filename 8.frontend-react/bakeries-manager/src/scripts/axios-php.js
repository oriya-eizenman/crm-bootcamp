import { reduceHooks } from 'react-table';

const axios = require('axios');

const getClientsInBakery = (bakery_id, populateClients) => {
    axios.post('http://localhost:9991/clients/getClients/', {
        bakery_id: bakery_id
    }, { withCredentials: true })
        .then(res => {
            populateClients(res.data.clients);
        })
        .catch(err => {
            console.log(err);
        });
}

const removeClient = (client_email) => {
    axios.post('http://localhost:9991/clients/deleteClient/', {
        client_email: client_email
    }, { withCredentials: true })
        .then(res => {
            console.log('deleted client');
        })
        .catch(err => {
            console.log(err);
        });
}

const addClient = (async (bakery_id, client, setClient) => {
    const result = await axios.post('http://localhost:9991/clients/createClient/', {
        bakery_id: bakery_id,
        client_email: client.client_email,
        client_phone: client.client_phone,
        client_name: client.client_name,
        city: client.city,
        street: client.street,
        house_number: client.house_number,
        apartment_number: client.apartment_number
    }, { withCredentials: true });
    if (result) {
        setClient({ ...client, client_id: result.data.client_id })
    }
})

const editClient = (client) => {
    axios.post('http://localhost:9991/clients/updateClient/', {
        client: client
    }, { withCredentials: true })
        .then(res => {
            console.log('updated client');
        })
        .catch(err => {
            console.log(err);
        });
}

const getClientData = async (client_id) => {
    const result = await axios.post('http://localhost:9991/clients/getClient/', {
        client_id: client_id
    }, { withCredentials: true });
    if (result) {
        return result.data.client[0];
    }
}

const getItemsInBakery = (bakery_id, populateItems) => {
    axios.post('http://localhost:9991/items/getItems/', {
        bakery_id: bakery_id,
    }, { withCredentials: true })
        .then(res => {
            populateItems(res.data.items);
        })
        .catch(err => {
            console.log(err);
        });
}

const removeItem = (bakery_id, item) => {
    axios.post('http://localhost:9991/items/deleteItem/', {
        bakery_id: bakery_id,
        item: item
    }, { withCredentials: true })
        .then(res => {
            console.log('deleted item');
        })
        .catch(err => {
            console.log(err);
        });
}

const createItem = (bakery_id, item, selectedFile) => {
    axios.post('http://localhost:9991/items/createItem/', {
        bakery_id: bakery_id,
        item: item,
        image: selectedFile
    }, { withCredentials: true })
        .then(res => {
            console.log('added item');
        })
        .catch(err => {
            console.log(err);
        });
}

const updateItem = (item) => {
    axios.post('http://localhost:9991/items/updateItem/', {
        item: item
    }, { withCredentials: true })
        .then(res => {
            console.log('updated item');
        })
        .catch(err => {
            console.log(err);
        });
}

const getOrdersInBakery = (bakery_id, populateOrders) => {
    axios.post('http://localhost:9991/orders/getOrders/', {
        bakery_id: bakery_id,
    }, { withCredentials: true })
        .then(res => {
            populateOrders(res.data.orders);
        })
        .catch(err => {
            console.log(err);
        });
}

const removeOrder = (bakery_id, order_id) => {
    axios.post('http://localhost:9991/orders/deleteOrder/', {
        bakery_id: bakery_id,
        order_id: order_id
    }, { withCredentials: true })
        .then(res => {
            console.log('deleted order');
        })
        .catch(err => {
            console.log(err);
        });
}

const addOrder = async (bakery_id, user_id, client_id, order, setOrder) => {
    console.log(order)
    const result = await axios.post('http://localhost:9991/orders/CreateOrder/', {
        bakery_id: bakery_id,
        user_id: user_id,
        client_id: client_id,
        total: order.total,
        delivery_date: order.deliveryDate
    }, { withCredentials: true });
    if (result) {
        console.log(result.data)
        return result.data.order_id;
    }
}

const editOrder = async (order_id, total) => {
    const result = await axios.post('http://localhost:9991/orders/UpdateOrder/', {
        order_id: order_id,
        total: total,
    }, { withCredentials: true });
    if (result) {
        console.log('order updated');
    }
}

const getDeliveryAddresses = async (bakery_id) => {
    const result = await axios.post('http://localhost:9991/orders/getAddresses/', {
        bakery_id: bakery_id,
    }, { withCredentials: true });
    if (result) {
        return result.data.addresses;
    }
}

const addOrderItems = async (bakery_id, order_id, order) => {
    const result = await axios.post('http://localhost:9991/order_items/CreateOrderItems/', {
        bakery_id: bakery_id,
        order_id: order_id,
        items: order.items
    }, { withCredentials: true });
    if (result) {
        console.log('order items added')
    }
}

const getOrderItems = async (order_id) => {
    const result = await axios.post('http://localhost:9991/order_items/getOrderItems/', {
        order_id: order_id,
    }, { withCredentials: true });
    if (result) {
        return result.data.order;
    }
}

const editOrderItems = async (bakery_id, order_id, items) => {
    const result = await axios.post('http://localhost:9991/order_items/updateOrderItems/', {
        bakery_id: bakery_id,
        order_id: order_id,
        items: items
    }, { withCredentials: true });
    if (result) {
        console.log('order items added')
    }
}

const getBakeryIncomes = async (bakery_id) => {
    const result = await axios.post('http://localhost:9991/data/getIncomes/', {
        bakery_id: bakery_id
    }, { withCredentials: true });
    if (result) {
        return result.data.incomes;
    }
}

const getBakeryEmployeesPerformance = async (bakery_id) => {
    const result = await axios.post('http://localhost:9991/data/getEmployeesPerformance/', {
        bakery_id: bakery_id
    }, { withCredentials: true });
    if (result) {
        return result.data.performance;
    }
}

const getBakeryEmployeesOrders = async (bakery_id) => {
    const result = await axios.post('http://localhost:9991/data/getEmployeesOrders/', {
        bakery_id: bakery_id
    }, { withCredentials: true });
    if (result) {
        return result.data.employeesOrders;
    }
}

const getBakeryItemsSells = async (bakery_id) => {
    const result = await axios.post('http://localhost:9991/data/getItemsSells/', {
        bakery_id: bakery_id
    }, { withCredentials: true });
    if (result) {
        return result.data.itemsSells;
    }
}

const getBakeryTotalRevenue = async (bakery_id) => {
    const result = await axios.post('http://localhost:9991/data/getTotalRevenue/', {
        bakery_id: bakery_id
    }, { withCredentials: true });
    if (result) {
        return result.data.totalRevenue;
    }
}

const getBakeryTotalOrders = async (bakery_id) => {
    const result = await axios.post('http://localhost:9991/data/getTotalOrders/', {
        bakery_id: bakery_id
    }, { withCredentials: true });
    if (result) {
        return result.data.totalOrders;
    }
}

const getBakeryTotalClients = async (bakery_id) => {
    const result = await axios.post('http://localhost:9991/data/getTotalClients/', {
        bakery_id: bakery_id
    }, { withCredentials: true });
    if (result) {
        return result.data.totalClients;
    }
}

export {
    getClientsInBakery,
    removeClient,
    getItemsInBakery,
    removeItem,
    getOrdersInBakery,
    removeOrder,
    addClient,
    addOrder,
    addOrderItems,
    createItem,
    editClient,
    getClientData,
    getOrderItems,
    editOrder,
    editOrderItems,
    getDeliveryAddresses,
    updateItem,
    getBakeryIncomes,
    getBakeryEmployeesPerformance,
    getBakeryEmployeesOrders,
    getBakeryItemsSells,
    getBakeryTotalRevenue,
    getBakeryTotalOrders,
    getBakeryTotalClients
};