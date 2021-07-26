import React, { useContext, useRef, useMemo, useState, useEffect } from 'react';
import Form from '../../Components/Form';
import Table from '../../Components/Table';
import UserContext from '../../UserContext';
import Select from 'react-select';
import { getItems } from '../../scripts/manageItems';
import Step from './Step';

export default function Step3({ order, handleClick, currentStep, setCurrentStep, stepName }) {
    const [item, setItem] = useState({ item: "" });
    const [items, setItems] = useState([]);
    const [qty, setQty] = useState(1);
    const [test, setTest] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // const orderRef = useRef(order);
    // orderRef.current = order;

    useEffect(() => {
        getItems(loggedInUser.bakery_id, (data) => {
            setItems(data);
        });
    }, [items.length]);

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

    const fields =
        [
            {
                type: "group",
                fields: [
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
                            let tempOrder = order.items;
                            tempOrder.push(
                                {
                                    item: item,
                                    qty: qty
                                }
                            );
                            handleClick(tempOrder, order.total + qty * item.price);
                            let tempOrderItems = [];
                            tempOrderItems.push(
                                {
                                    item: item.item,
                                    qty: qty,
                                    price: item.price,
                                    total: qty * item.price
                                }
                            )
                            setOrderItems([...orderItems, ...tempOrderItems]);
                        }
                    }
                ]
            },
        ];
    // useEffect(() => console.log("here", order), [order])

    const component =
        <div>
            <div>
                <Select name={item.item}
                    options=
                    {items.map(item => {
                        return (
                            {
                                'label': item.item,
                                'value': item
                            }
                        )
                    })}
                    onChange={(item) => {
                        setItem(item.value)
                    }
                    } />
            </div>
            <div>
                <Form fields={fields} />
                {order.length !== 0 && <Table columns={columns} data={orderItems} />
                }
            </div>
        </div>

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
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