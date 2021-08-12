import React, { useEffect, useState, useMemo, useRef, useContext } from 'react';
import Table from "../Components/Table";
import { getOrders, deleteOrder, updateOrderStatus } from '../scripts/manageOrders';
import LoggedInPage from '../Components/LoggedInPage';
import UserContext from '../UserContext';
import Button from '../Components/Button';
import { Link, Redirect, useHistory } from "react-router-dom";
import OrderDetails from './OrderDetails';
import Modal from 'react-modal';
import Select from 'react-select';
import { resetPassword } from '../scripts/axios';

export default function Orders(props) {
    const [orders, setOrders] = useState([]);
    const ordersRef = useRef(orders);
    ordersRef.current = orders;
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const [ensureDeleteModalIsOpen, setEnsureDeleteModalIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        getOrders(loggedInUser.bakery_id, (data) => {
            setOrders(data);
        });
    }, [orders.length]);

    function handleDeleteOrder(order) {
        setEnsureDeleteModalIsOpen(true);
        setSelectedOrder(order);
        // showDeleteModal(order);
    }

    function handleShowOrderDetails(order) {
        history.push({
            pathname: `/order/${order.order_id}`,
            state: { order: order }
        })
    }

    function setOrderStatus(status, order) {
        updateOrderStatus(status, order.order_id);
    }

    const columns = useMemo(
        () => [
            {
                Header: "Order #",
                accessor: "order_id"
            },
            {
                Header: "Client",
                accessor: "client_name"
            },
            {
                Header: "Status",
                accessor: (row) =>
                    <Select
                        // defaultInputValue={row.status}
                        defaultValue={{
                            label: row.status,
                            value: row.status
                        }}
                        options=
                        {
                            [
                                {
                                    'label': 'pending',
                                    'value': 'pending'
                                },
                                {
                                    'label': 'in making',
                                    'value': 'in making'
                                },
                                {
                                    'label': 'on the way',
                                    'value': 'on the way'
                                },
                                {
                                    'label': 'delivered',
                                    'value': 'delivered'
                                }
                            ]
                        }

                        onChange={(status) => {
                            setOrderStatus(status.value, row)
                        }
                        }
                    />
            },
            // {
            //     Header: "Total",
            //     accessor: "total"
            // },
            // {
            //     Header: "Created",
            //     accessor: "created"
            // },
            {
                Header: "Scheduled Delivery",
                accessor: "delivery_time"
            },
            // {
            //     Header: "Employee",
            //     accessor: "user_name"
            // }
        ]
    );

    const deleteModal =
        <Modal
            isOpen={ensureDeleteModalIsOpen}
            onRequestClose={() => setEnsureDeleteModalIsOpen(false)}
            ariaHideApp={false}
            contentLabel="Example Modal"
            className="modal"
        >
            <div className="modalContainer">
                Are you sure you want to delete this order?
                <div className="modalOptions">
                    <Button
                        value="Delete"
                        handleClick={() => {
                            deleteOrder(loggedInUser.bakery_id, selectedOrder.order_id);
                            setOrders([]);
                            setEnsureDeleteModalIsOpen(false)
                        }
                        }
                    />
                    <Button
                        value="Cancel"
                        handleClick={() => setEnsureDeleteModalIsOpen(false)}
                    />
                </div>
            </div>
        </Modal>

    const mainContent =
        <div className="tableMainContent">
            <Link to="/new-order">
                <Button className="addNewOrder" value="+" />
            </Link>
            {
                ordersRef &&
                <div className="App">
                    <Table
                        columns={columns}
                        data={ordersRef.current}
                        handleClick={(order_id) => handleDeleteOrder(order_id)}
                        handleShow={(order) => handleShowOrderDetails(order)}
                        databaseColumn="order_id"
                        isOrder={true}
                    />
                </div>
            }

            {deleteModal}
        </div >

    return (
        <LoggedInPage mainContent={mainContent} activatedPage="Orders" />
    );
}