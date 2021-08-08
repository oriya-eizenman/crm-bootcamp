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
    const [lastExistingClient, setLastExistingClient] = useState({});

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
                value: client.client_name,
                onChange: (event) => {
                    setClient({ ...client, client_name: event.target.value });
                },
                placeholder: "Full name",
                disabled: existingClient
            },
            {
                type: "input",
                inputType: "text",
                value: client.client_phone,
                onChange: (event) => {
                    setClient({ ...client, client_phone: event.target.value });
                },
                placeholder: "Phone number",
                disabled: existingClient
            },
            {
                type: "input",
                inputType: "text",
                value: client.client_email,
                onChange: (event) => {
                    setClient({ ...client, client_email: event.target.value });
                },
                placeholder: "Email address",
                disabled: existingClient
            },
        ]

    const searchExistingClient =
        <div className="step1Content">
            <div>
                <Button
                    className="link"
                    value={existingClient ? "New client" : "Existing client"}
                    handleClick={
                        () => {
                            setExistingClient(!existingClient);
                            if (existingClient) {
                                setClient({ client_name: "", client_phone: "", client_email: "" });
                            }
                            else {
                                setClient(lastExistingClient);
                            }
                        }
                    }
                />
            </div>
            <div>
                <h5>Choose an existing client</h5>
                <Select name={client.client_name}
                    defaultValue={lastExistingClient.client_name && { label: lastExistingClient.client_name }}
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
                        setClient(name.value);
                        setLastExistingClient(name.value);
                    }
                    }
                    isDisabled={!existingClient}
                />
            </div>
            <hr></hr>
            <div>
                <h5>{existingClient ? "Client contact information" : "Create a new client"}</h5>
                <Form fields={fields} />
            </div>
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
            component={searchExistingClient}
            stepTitle={stepName}
            nextStep={nextStep}
            disableNextPage={disableNextPage}
            showPrevious={false}
        />
    );
}