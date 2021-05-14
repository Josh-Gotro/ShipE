const axios = require('axios');
const { replyBadAddress } = require('./sendSMS');

// Enable .env 
require('dotenv').config();
const API_KEY = process.env.API_KEY

module.exports = {

    // ShipEngine Parse Address
    parseAddress: function (e, from_number) {
        return new Promise(function (resolve) {
            const smsAddress = axios({
                url: 'https://api.shipengine.com/v1/addresses/recognize',
                method: 'post',
                responseType: 'application/json',
                headers: { 'api-key': API_KEY },
                data: {
                    'text': e,
                    'address': {
                        'country_code': 'US',
                        'phone': from_number
                    }
                }
            }).catch((e) => {
                console.log("ERROR:", e.response.data.errors)
            })
            resolve(smsAddress)
        })
    },

    // ShipEngine Validate Address
    validateAddress: function (address, fromNumber) {
        // console.log("validateAddress function: ", address)
        return new Promise(function (resolve) {
            const validatedAddress = axios({
                url: 'https://api.shipengine.com/v1/addresses/validate',
                method: 'post',
                responseType: 'application/json',
                headers: { 'api-key': API_KEY },
                data: [address]
            }).catch((e) => {
                console.log("ERROR:", e.response.data.errors)
            })
            resolve(validatedAddress)
        })
    },

    // Shipengine Create Shipping Label
    createLabel: function (shippingAddress, fromAddress) {
        return new Promise(function (resolve) {
            const shippingLabel = axios({
                url: 'https://api.shipengine.com/v1/labels',
                method: 'post',
                responseType: 'application/json',
                headers: { 'api-key': API_KEY },
                data: {
                    "shipment": {
                        "service_code": "ups_ground",
                        "ship_from": fromAddress,
                        "ship_to": shippingAddress,
                        "packages": [
                            {
                                "weight": {
                                    "value": 17,
                                    "unit": "pound"
                                },
                                "dimensions": {
                                    "length": 36,
                                    "width": 12,
                                    "height": 24,
                                    "unit": "inch"
                                }
                            }
                        ]
                    }
                }
            }).catch((e) => {
                console.log("ERROR:", e.response.data.errors)
            })
            resolve(shippingLabel)
        })
    }
};