import React, { useState, useContext } from 'react';
import Form from '../../Components/Form';
import UserContext from '../../UserContext';
import Step from './Step';

export default function Step4({ client, existingClient, stepName, currentStep, setCurrentStep, order, handleSubmit, setOrder }) {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [deliveryDateIsSet, setDeliveryDateIsSet] = useState(false);

    const getNowDateAndTime = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        const h = today.getHours();
        const M = today.getMinutes();

        today = yyyy + '-' + mm + '-' + dd + 'T' + h + ':' + M;
        return today;
    }

    const fields =
        [
            {
                type: "info",
                title: "Client name: ",
                content: client.client_name
            },
            {
                type: "info",
                title: "Client phone: ",
                content: client.client_phone
            },
            {
                type: "info",
                title: "Client email: ",
                content: client.client_email
            },
            {
                type: "info",
                title: "Delivery address: ",
                content: client.street + ' ' + client.house_number + ', ' + client.city
            },
            {
                type: "info",
                title: "Total: ",
                content: order.total + " NIS"
            },
            {
                type: "info",
                title: "Estimated delivery time:"
            },
            {
                type: "input",
                inputType: "datetime-local",
                onChange: (event) => {
                    setOrder({ ...order, deliveryDate: event.target.value });
                    setDeliveryDateIsSet(true);
                },
                min: getNowDateAndTime(),
                // className: "accordionQtyField"
            }
        ]

    const component =
        <Form fields={fields} className="newOrderForm" />

    const nextStep = () => {
        // if (!existingClient) {
        //     client.city = clientAddress.city;
        //     client.street = clientAddress.street;
        //     client.house_number = clientAddress.houseNumber;
        //     client.apartment_number = clientAddress.apartmentNumber;
        // }
        handleSubmit();
    }

    const previousStep = () => {
        setCurrentStep(currentStep - 1);
    }

    return (
        <Step
            component={component}
            stepTitle={stepName}
            previousStep={previousStep}
            nextStep={nextStep}
            disableNextPage={!deliveryDateIsSet}
            showPrevious={true}
        />
    );
}