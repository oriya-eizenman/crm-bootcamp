import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
    Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation } from 'react-native-navigation';
import DropDownPicker from 'react-native-dropdown-picker';
import { USER_KEY, USER_DATA } from './config'
import axios from 'axios';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { getOrderItems } from '../../../8.frontend-react/bakeries-manager/src/scripts/axios-php';
import { updateOrder } from '../../../8.frontend-react/bakeries-manager/src/scripts/manageOrders';

export default function OrderDetails(props) {
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedId, setSelectedId] = useState(null);
    const [client, setClient] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editItemModalIsOpen, setEditItemModalIsOpen] = useState(false);
    const [actionsModalIsOpen, setActionsModalIsOpen] = useState(false);
    const [newItemModalIsOpen, setNewItemModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [qty, onQtyChange] = useState(0);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [dropdownOptions, setDropdownOptions] = useState([]);

    useEffect(async () => {
        try {
            setOrder(props.order.item);
            const userData = JSON.parse(await AsyncStorage.getItem(USER_DATA));
            setUser(userData);
            const clientData = await getClient(props.order.item.client_id);
            setClient(clientData);
            const items = await getOrderItems(props.order.item.order_id);
            setOrderItems(items)
            const products = await getProducts(props.order.item.bakery_id);
            const options = products.map(product => {
                return ({
                    label: product.item, value: product
                })
            })
            setDropdownOptions(options);
        } catch (err) {
            console.log('error: ', err)
            goToAuth()
        }
    }, []);

    Navigation.mergeOptions(props.componentId, {
        topBar: {
            rightButtons: !isEditMode ? [
                {
                    id: 'custom',
                    component: {
                        name: 'TopBarButton',
                        passProps: {
                            value: '...',
                            onClick: () => {
                                setActionsModalIsOpen(true);
                            }
                            // value: isEditMode ? 'Done' : 'Edit',
                            // onClick: () => {
                            //     setIsEditMode(!isEditMode);
                            //     if (isEditMode) {
                            //         updateOrder();
                            //         updateOrderItems();
                            //     }
                            // }
                        }
                    }
                },
            ]
                :
                [
                    {

                        id: 'custom',
                        component: {
                            name: 'TopBarButton',
                            passProps: {
                                value: 'Done',
                                onClick: () => {
                                    setIsEditMode(!isEditMode);
                                    if (isEditMode) {
                                        updateOrder();
                                        updateOrderItems();
                                    }
                                }
                            }
                        }

                    }
                    // {
                    //     id: 'custom',
                    //     component: {
                    //         name: 'TopBarButton',
                    //         passProps: {
                    //             value: isEditMode ? 'Done' : 'Edit',
                    //             onClick: () => {
                    //                 setIsEditMode(!isEditMode);
                    //                 if (isEditMode) {
                    //                     updateOrder();
                    //                     updateOrderItems();
                    //                 }
                    //             }
                    //         }
                    //     }
                    // },
                    // {
                    //     id: 'custom',
                    //     component: {
                    //         name: 'TopBarButton',
                    //         passProps: {
                    //             value: 'Delete',
                    //             onClick: () => {
                    //                 // setIsEditMode(!isEditMode);
                    //                 // if (isEditMode) {
                    //                 //     updateOrder();
                    //                 //     updateOrderItems();
                    //                 // }
                    //             }
                    //         }
                    //     }
                    // }
                ],
        },
    });

    const getProducts = async (bakery_id) => {
        const res = await axios.post('http://localhost:9991/items/getItems/', {
            bakery_id: bakery_id,
        }, { withCredentials: true })
        return res.data.items;
    }

    const deleteOrder = () => {
        axios.post('http://localhost:9991/orders/deleteOrder/', {
            bakery_id: client.bakery_id,
            order_id: order.order_id
        }, { withCredentials: true })
            .then(res => {
                console.log('deleted order');
            })
            .catch(err => {
                console.log(err);
            });
    }

    const updateOrder = async () => {
        const result = await axios.post('http://localhost:9991/orders/UpdateOrder/', {
            order_id: order.order_id,
            total: order.total,
        }, { withCredentials: true });
        if (result) {
            console.log('order updated');
        }
    }

    const updateOrderItems = async () => {
        const result = await axios.post('http://localhost:9991/order_items/updateOrderItems/', {
            bakery_id: client.bakery_id,
            order_id: order.order_id,
            items: orderItems
        }, { withCredentials: true });
        if (result) {
            console.log('order items added')
        }
    }

    const getClient = async (client_id) => {
        const result = await axios.post('http://localhost:9991/clients/getClient/', {
            client_id: client_id
        }, { withCredentials: true });
        return result.data.client[0];
    }

    const getOrderItems = async (order_id) => {
        const result = await axios.post('http://localhost:9991/order_items/getOrderItems/', {
            order_id: order_id,
        }, { withCredentials: true });
        return result.data.order;
    }

    const tableHeaders = ["Item", "Qty", "Price", "Total"];
    const widthArr = [150, 50, 50, 50]

    return (

        <SafeAreaView>
            <Text style={styles.title}>Client Info</Text>
            <Text>Name: {order.client_name}</Text>
            <Text>Phone number: {client.client_phone}</Text>
            <Text>Email: {client.client_email}</Text>
            <Text style={styles.title}>Delivery Details</Text>
            <Text>{client.street} {client.house_number}, {client.city}</Text>
            <Text style={styles.title}>Order</Text>
            <Text>Created: {order.created}</Text>
            <Text>Delivery time: {order.delivery_time}</Text>
            <Text>Status: {order.status}</Text>
            <Text>Total: {order.total}</Text>
            {isEditMode &&
                <Button
                    title="Add new item"
                    onPress={() => setNewItemModalIsOpen(true)}
                />
            }
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={tableHeaders} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {
                                orderItems.map(item => {
                                    console.log(item)
                                    const rowData = [
                                        isEditMode ?
                                            <Button
                                                title={item.item}
                                                onPress={() => {
                                                    setEditItemModalIsOpen(true);
                                                    setSelectedItem(item);
                                                    onQtyChange(item.qty);
                                                }}
                                            /> :
                                            item.item,
                                        item.qty,
                                        // <TextInput 
                                        // value={item.qty} 
                                        // onChange={setOrderItems([...orderItems, orderItems[]])}
                                        // />,
                                        item.price,
                                        item.total
                                    ];
                                    return (
                                        <Row
                                            // key={JSON.stringify(rowData)}
                                            data={rowData}
                                            // widthArr={state.widthArr}
                                            // style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                            textStyle={styles.text}
                                            widthArr={widthArr}
                                        />
                                    )
                                })
                            }
                        </Table>
                    </ScrollView>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editItemModalIsOpen}
                    onRequestClose={() => {
                        setEditItemModalIsOpen(!editItemModalIsOpen);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Change quantity of {selectedItem.item}</Text>
                            <TextInput
                                value={qty}
                                onChangeText={onQtyChange}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setEditItemModalIsOpen(!editItemModalIsOpen);
                                    let tempOrderItems = orderItems;
                                    const itemIndex = orderItems.indexOf(selectedItem);
                                    tempOrderItems.splice(itemIndex, 1);
                                    const oldTotal = selectedItem.total;
                                    const newTotal = qty * selectedItem.price;
                                    const updatedItem = { ...selectedItem, qty: qty, total: newTotal };
                                    tempOrderItems.splice(itemIndex, 0, updatedItem);
                                    setOrderItems(tempOrderItems);
                                    setOrder({ ...order, total: order.total - oldTotal + newTotal });
                                }}
                            >

                                <Text style={styles.textStyle}>Submit</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setEditItemModalIsOpen(!editItemModalIsOpen);
                                    let tempOrderItems = orderItems;
                                    const itemIndex = orderItems.indexOf(selectedItem);
                                    tempOrderItems.splice(itemIndex, 1);
                                    const oldTotal = selectedItem.total;
                                    setOrderItems(tempOrderItems);
                                    setOrder({ ...order, total: order.total - oldTotal });
                                }}
                            >
                                <Text style={styles.textStyle}>Delete item</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={actionsModalIsOpen}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setActionsModalIsOpen(!actionsModalIsOpen);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Button
                                onPress={() => {
                                    setActionsModalIsOpen(!actionsModalIsOpen);
                                    setIsEditMode(true);
                                }}
                                title="Edit"
                            />
                            <Button
                                onPress={() => {
                                    setActionsModalIsOpen(!actionsModalIsOpen);
                                    deleteOrder();
                                    Navigation.pop(props.componentId);
                                }}
                                title="Delete"
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={newItemModalIsOpen}
                    onRequestClose={() => {
                        setNewItemModalIsOpen(!newItemModalIsOpen);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Pick an item</Text>
                            <DropDownPicker
                                open={dropdownIsOpen}
                                value={dropdownValue}
                                items={dropdownOptions}
                                setOpen={setDropdownIsOpen}
                                setValue={setDropdownValue}
                                setItems={setDropdownOptions}
                            />
                            <Text>Quantity</Text>
                            <TextInput
                                value={qty}
                                onChangeText={onQtyChange}
                                style={{
                                    height: 40,
                                    width: 50,
                                    borderColor: 'gray',
                                    borderWidth: 1
                                }}
                            />
                            <Button
                                title="Add"
                                onPress={() => {
                                    setNewItemModalIsOpen(!newItemModalIsOpen);
                                    let tempOrderItems = orderItems;
                                    const newTotal = qty * dropdownValue.price;
                                    const newOrderItem = {
                                        item: dropdownValue.item,
                                        item_id: dropdownValue.item_id,
                                        price: dropdownValue.price,
                                        qty: qty,
                                        total: newTotal
                                    };
                                    tempOrderItems.push(newOrderItem);
                                    setOrderItems(tempOrderItems);
                                    setOrder({ ...order, total: parseInt(order.total) + newTotal });
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})