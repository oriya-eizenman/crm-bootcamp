import React, { useState, useContext, useRef } from 'react';
import LoggedInPage from '../Components/LoggedInPage';
import UserContext from '../UserContext';
import Step1 from './StepWizard/Step1';
import Step2 from './StepWizard/Step2';
import Step3 from './StepWizard/Step3';
import Step4 from './StepWizard/Step4';
import StepWizard from '../Components/StepWizard';
import { createClient } from '../scripts/manageClients';
import { createOrder } from '../scripts/manageOrders';
import { createOrderItems } from '../scripts/manageOrderItems';
import {
    Redirect,
} from "react-router-dom";

export default function NewOrder2(props) {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [client, setClient] = useState({});
    const [existingClient, setExistingClient] = useState(true);
    const [order, setOrder] = useState({ total: 0, items: [], deliveryDate: Date.now() });
    const [orderID, setOrderID] = useState(-1);
    const [currentStep, setCurrentStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleClick = (orderReceived, total) => {
        setOrder({ ...order, items: orderReceived, total: total })
    }

    const handleSubmit = async () => {
        try {
            let updatedClient = client;
            if (!existingClient) {
                updatedClient = await addClient();
            }
            sendOrderData(updatedClient);
        }
        catch (err) {
            alert(err)
        }
    }

    const sendOrderData = async (client) => {
        try {
            const order_id = await addOrder(client);
            await addOrderItems(order_id);
            setIsFinished(true);
        }
        catch (err) {
            alert(err)
        }
    }

    const addClient = async () => {
        const client_id = await createClient(
            loggedInUser.bakery_id,
            client,
        );
        const updatedClient = { ...client, client_id: client_id };
        setClient(updatedClient);
        return updatedClient;
    }

    const addOrder = async (client) => {
        const order_id = await createOrder(
            loggedInUser.bakery_id,
            loggedInUser.user_id,
            client.client_id,
            order,
            setOrder
        );
        return order_id;
    }

    const addOrderItems = async (order_id) => {
        console.log('in add order items', order)
        await createOrderItems(loggedInUser.bakery_id, order_id, order)
    }

    const steps =
        [
            {
                component:
                    <Step1
                        setClient={(client) => setClient(client)}
                        client={client}
                        existingClient={existingClient}
                        setExistingClient={() => setExistingClient(!existingClient)}
                        stepName='Contact information'
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                    />,
            },
            {
                component:
                    <Step2
                        setClient={(client) => setClient(client)}
                        client={client}
                        existingClient={existingClient}
                        stepName='Delivery Information'
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                    />
            },
            {
                component:
                    <Step3
                        order={order}
                        handleClick={handleClick}
                        stepName='Items'
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                    />
            },
            {
                component:
                    <Step4
                        order={order}
                        client={client}
                        handleClick={handleClick}
                        stepName='Order Summary'
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        setOrder={setOrder}
                        order={order}
                        handleSubmit={handleSubmit}
                    />
            }
        ]


    const mainContent =
        <div className='step-progress'>
            <StepWizard
                steps={steps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />
            {isFinished && <Redirect to="/orders" />}
        </div>

    return (
        <LoggedInPage mainContent={mainContent} />
    );
}