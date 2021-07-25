import React, { useState, useContext } from 'react';
import Form from '../../Components/Form';
import UserContext from '../../UserContext';
import Step from './Step';

export default function Step2({ client, setClient, existingClient, stepName, currentStep, setCurrentStep }) {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const fields =
        [
            {
                type: "label",
                value: "Delivery information"
            },
            {
                type: "input",
                inputType: "text",
                value: client.city,
                onChange: (event) => {
                    setClient({ ...client, city: event.target.value });
                },
                placeholder: "City",
            },
            {
                type: "input",
                inputType: "text",
                value: client.street,
                onChange: (event) => {
                    setClient({ ...client, street: event.target.value });
                },
                placeholder: "Street name",
            },
            {
                type: "input",
                inputType: "text",
                value: client.house_number,
                onChange: (event) => {
                    setClient({ ...client, house_number: event.target.value });
                },
                placeholder: "House number",
            },
            {
                type: "input",
                inputType: "text",
                value: client.apartment_number,
                onChange: (event) => {
                    setClient({ ...client, apartment_number: event.target.value });
                },
                placeholder: "Apartment number",
            },
        ]

    const component =
        <Form fields={fields} />

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const previousStep = () => {
        setCurrentStep(currentStep - 1);
    }

    const disableNextPage =
        existingClient ?
            !client :
            (!client.city ||
                !client.street ||
                !client.house_number ||
                !client.apartment_number)

    return (
        <Step
            component={component}
            stepTitle={stepName}
            previousStep={previousStep}
            nextStep={nextStep}
            disableNextPage={disableNextPage}
            showPrevious={true}
        />
    );
}