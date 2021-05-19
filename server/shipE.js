const axios = require('axios');
const { replyBadAddress } = require('./sendSMS');

// Enable .env 
require('dotenv').config();
const API_KEY = process.env.API_KEY

module.exports = {

    // ShipEngine Parse Address
    parseAddress: async function (e, from_number) {
        const smsAddress = await axios({
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
        })
        return smsAddress
    },

    // ShipEngine Validate Address
    validateAddress: async function (address, fromNumber) {
        // console.log("validateAddress function: ", address)
        const validatedAddress = await axios({
            url: 'https://api.shipengine.com/v1/addresses/validate',
            method: 'post',
            responseType: 'application/json',
            headers: { 'api-key': API_KEY },
            data: [address]
        })
        return validatedAddress
    },

    // Shipengine Create Shipping Label
    createLabel: async function (shippingAddress, fromAddress) {
        const shippingLabel = await axios({
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
        })
        return shippingLabel
    }
};