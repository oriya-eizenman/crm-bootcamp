import React, { useState, useEffect, useMemo, useContext } from 'react';
import LoggedInPage from '../Components/LoggedInPage';
import { useHistory } from "react-router-dom";
import Form from '../Components/Form';
import { getClient } from '../scripts/manageClients';
import Table from '../Components/Table';
import { getOrder } from '../scripts/manageOrderItems';
import { GrEdit } from 'react-icons/gr';
import Modal from 'react-modal';
import { getItems } from '../scripts/manageItems';
import Select from 'react-select';
import UserContext from '../UserContext';
import Button from '../Components/Button';
import { updateOrder, deleteOrder } from '../scripts/manageOrders';
import { updateOrderItems } from '../scripts/manageOrderItems';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function OrderDetails() {
    const history = useHistory();
    const order = history.location.state.order;
    const [client, setClient] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [editOrderModalIsOpen, setEditOrderModalIsOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({ item: "" });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [qty, setQty] = useState(1);
    const [total, setTotal] = useState(order.total);
    const [isOrderUpdated, setIsOrderUpdated] = useState(false);

    useEffect(() => {
        (async () => {
            const clientData = await getClient(order.client_id)
            setClient(clientData)
        })();
        (async () => {
            const orderItemsData = await getOrder(order.order_id);
            setOrderItems(orderItemsData);
        })();
    }, []);

    useEffect(() => {
        getItems(loggedInUser.bakery_id, (data) => {
            setItems(data);
        });
    }, [items.length, editOrderModalIsOpen]);


    const openEditOrderModal = () => {
        setEditOrderModalIsOpen(true);
    }

    const closeEditOrderModal = () => {
        setEditOrderModalIsOpen(false);
    }

    const handleItemDelete = (data) => {
        let tempItems = orderItems;
        tempItems.splice(orderItems.indexOf(data), 1);
        setOrderItems([...tempItems]);
        setTotal(total - parseInt(data.total));
    }

    const handleUpdateOrder = () => {
        updateOrder(order.order_id, total);
        updateOrderItems(loggedInUser.bakery_id, order.order_id, orderItems);
        setIsOrderUpdated(!isOrderUpdated);
        closeEditOrderModal();
    }

    const handleDelete = () => {
        deleteOrder(loggedInUser.bakery_id, order.order_id);
        history.push({
            pathname: `/orders`
        });
    }

    const columns = useMemo(
        () => [
            {
                Header: "Item",
                accessor: "item"
            },
            {
                Header: "Qty",
                accessor: "qty"
            },
            {
                Header: "Price",
                accessor: "price"
            },
            {
                Header: "Total",
                accessor: "total"
            }
        ]
    );

    const showOrder =
        ([
            {
                type: "subtitle",
                value: 'Client info'
            },
            {
                type: "info",
                title: "Name: ",
                content: client.client_name
            },
            {
                type: "info",
                title: "Phone number: ",
                content: client.client_phone
            },
            {
                type: "info",
                title: "Email: ",
                content: client.client_email
            },
            {
                type: "subtitle",
                value: 'Delivery details'
            },
            {
                type: "info",
                content: `${client.street} ${client.house_number}, ${client.city}`
            },
            {
                type: "subtitle",
                value: 'order'
            },
            {
                type: "info",
                title: "Created: ",
                content: order.created
            },
            {
                type: "info",
                title: "Delivery time: ",
                content: order.delivery_time
            },
            {
                type: "info",
                title: "Status: ",
                content: order.status
            },
            {
                type: "info",
                title: "Total: ",
                content: total + " NIS"
            }
        ])

    const editOrderFields =
        [
            {
                type: "group",
                fields: [
                    {
                        className: "counter",
                        type: "group",
                        fields:
                            [
                                {
                                    type: "button",
                                    value: "-",
                                    onClick: (event) => {
                                        setQty(qty - 1);
                                    }
                                },
                                {
                                    type: "input",
                                    inputType: "text",
                                    value: qty,
                                    onChange: (event) => {
                                        setQty(event.target.value);
                                    },
                                    className: "accordionQtyField"
                                },
                                {
                                    type: "button",
                                    value: "+",
                                    onClick: (event) => {
                                        setQty(qty + 1);
                                    }
                                }
                            ]
                    },
                    {
                        type: "button",
                        value: "Add",
                        onClick: () => {
                            let tempOrder = [];
                            tempOrder.push(
                                {
                                    item_id: item.item_id,
                                    qty: qty,
                                    item: item.item,
                                    price: item.price,
                                    total: item.price * qty
                                }
                            );
                            setOrderItems([...orderItems, ...tempOrder]);
                            setTotal(parseInt(total) + parseInt(item.price) * parseInt(qty));
                        }
                    }
                ]
            },
        ]

    const mainContent =
        <div className="orderDetailsContainer">
            <div className="orderDetailsTopBar">
                < Link
                    to="/orders"
                    className="link"
                >
                    Back
                    </Link>
                <div>
                    <RiDeleteBin6Line
                        className="icon"
                        onClick={() => handleDelete()}
                    />
                    <GrEdit
                        className="icon editOrderDetails"
                        onClick={() => openEditOrderModal()}
                    />
                </div>
            </div>
            <h1 className="orderNumber">
                Order no. {order.order_id}
            </h1>
            <Form
                className="orderDetailsForm"
                fields={showOrder}
            />
            {orderItems.length !== 0 &&
                <Table
                    columns={columns}
                    data={orderItems}
                    hideActions={true}
                    hidePagination={true}
                />}
            <Modal
                isOpen={editOrderModalIsOpen}
                onRequestClose={closeEditOrderModal}
                ariaHideApp={false}
                contentLabel="Example Modal"
                className="modal"
            >
                <div className="modalContainer orderDetailsModal">
                    <a className="link modalLink" onClick={closeEditOrderModal}>x</a>
                    {false ?
                        <div>
                            Email sent to user.
</div>
                        :
                        <div className="mainModal">
                            <div className="modalTitle">Edit the order:</div>
                            <div>
                                <Select name={item.item}
                                    options=
                                    {items.map(item => {
                                        return (
                                            {
                                                'label': item.item,
                                                'value': item
                                            }
                                        )
                                    })}
                                    onChange={(item) => {
                                        setItem(item.value)
                                    }
                                    } />
                            </div>
                            <Form fields={editOrderFields} />
                            <Table
                                columns={columns}
                                data={orderItems}
                                handleClick={(data) => handleItemDelete(data)}
                                hidePagination={true}
                                hideEdit={true}
                            />
                            <div>
                                <Button
                                    value="Update order"
                                    handleClick={() => handleUpdateOrder()}
                                />
                            </div>
                        </div>
                    }
                </div>
            </Modal>
        </div>

    return (
        <LoggedInPage mainContent={mainContent} />
    );
}