import React, { useEffect, useState, useContext, useRef } from 'react';
import Map from '../Components/test';
import LoggedInPage from '../Components/LoggedInPage';
import { getAddresses } from '../scripts/manageMap';
import UserContext from '../UserContext';
import Geocode from "react-geocode";


export default function DeliveryMap(props) {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let [markers, setMarkers] = useState([]);

    useEffect(async () => {
        const tempMarkers = await getAddresses(loggedInUser.bakery_id)
        setMarkers([...tempMarkers]);
    }, [])

    const mainContent =
        <Map markers={markers} />

    return (
        <LoggedInPage mainContent={mainContent} activatedPage="Map" />
    );

}