import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    UIManager,
    findNodeHandle,
    Menu,
    MenuTrigger
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function TopBarButton(props) {
    const [icon, setIcon] = useState(null);
    const ICON_SIZE = 24

    const onRef = icon => {
        if (!icon) {
            setIcon({ icon })
        }
    }

    function onError() {
        console.log('Popup Error')
    }

    const onPress = () => {
        if (icon) {
            UIManager.showPopupMenu(
                findNodeHandle(icon),
                ['Edit', 'Delete'],
                onError,
                () => console.log('pressed')
            )
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <Icon
                name='more-vert'
                size={ICON_SIZE}
                color={'grey'}
            // ref={onRef} 
            />
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({

})