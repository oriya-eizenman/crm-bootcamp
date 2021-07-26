import React, { useState, useEffect } from 'react';
import Geocode from "react-geocode";

export default function Map(props) {
    const [locations, setLocations] = useState([]);

    useEffect(async () => {
        fetchPlaces();
    }, []);

    const getCode = async (address) => {
        // getPosition(address);
        const result = await Geocode.fromAddress(address);
        if (result) {
            return result.results[0].geometry.location;
        }
    }

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
            setLocations(temp)
        })

        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: new window.google.maps.LatLng(3.171368, 101.653404),
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        });

        const infowindow = new window.google.maps.InfoWindow;

        let marker, i;

        for (i = 0; i < locations.length; i++) {
            marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map
            });

            window.google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }




    return (
        <div data-role="page" id="map_result">
            <div data-role="content" >
                <div id="map"></div>
            </div>
        </div>
    );
}
