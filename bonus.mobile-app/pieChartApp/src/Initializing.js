import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { goToAuth, goHome } from './navigation'

import { USER_KEY } from './config'

export default class Initializing extends React.Component {
    async componentDidMount() {
        try {
            const user = await AsyncStorage.getItem(USER_KEY)
            console.log('user: ', user)
            setTimeout(() => {
                if (user) {
                    goHome()
                } else {
                    goToAuth()
                }
            }, 2000)

        } catch (err) {
            console.log('error: ', err)
            goToAuth()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Loading</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 28
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})