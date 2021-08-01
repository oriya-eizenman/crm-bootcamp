import React, { useState, useRef, useEffect } from 'react';
import {
    Map,
    GoogleApiWrapper,
    InfoWindow,
    Marker,
    withScriptjs,
    withGoogleMap
} from 'google-maps-react';
import LocationPin from './LocationPin';
import Geocode from "react-geocode";
import { getPosition } from '../scripts/manageMap';
import { compose } from "recompose";
import { gKey } from '../Constants/keys/keys';

Geocode.setApiKey(gKey);

function MapContainer(props) {
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({ place: "" });
    const [addresses, setaAddresses] = useState([]);
    // const [temp, setTemp] = useState([]);
    const [markers, setMarkers] = useState([]);

    useEffect(async () => {
        fetchPlaces();
    }, []);

    const fetchPlaces = () => {
        let temp = [];

        props.markers.map(async marker => {
            const position = await getCode(marker.address);
            temp.push(
                {
                    id: marker.address,
                    name: marker.address,
                    position: position
                }
            )
            setMarkers(temp)
        })
    }

    const onMarkerClick = (id, name) => {
        if (id === activeMarker) {
            return;
        }
        // console.log(marker)
        // // console.log(marker)
        setActiveMarker(id);
        // setSelectedPlace({ place: name });
    }

    const onClose = props => {
        // if (showingInfoWindow) {
        // setShowingInfoWindow(false);
        setActiveMarker(null);
        // }
    };

    const getCode = async (address) => {
        // getPosition(address);
        const result = await Geocode.fromAddress(address);
        if (result) {
            return result.results[0].geometry.location;
        }
    }

    return (
        <div className="map">

            <div className="google-map">
                <Map
                    google={props.google}
                    zoom={10}
                    onReady={fetchPlaces}
                    initialCenter={
                        {
                            lat: 32.109333,
                            lng: 34.855499,
                        }
                    }
                >


                    {markers.map(({ id, name, position }) => {
                        return <Marker
                            key={id}
                            position={position}
                            onClick={() => onMarkerClick(id, name)}
                        >
                            {console.log(activeMarker === id)}
                            {activeMarker === id ? (
                                <InfoWindow
                                    visible={true}
                                    onCloseClick={() => setActiveMarker(null)}>
                                    <div>{name}</div>
                                </InfoWindow>
                            ) : null}
                        </Marker>
                    }
                    )}
                    {/* {markers.map(async marker => {
                        const position = await getCode(marker.address);
                        console.log('position', position)
                        console.log('marker', marker)
                        return (
                            <Marker
                                key={marker.address}
                                onClick={onMarkerClick}
                                name={marker.address}
                                position={{ lat: position.lat, lng: position.lng }}
                            >

                            </Marker>
                        );
                    })}

                    <InfoWindow
                        marker={activeMarker}
                        visible={true}
                        onClose={() => onClose}
                    >
                        <div>
                            <h4>{selectedPlace.place}</h4>
                        </div>
                    </InfoWindow> */}
                </Map>




            </div>
        </div >
    );
}

export default GoogleApiWrapper({
    apiKey: gKey
})(MapContainer);






// import React, { useState, useRef } from 'react';
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import LocationPin from './LocationPin';
// import Geocode from "react-geocode";
// import { getPosition } from '../scripts/manageMap';

// function MapContainer(props) {
//     const [activeMarker, setActiveMarker] = useState({});
//     const [selectedPlace, setSelectedPlace] = useState({ place: "" });


//     const onMarkerClick = (props, marker, e) => {
//         console.log(props.name)
//         // console.log(marker)
//         setActiveMarker(marker);
//         setSelectedPlace({ place: props.name });
//     }

//     const onClose = props => {
//         // if (showingInfoWindow) {
//         // setShowingInfoWindow(false);
//         setActiveMarker(null);
//         // }
//     };

//     const getCode = async (address) => {
//         //getPosition(address);
//         // const result = await Geocode.fromAddress(address);
//         // if (result) {
//         //     console.log(result.results[0].geometry.location)
//         //     return result.results[0].geometry.location;
//         // }
//     }

//     // geocode();



//     return (
//         <div className="map">

//             <div className="google-map">
//                 <Map
//                     google={props.google}
//                     zoom={10}
//                     initialCenter={
//                         {
//                             lat: 32.109333,
//                             lng: 34.855499,
//                         }
//                     }
//                 >
//                     <Marker
//                         // key={marker.address}
//                         onClick={onMarkerClick}
//                         name={"Tel Aviv"}
//                         position={{
//                             lat: 32.109333,
//                             lng: 34.855499
//                         }}
//                     >

//                     </Marker>

//                     {/* {props.markers.map(async marker => {
//                         // const position = await getCode(marker.address);
//                         // const position =

//                         // console.log(position)
//                         return (
//                             <Marker
//                                 key={marker.address}
//                                 onClick={onMarkerClick}
//                                 name={marker.address}
//                                 position={{
//                                     lat: 32.109333,
//                                     lng: 34.855499
//                                 }}
//                             >

//                             </Marker>
//                         );
//                     })}*/ }

//                     <InfoWindow
//                         marker={activeMarker}
//                         visible={true}
//                         onClose={() => onClose}
//                     >
//                         <div>
//                             <h4>{selectedPlace.place}</h4>
//                         </div>
//                     </InfoWindow>
//                 </Map>




//             </div>
//         </div >
//     );
// }

