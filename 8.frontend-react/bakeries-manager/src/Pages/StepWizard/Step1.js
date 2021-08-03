import React, { useState, useContext, useEffect } from 'react';
import Form from '../../Components/Form';
import UserContext from '../../UserContext';
import { getClients } from '../../scripts/manageClients';
import Select from 'react-select';
import Button from '../../Components/Button';
import Step from './Step';

export default function Step1({ client, setClient, existingClient, setExistingClient, stepName, currentStep, setCurrentStep }) {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        getClients(loggedInUser.bakery_id, (data) => {
            setClients(data);
        });
    }, [clients.length]);

    const fields =
        [
            {
                type: "input",
                inputType: "text",
                value: client.client_phone,
                onChange: (event) => {
                    setClient({ ...client, client_phone: event.target.value });
                },
                placeholder: "05X-XXXXXXX",
            },
            {
                type: "input",
                inputType: "text",
                value: client.client_name,
                onChange: (event) => {
                    setClient({ ...client, client_name: event.target.value });
                    //setShowErrorMsg(false);
                },
                placeholder: "Full name",
            },
            {
                type: "input",
                inputType: "text",
                value: client.client_email,
                onChange: (event) => {
                    setClient({ ...client, client_email: event.target.value });
                },
                placeholder: "example@example.com",
            },
        ]

    const searchExistingClient =
        <div>
            <div>
                <Button
                    className="link"
                    value="New customer"
                    handleClick={() => setExistingClient()}
                />
            </div>

            <div>
                <Select name={client.client_name}
                    defaultValue={client.client_name && { label: client.client_name }}
                    options=
                    {clients.map(client => {
                        return (
                            {
                                'label': client.client_name,
                                'value': client
                            }
                        )
                    })}
                    onChange={(name) => {
                        // setClient(name.label);
                        setClient(name.value);
                    }
                    } />
            </div>
        </div>

    const createNewClient =
        <div>
            <div>
                <Button
                    className="newCustomerFromNewOrder"
                    value="Existing customer"
                    handleClick={() => setExistingClient()}
                />
            </div>
            <Form fields={fields} />
        </div>

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const disableNextPage =
        existingClient ?
            !client.client_name :
            (!client.client_name ||
                !client.client_phone ||
                !client.client_email)
    return (
        <Step
            component={existingClient ?
                searchExistingClient :
                createNewClient}
            stepTitle={stepName}
            nextStep={nextStep}
            disableNextPage={disableNextPage}
            showPrevious={false}
        />
    );
}