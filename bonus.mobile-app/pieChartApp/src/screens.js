import { Navigation } from 'react-native-navigation';

export function registerScreens() {
    Navigation.registerComponent('Home', () => require('./Home').default);
    Navigation.registerComponent('Initializing', (sc) => require('./Initializing').default);
    Navigation.registerComponent('SignIn', () => require('./SignIn').default);
    Navigation.registerComponent('Orders', () => require('./Orders').default);
    Navigation.registerComponent('OrderDetails', () => require('./OrderDetails').default);
    Navigation.registerComponent('TopBarButton', () => require('./TopBarButton').default);
    Navigation.registerComponent('TopBarIcon', () => require('./TopBarIcon').default);

}