import React, { useContext, useEffect, useState } from 'react';
import Title from '../Components/Title';
import LoggedInPage from '../Components/LoggedInPage';
import UserContext from '../UserContext';
import { Doughnut, Line, Pie } from 'react-chartjs-2';
import {
    getIncomes,
    getEmployeesPerformance,
    getEmployeesOrders,
    getItemsSells,
    getTotalRevenue,
    getTotalOrders,
    getTotalClients
} from '../scripts/manageWidgets';

export default function Home({ handleLogoutMethod }) {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [incomes, setIncomes] = useState([]);
    const [employeesIncome, setEmployeesIncome] = useState([]);
    const [employeesOrders, setEmployeesOrders] = useState([]);
    const [itemsSells, setItemsSells] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalClients, setTotalClients] = useState(0);

    useEffect(async () => {
        let tempIncomes = await getIncomes(loggedInUser.bakery_id);
        let temp = [];
        tempIncomes && tempIncomes.forEach(element => {
            temp[element.Month - 1] = element.Sum;
        });
        setIncomes(temp);
    }, []);

    useEffect(async () => {
        let tempPerformance = await getEmployeesPerformance(loggedInUser.bakery_id);
        tempPerformance && setEmployeesIncome(tempPerformance);
    }, []);

    useEffect(async () => {
        let tempEmployeesOrders = await getEmployeesOrders(loggedInUser.bakery_id);
        tempEmployeesOrders && setEmployeesOrders(tempEmployeesOrders);
    }, []);

    useEffect(async () => {
        let tempItemsSells = await getItemsSells(loggedInUser.bakery_id);
        tempItemsSells && setItemsSells(tempItemsSells);
    }, []);

    useEffect(async () => {
        // const temp = await getTotalRevenue(loggedInUser.bakery_id)
        // setTotalRevenue(temp);
        const tempTotalOrders = await getTotalOrders(loggedInUser.bakery_id);
        tempTotalOrders && setTotalOrders(tempTotalOrders[0].num_of_orders);
        const tempTotalClients = await getTotalClients(loggedInUser.bakery_id);
        tempTotalClients && setTotalClients(tempTotalClients[0].num_of_clients);
    }, []);

    const dataIncomes = {
        labels: ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Mov', 'Dec'],
        datasets: [
            {
                label: 'incomes',
                data: incomes,
                fill: false,
                backgroundColor: '#BDC7C9',
                borderColor: '#2B4F60',
            },
        ],
    };

    const dataEmployeesIncome = {
        labels: employeesIncome.map(employee => employee.employee),
        datasets: [
            {
                label: 'incomes per employee',
                data: employeesIncome.map(employee => employee.sum),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const dataItemsSells = {
        labels: itemsSells.map(item => item.item),
        datasets: [
            {
                label: 'items sells',
                data: itemsSells.map(item => item.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const dataEmployeesOrders = {
        labels: employeesOrders.map(employee => employee.employee),
        datasets: [
            {
                label: 'orders per employee',
                data: employeesOrders.map(employee => employee.number_of_orders),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const mainContent =
        <div className="widgets">
            <div className="incomes-widget-border">
                <div className="incomes-widget">
                    <h4>Total Incomes</h4>
                    <Line data={dataIncomes} />
                </div>
                <div>
                    <h3>Total Orders: {totalOrders}</h3>
                    <h3>Total Clients: {totalClients}</h3>
                </div>
            </div>
            <div className="second-row-widgets">
                <div className="widget-border">
                    <div className="widget">
                        <h4>Incomes per Employee</h4>
                        {dataEmployeesIncome && <Pie data={dataEmployeesIncome} />}
                    </div>
                </div>
                <div className="widget-border">
                    <div className="widget">
                        <h4>Items Sells</h4>
                        {dataItemsSells && <Doughnut data={dataItemsSells} />}
                    </div>
                </div>
                <div className="widget-border">
                    <div className="widget">
                        <h4>Orders per Employee</h4>
                        {dataEmployeesOrders && <Pie data={dataEmployeesOrders} />}
                    </div>
                </div>
            </div>
        </div>

    return (
        <LoggedInPage mainContent={mainContent}

        />
    );
}