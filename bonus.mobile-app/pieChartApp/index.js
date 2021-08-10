import { Navigation } from "react-native-navigation";
import { AppRegistry } from 'react-native';
import { registerScreens } from './src/screens';
import App from "./App";
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: 'Initializing'
            }
        },
    });
});