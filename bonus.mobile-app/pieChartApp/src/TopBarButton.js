import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

export default function TopBarButton(props) {
    return (
        <TouchableOpacity onPress={props.onClick}>
            <View>
                <Text>{props.value}</Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({

})