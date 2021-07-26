import React, { useState, useContext, useMemo, useRef } from 'react';
import LoggedInPage from '../Components/LoggedInPage';
import UserContext from '../UserContext';
import Accordion from '../Components/Accordion';

export default function NewOrder(props) {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [openedCard, setOpenedCard] = useState("");
    const [item, setItem] = useState("White bread");
    const [qty, setQty] = useState(1);
    const [order, setOrder] = useState([]);
    const [test, setTest] = useState(false);
    const [clientAddress, setClientAddress] = useState(
        {
            city: "",
            streetName: "",
            houseNumber: "",
            apartmentNumber: ""
        }
    );

    const itemsRef = useRef(order);
    itemsRef.current = order;

    const columns = useMemo(
        () => [
            {
                Header: "Items",
                columns: [
                    {
                        Header: "Item",
                        accessor: "item"
                    },
                    {
                        Header: "Qty",
                        accessor: "qty"
                    },
                    {
                        Header: "Price",
                        accessor: "price"
                    },
                    {
                        Header: "Total",
                        accessor: "total"
                    }
                ]
            }
        ]
    );

    const step1Fields =
        [
            {
                type: "label",
                value: "Contact information"
            },
            {
                type: "group",
                fields:
                    [
                        {
                            className: "accordionInputField",
                            type: "input",
                            inputType: "text",
                            value: clientPhone,
                            onChange: (event) => {
                                setClientPhone(event.target.value);
                            },
                            placeholder: "05X-XXXXXXX",
                        },
                        {
                            type: "button",
                            value: "Next",
                            onClick: (event) => {
                                setClientPhone(event.target.value);
                                setOpenedCard("clientName")
                            }
                        },
                    ]
            },
            {
                className: "accordionInputField",
                type: "input",
                inputType: "text",
                value: clientName,
                onChange: (event) => {
                    setClientName(event.target.value);
                },
                placeholder: "Full name",
            },
            {
                className: "accordionInputField",
                type: "input",
                inputType: "text",
                value: clientEmail,
                onChange: (event) => {
                    setClientEmail(event.target.value);
                },
                placeholder: "example@example.com",
            },
            {
                type: "label",
                value: "Delivery information"
            },
            {
                className: "accordionInputField",
                type: "input",
                inputType: "text",
                value: clientAddress.city,
                onChange: (event) => {
                    setClientAddress({ city: event.target.value });
                },
                placeholder: "City",
            },
            {
                className: "accordionInputField",
                type: "input",
                inputType: "text",
                value: clientAddress.streetName,
                onChange: (event) => {
                    setClientAddress({ streetName: event.target.value });
                },
                placeholder: "Street name",
            },
            {
                className: "accordionInputField",
                type: "input",
                inputType: "text",
                value: clientAddress.houseNumber,
                onChange: (event) => {
                    setClientAddress({ houseNumber: event.target.value });
                },
                placeholder: "House number",
            },
            {
                className: "accordionInputField",
                type: "input",
                inputType: "text",
                value: clientAddress.apartmentNumber,
                onChange: (event) => {
                    setClientAddress({ apartmentNumber: event.target.value });
                },
                placeholder: "Apartment number",
            },
        ]

    // const step2Fields =
    //     [
    //         {
    //             type: "label",
    //             value: "Delivery information"
    //         },
    //         {
    //             className: "accordionInputField",
    //             type: "input",
    //             inputType: "text",
    //             value: clientAddress.city,
    //             onChange: (event) => {
    //                 setClientAddress({ city: event.target.value });
    //             },
    //             placeholder: "City",
    //         },
    //         {
    //             className: "accordionInputField",
    //             type: "input",
    //             inputType: "text",
    //             value: clientAddress.streetName,
    //             onChange: (event) => {
    //                 setClientAddress({ streetName: event.target.value });
    //             },
    //             placeholder: "Street name",
    //         },
    //         {
    //             className: "accordionInputField",
    //             type: "input",
    //             inputType: "text",
    //             value: clientAddress.houseNumber,
    //             onChange: (event) => {
    //                 setClientAddress({ houseNumber: event.target.value });
    //             },
    //             placeholder: "House number",
    //         },
    //         {
    //             className: "accordionInputField",
    //             type: "input",
    //             inputType: "text",
    //             value: clientAddress.apartmentNumber,
    //             onChange: (event) => {
    //                 setClientAddress({ apartmentNumber: event.target.value });
    //             },
    //             placeholder: "Apartment number",
    //         },
    //     ]

    const step2Fields =
        [
            {
                type: "group",
                fields: [
                    {
                        type: "select",
                        name: "items",
                        value: item ? item.name : "",
                        options: [
                            {
                                value: "whiteBread",
                                description: "White bread"
                            },
                            {
                                value: "croissant",
                                description: "Croissant"
                            },
                            {
                                value: "bun",
                                description: "Bun"
                            },
                            {
                                value: "cinnamonRoll",
                                description: "Cinnamon roll"
                            }
                        ],
                        onChange: (event) => {
                            setItem(event.target.value);
                        },
                        className: "accordionFieldSelect"
                    },
                    {
                        className: "counter",
                        type: "group",
                        fields:
                            [
                                {
                                    type: "button",
                                    value: "-",
                                    onClick: (event) => {
                                        setQty(qty - 1);
                                    }
                                },
                                {
                                    type: "input",
                                    inputType: "text",
                                    value: qty,
                                    onChange: (event) => {
                                        setQty(event.target.value);
                                    },
                                    className: "accordionQtyField"
                                },
                                {
                                    type: "button",
                                    value: "+",
                                    onClick: (event) => {
                                        setQty(qty + 1);
                                    }
                                }
                            ]
                    },
                    {
                        type: "button",
                        value: "Add",
                        onClick: () => {
                            let temp = order;
                            temp.push(
                                {
                                    item: item,
                                    qty: qty,
                                }
                            );
                            setOrder(temp);
                            setTest(!test);
                        }
                    }
                ]
            },
            {
                type: "button",
                value: "Next",
                onClick: (event) => {
                    setClientPhone(event.target.value);
                    setOpenedCard("clientInfo")
                }
            },
        ];

    const cards =
        [
            {
                trigger: "Client info",
                open: openedCard === "clientInfo",
                onOpening: () => setOpenedCard("clientInfo"),
                formFields: step1Fields
            },
            {
                trigger: "Items",
                open: openedCard === "items",
                onOpening: () => setOpenedCard("items"),
                formFields: step2Fields,
                table: true,
                tableColumns: columns,
                itemsRef: itemsRef
            }
        ]

    // const steps =
    //     [
    //         { name: 'Contact info', component: <Form fields={step1Fields} /> },
    //         { name: 'Delivery Info', component: <Form fields={step2Fields} /> },
    //         { name: 'Items', component: <Form fields={step3Fields} /> },
    //     ]

    const mainContent =
        <Accordion cards={cards} test={test} />;

    // const mainContent =
    //     <div className='step-progress'>
    //         <StepZilla steps={steps} />
    //     </div>

    return (
        <LoggedInPage mainContent={mainContent} activatedPage="New order" />
    );
}