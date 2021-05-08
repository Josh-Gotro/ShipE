const axios = require('axios');

// Enable .env 
require('dotenv').config();




module.exports = {

    parseAddress: async function (e, from_number) {
        const smsAddress = await axios({
            url: 'https://api.shipengine.com/v1/addresses/recognize',
            method: 'post',
            responseType: 'application/json',
            headers: { 'api-key': process.env.API_KEY },
            data: { 
                'text': e,
                'address': {
                    'country_code': 'US', 
                    'phone': from_number
                }
            }
        });
        // Returns an object
        console.log(smsAddress.data.address);
        return smsAddress.data.address
    },

    validateAddress: async function (address) {
        // console.log("validateAddress function: ", address)
        return new Promise(function(resolve){
            const validatedAddress = axios({
                url: 'https://api.shipengine.com/v1/addresses/validate',
                method: 'post',
                responseType: 'application/json',
                headers: { 'api-key': process.env.API_KEY },
                data: [ address ]
            })
            resolve(validatedAddress)
        })
    }
};

// validateAddress: async function (address) {
//     // console.log("validateAddress function: ", address)
//     const validatedAddress = await axios({
//         url: 'https://api.shipengine.com/v1/addresses/validate',
//         method: 'post',
//         responseType: 'application/json',
//         headers: { 'api-key': process.env.API_KEY },
//         data: [address]
//     }).then(function (data) {
//         console.log('verified address: ', data.data[0])
//         return data.data[0]
//     });
// }