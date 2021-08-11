import React, { useEffect, useState, useMemo, useRef, useContext } from 'react';
import Table from "../Components/Table";
import { getClients, deleteClient } from '../scripts/manageClients';
import LoggedInPage from '../Components/LoggedInPage';
import UserContext from '../UserContext';
import Modal from 'react-modal';
import Button from '../Components/Button';
import Form from '../Components/Form';
import { createClient, updateClient, sendToMailingList } from '../scripts/manageClients';

export default function Clients(props) {
    const clientInitialState = {
        client_name: "",
        client_email: "",
        client_phone: "",
        city: "",
        street: "",
        house_number: "",
        apartment_number: ""
    };
    const [clients, setClients] = useState([]);
    const clientsRef = useRef(clients);
    clientsRef.current = clients;
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newClientModalIsOpen, setNewClientModalIsOpen] = useState(false);
    const [editClientModalIsOpen, setEditClientModalIsOpen] = useState(false);
    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false);
    const [client, setClient] = useState(clientInitialState);
    const [updateTable, setUpdateTable] = useState(false);
    const [mailingList, setMailingList] = useState([]);
    const [message, setMessage] = useState("");
    const [messageTitle, setMessageTitle] = useState("");
    const [ensureDeleteModalIsOpen, setEnsureDeleteModalIsOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [messageSent, setMessageSent] = useState(false);

    // io.on('connection', (socket) => {
    //     socket.on('sent', client_email => {
    //         console.log(client_email)
    //     })
    // })

    useEffect(() => {
        getClients(loggedInUser.bakery_id, (data) => {
            setClients(data);
        });
    }, [clients.length, updateTable]);

    const openNewClientModal = () => {
        setNewClientModalIsOpen(true);
    }

    const closeNewClientModal = () => {
        setClient(clientInitialState)
        setNewClientModalIsOpen(false);
    }

    const openEditClientModal = () => {
        setEditClientModalIsOpen(true);
    }

    const closeEditClientModal = () => {
        setClient(clientInitialState)
        setEditClientModalIsOpen(false);
    }

    function handleDeleteClient(clientEmail) {
        setSelectedClient(clientEmail)
        setEnsureDeleteModalIsOpen(true);
    }

    function handleEditClient(clientData) {
        client.client_name = clientData.client_name;
        client.client_phone = clientData.client_phone;
        client.client_email = clientData.client_email;
        client.city = clientData.city;
        client.street = clientData.street;
        client.house_number = clientData.house_number;
        client.apartment_number = clientData.apartment_number;
        client.client_id = clientData.client_id;
        openEditClientModal();
    }

    function handleAddUser() {
        createClient(loggedInUser.bakery_id, client, setClient);
        setUpdateTable(!updateTable);
        closeNewClientModal();
    }

    function handleEditUser() {
        updateClient(client);
        setUpdateTable(!updateTable);
        closeEditClientModal();
    }

    const deleteModal =
        <Modal
            isOpen={ensureDeleteModalIsOpen}
            onRequestClose={() => setEnsureDeleteModalIsOpen(false)}
            ariaHideApp={false}
            contentLabel="Example Modal"
            className="modal"
        >
            <div className="modalContainer">
                Are you sure you want to delete this client?
                <div>
                    <Button
                        value="Delete"
                        handleClick={() => {
                            deleteClient(selectedClient);
                            setClients([]);
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

    const columns = useMemo(
        () => [
            {
                Header: "",
                accessor: (row) =>
                    messageSent && mailingList.includes(row)
                        ?
                        <div>
                            sent
                        </div>
                        :
                        <input
                            type="checkbox"
                            name="mailingList"
                            onChange={() => handleToggleMailingList(row)}
                        />
                ,
                id: 'action',
                className: 'action'

            },
            {
                Header: "Name",
                accessor: "client_name"
            },
            {
                Header: "Email",
                accessor: "client_email"
            },
            {
                Header: "Phone number",
                accessor: "client_phone"
            },
            {
                id: "Address",
                Header: "Address",
                accessor: properties =>
                    properties.street
                    + ' ' +
                    properties.house_number
                    // + ' Apt. ' +
                    // properties.apartment_number
                    + ', ' +
                    properties.city
            }
        ]
    );

    const fields =
        [
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
                value: client.client_phone,
                onChange: (event) => {
                    setClient({ ...client, client_phone: event.target.value });
                },
                placeholder: "05X-XXXXXXX",
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
            {
                type: "button",
                value: newClientModalIsOpen ? "Add Client" : "Update Client",
                onClick: newClientModalIsOpen ? handleAddUser : handleEditUser
            }
        ]

    const messageModal =
        <Modal
            isOpen={messageModalIsOpen}
            onRequestClose={() => setMessageModalIsOpen(false)}
            ariaHideApp={false}
            contentLabel="Example Modal"
            className="modal"
        >
            <div className="modalContainer messageModal input">
                Enter a message to your clients:
                <textarea
                    value={messageTitle}
                    onChange={(event) => setMessageTitle(event.target.value)}
                    placeholder="Message title"
                    className="text"
                    rows={1}
                />
                <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Enter a message"
                    rows={5}
                    className="text"
                />
            </div>
            <Button
                value="Send"
                handleClick={() => {
                    sendToMailingList(mailingList, messageTitle, message)
                    setMessageModalIsOpen(false);
                    setTimeout(
                        function () {
                            setMessageSent(true);
                        }
                        , 3000)
                }
                }
            />
        </Modal>

    const newClientModal =
        <Modal
            isOpen={newClientModalIsOpen}
            onRequestClose={closeNewClientModal}
            ariaHideApp={false}
            contentLabel="Example Modal"
            className="modal"
        >
            <div className="modalContainer">
                <a className="link modalLink" onClick={closeNewClientModal}>x</a>
                {false ?
                    <div>
                        Email sent to user.
</div>
                    :
                    <div className="mainModal">
                        <div>Enter the new client's details:</div>
                        <Form fields={fields} />
                    </div>
                }
            </div>
        </Modal>

    const editClientModal =
        <Modal
            isOpen={editClientModalIsOpen}
            onRequestClose={closeEditClientModal}
            ariaHideApp={false}
            contentLabel="Example Modal"
            className="modal"
        >
            <div className="modalContainer">
                <a className="link modalLink" onClick={closeEditClientModal}>x</a>
                {false ?
                    <div>
                        Email sent to user.
</div>
                    :
                    <div className="mainModal">
                        <div>Edit the client's details:</div>
                        <Form fields={fields} />
                    </div>
                }
            </div>
        </Modal>

    // const addAllClients = () => {
    //     setMailingList(clients);
    // }

    const handleToggleMailingList = (clientData) => {
        const clientIndex = mailingList.indexOf(clientData);
        let tempMailingList = mailingList;
        if (clientIndex > -1) {
            tempMailingList.splice(clientIndex, 1);
        }
        else {
            tempMailingList.push(clientData);
        }
        setMailingList(tempMailingList);
        console.log(mailingList)
    }

    const mainContent =
        <div className="tableMainContent">
            {deleteModal}

            <div className="clientsPageHeader">
                <Button
                    className="addNewClient"
                    value="+"
                    handleClick={openNewClientModal}
                />
                <div className="emailListHeader">
                    {/* <Button
                        className="addAllClientsToEmail"
                        value="Select all"
                        handleClick={addAllClients}
                    /> */}
                    <Button
                        className="sendEmailToClients"
                        value="Send email"
                        handleClick={() => {
                            setMessageModalIsOpen(true)
                            console.log(mailingList)
                        }
                        }
                    />
                </div>
            </div>
            {newClientModal}
            {editClientModal}
            {messageModal}

            {
                clientsRef &&
                <div className="App">
                    <Table
                        columns={columns}
                        data={clientsRef.current}
                        handleClick={(clientData) => handleDeleteClient(clientData.client_email)}
                        handleEdit={(clientData) => handleEditClient(clientData)}
                        databaseColumn="client_email"
                    // mailingList={mailingList}
                    // handleToggleMailingList={(clientData) => handleToggleMailingList(clientData)}
                    />
                </div>
            }
        </div >

    return (
        <LoggedInPage mainContent={mainContent} activatedPage="Clients" />
    );
}