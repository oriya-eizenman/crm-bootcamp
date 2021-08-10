import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import { goHome } from './navigation'
import { USER_KEY, USER_DATA } from './config'

export default class SignIn extends React.Component {
    state = {
        username: '', password: ''
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }
    sendLoginData = async (userEmail, password) => {
        const res = await axios.post('http://localhost:8005/login', {
            userEmail: userEmail,
            password: password
        }, { withCredentials: true });
        console.log(res.data)
        return res.data;
    }
    signIn = async () => {
        const { username, password } = this.state
        try {
            const user = await this.sendLoginData(username, password);
            const userToken = user.token;
            if (userToken) {
                const userData = JSON.stringify(user.loggedInUser[0]);
                await AsyncStorage.setItem(USER_KEY, userToken);
                await AsyncStorage.setItem(USER_DATA, userData);
                console.log('user successfully signed in!')
                goHome();
            }
            else {
                console.log('not a valid user', userToken)
            }
        } catch (err) {
            console.log('error:', err)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('username', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('password', val)}
                />
                <Button
                    title='Sign In'
                    onPress={this.signIn}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 350,
        fontSize: 18,
        fontWeight: '500',
        height: 55,
        backgroundColor: '#42A5F5',
        margin: 10,
        color: 'white',
        padding: 8,
        borderRadius: 14
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})