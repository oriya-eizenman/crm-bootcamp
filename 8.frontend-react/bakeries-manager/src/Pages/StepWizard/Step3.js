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
    const [orderItems, setOrderItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        getItems(loggedInUser.bakery_id, (data) => {
            setItems(data);
        });
    }, [items.length]);

    const columns = useMemo(
        () => [
            {
                Header: "Item",
                accessor: "item_name"
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
                        disabled: item.item === "",
                        onClick: () => {
                            let tempOrder = order.items;
                            const newItem =
                            {
                                item: item,
                                qty: qty
                            };

                            let itemIndex = -1;
                            for (let i = 0; i < orderItems.length; i++) {
                                if (orderItems[i].item === newItem.item.item) {
                                    itemIndex = i;
                                    break;
                                }

                            }

                            if (itemIndex > -1) {
                                let tempOrderItems = orderItems;
                                let orderItem = tempOrderItems[itemIndex];
                                tempOrderItems.splice(itemIndex, 1);
                                orderItem = {
                                    item: orderItem,
                                    item_name: orderItem.item,
                                    qty: orderItem.qty + qty,
                                    price: orderItem.price,
                                    total: orderItem.total + qty * orderItem.price
                                };
                                tempOrderItems.splice(itemIndex, 0, orderItem);
                                setOrderItems([...tempOrderItems]);
                                setTotal(total + qty * orderItem.price);
                            }
                            else {
                                let tempOrderItems = [];
                                tempOrderItems.push({
                                    item: item,
                                    item_name: item.item,
                                    qty: qty,
                                    price: item.price,
                                    total: qty * item.price
                                })
                                setOrderItems([...orderItems, ...tempOrderItems]);
                                setTotal(total + qty * item.price);
                            }
                            tempOrder.push(newItem);
                            setQty(1);
                        }
                    }
                ]
            },
        ];

    const component =
        <div className="step3Content">
            <div className="itemSelector">
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
                <Form className="itemSelectorForm" fields={fields} />
                {order.length !== 0 &&
                    <div className="tableContainer">
                        <Table
                            columns={columns}
                            data={orderItems}
                            handleClick={itemData => {
                                const tempOrderItems = orderItems;
                                const itemIndex = tempOrderItems.indexOf(itemData);
                                tempOrderItems.splice(itemIndex, 1);
                                setOrderItems(tempOrderItems);
                                setTotal(total - itemData.price * itemData.qty);
                            }}
                            hidePagination={true}
                        />
                    </div>
                }
            </div>
        </div>

    const nextStep = () => {
        handleClick(orderItems, total)
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