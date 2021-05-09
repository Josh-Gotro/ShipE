const axios = require('axios');
const { replyBadAddress } = require('./sendSMS');


// Enable .env 
require('dotenv').config();
const API_KEY = process.env.API_KEY


// dummy warehouse ship_from address
const warehouseAddress = {
    "name": "Mr Croc",
    "company_name": "CROCS RETAIL, INC",
    "address_line1": "7477 DRY CREEK PKWY",
    "city_locality": "NIWOT",
    "state_province": "CO",
    "postal_code": "80503-8021",
    "country_code": "US",
    "phone": "512-555-5555"
}

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
            })
            resolve(smsAddress)
        }).catch((e) => {
            console.log("ERROR:", e.response.data.errors)
            let error = e.response.data.errors[0].message;
            console.log(error)
            return replyBadAddress(fromNumber, error)
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
            })
            resolve(validatedAddress)
        }).catch((e) => {
            console.log("ERROR:", e.response.data.errors)
            let error = e.response.data.errors[0].message;
            return replyBadAddress(fromNumber, error)
        })
    },

    // Shipengine Create Shipping Label
    createLabel: function (shippingAddress, fromNumber) {
        return new Promise(function (resolve) {
            const shippingLabel = axios({
                url: 'https://api.shipengine.com/v1/labels',
                method: 'post',
                responseType: 'application/json',
                headers: { 'api-key': API_KEY },
                data: {
                    "shipment": {
                        "service_code": "usps_priority_mail",
                        "ship_from": warehouseAddress,
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
            resolve(shippingLabel)
        }).catch((e) => {
            console.log("ERROR:", e.response.data.errors)
            let error = e.response.data.errors[0].message;
            return replyBadAddress(fromNumber, error)
        })
    }
};
