import React, { useEffect, useState, useMemo, useRef, useContext } from 'react';
import Table from "../Components/Table";
import { getOrders, deleteOrder } from '../scripts/manageOrders';
import LoggedInPage from '../Components/LoggedInPage';
import UserContext from '../UserContext';
import Button from '../Components/Button';
import { Link, Redirect, useHistory } from "react-router-dom";
import OrderDetails from './OrderDetails';

export default function Orders(props) {
    const [orders, setOrders] = useState([]);
    const ordersRef = useRef(orders);
    ordersRef.current = orders;
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        getOrders(loggedInUser.bakery_id, (data) => {
            setOrders(data);
        });
    }, [orders.length]);

    function handleDeleteOrder(order) {
        deleteOrder(loggedInUser.bakery_id, order.order_id);
        setOrders([]);
    }

    function handleShowOrderDetails(order) {
        history.push({
            pathname: `/order/${order.order_id}`,
            state: { order: order }
        })
    }

    const columns = useMemo(
        () => [
            {
                Header: "Client",
                accessor: "client_name"
            },
            {
                Header: "Status",
                accessor: "status"
            },
            {
                Header: "Total",
                accessor: "total"
            },
            {
                Header: "Invoice",
                accessor: "invoice"
            },
            {
                Header: "Created",
                accessor: "created"
            },
            {
                Header: "Employee",
                accessor: "user_name"
            }
        ]
    );

    const mainContent =
        <div className="ordersMainContent">
            <Link to="/new-order">
                <Button value="+" />
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
        </div >

    return (
        <LoggedInPage mainContent={mainContent} activatedPage="Orders" />
    );
}