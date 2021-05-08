const plivo = require('plivo');

// Enable .env 
require('dotenv').config();
const Auth_ID = process.env.P_AUTH;
const Auth_Token = process.env.P_TOKEN;


module.exports = {
    replySMS: async function (replyToNumber, labelURL, trackingNumber) {

        (function main() {
            'use strict';
            const client = new plivo.Client(Auth_ID, Auth_Token);
            client.messages.create(
                "+15125881023",
                replyToNumber,
                `Hello, from wesellonething.biz!\n\n`+
                `Shipping Label:\n ${ labelURL }\n\n`+
                `Tracking Number: ${ trackingNumber }`
            )
        })();
    }
};
