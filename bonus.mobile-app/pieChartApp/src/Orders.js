import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY, USER_DATA } from './config'
import axios from 'axios';
import { Navigation } from 'react-native-navigation';

export default function Orders(props) {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(async () => {
        try {
            const listener = {
                componentDidAppear: async () => {
                    userData = JSON.parse(await AsyncStorage.getItem(USER_DATA));
                    setUser(userData);
                    const bakeryOrders = await getOrders(userData.bakery_id);
                    setOrders(bakeryOrders);
                }
            }
            const unsubscribe = Navigation.events().registerComponentListener(listener, props.componentId);
            return () => {
                unsubscribe.remove();
            };
        } catch (err) {
            console.log('error: ', err)
            goToAuth()
        }
    }, []);

    const getOrders = async (bakery_id) => {
        const res = await axios.post('http://localhost:9991/orders/getOrders/', {
            bakery_id: bakery_id,
        }, { withCredentials: true });
        return res.data.orders;
    }

    return (
        <SafeAreaView>
            <FlatList
                data={orders}
                renderItem={(order) =>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() =>
                            Navigation.push(props.componentId, {
                                component: {
                                    name: 'OrderDetails',
                                    options: {
                                        topBar: {
                                            title: {
                                                text: `Order #${order.item.order_id}`,
                                            },
                                        },
                                    },
                                    passProps: {
                                        order
                                    }
                                },
                            })
                        }
                    >
                        <Text style={styles.title}>{order.item.client_name}</Text>
                        <Text>Order ID: {order.item.order_id}</Text>
                        <Text>Total: {order.item.total} NIS</Text>
                    </TouchableOpacity>
                }
                keyExtractor={order => order.order_id}
            />
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
})