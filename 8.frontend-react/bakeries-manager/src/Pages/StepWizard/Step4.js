import React, { useState, useContext } from 'react';
import Form from '../../Components/Form';
import UserContext from '../../UserContext';
import Step from './Step';

export default function Step4({ client, existingClient, stepName, currentStep, setCurrentStep, order, handleSubmit }) {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const fields =
        [
            {
                type: "label",
                value: "Client name:" + client.client_name
            },
            {
                type: "label",
                value: "Client phone: " + client.client_phone
            },
            {
                type: "label",
                value: "Client email: " + client.client_email
            },
            {
                type: "label",
                value: "Delivery address: " + client.street + ' ' + client.house_number + ', ' + client.city
            },
            {
                type: "label",
                value: "Total: " + order.total + " NIS"
            },
            {
                type: "label",
                value: "Estimated delivery time: 90 minutes"
            },
        ]

    const component =
        <Form fields={fields} />

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
            disableNextPage={false}
            showPrevious={true}
        />
    );
}