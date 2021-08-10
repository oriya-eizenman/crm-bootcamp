import React from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native'
import { goToAuth } from './navigation'
import { Navigation } from 'react-native-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { USER_KEY } from './config'

export default class Home extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: 'Home'
                },
            }
        };
    }
    logout = async () => {
        try {
            await AsyncStorage.removeItem(USER_KEY)
            goToAuth()
        } catch (err) {
            console.log('error signing out...: ', err)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello from Home screen.</Text>
                <Button
                    onPress={this.logout}
                    title="Sign Out"
                />
                <Button
                    onPress={() => {
                        Navigation.push(this.props.componentId, {
                            component: {
                                name: 'Orders',
                                options: {
                                    topBar: {
                                        title: {
                                            text: "Orders",
                                        },
                                    },
                                },
                            }
                        });
                    }}
                    title="Orders"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})