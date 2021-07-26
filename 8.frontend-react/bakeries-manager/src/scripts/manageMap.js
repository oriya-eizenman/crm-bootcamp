import { getDeliveryAddresses } from './axios-php';
const axios = require('axios');

async function getAddresses(bakery_id) {
    const addresses = await getDeliveryAddresses(bakery_id);
    return addresses;
}

function getPosition(address) {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: address,
            key: "AIzaSyCQi8_SRDC00uhkijhmtvPGhtQPOo0STRM"
        }
    })
        .then(function (response) {
            console.log(response);
            // return response;
        })
        .catch(function (err) {
            console.log(err);
        })
}

export { getAddresses, getPosition };