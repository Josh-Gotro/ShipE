const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')
const { parseAddress, validateAddress, createLabel } = require('./shipE')
const { replySMS, replyBadAddress } = require('./sendSMS')

// Enable .env 
require('dotenv').config();

// Allow cross origin requests
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => { console.log('connected to database') })

// Specify middleware for each endpoint
app.use('/sms', express.urlencoded({ extended: false }));

app.use('/sms', function (req, res, next) {
    res.contentType('application/xml');
    next();
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Handle incoming SMS
app.post('/sms', async function (request, res) {
    res.sendStatus(200); // Respond

    // Assign variables from incoming SMS
    let fromNumber = request.body.From;
    let text = request.body.Text;

    // Parse address from SMS using ShipE /recognize
    let formatedAddress = await parseAddress(text, fromNumber);

    // Validate parsed addres using ShipE /validate
    let checkedAddress = await validateAddress(formatedAddress);
    console.log("!!!!!!whoami!!!!!!", checkedAddress.data[0])

    // If Valid, create shipping label using ShipE /labels & reply to SMS 
    if (checkedAddress.data[0].status == 'verified') {
        let shippingLabel = await createLabel(checkedAddress.data[0].matched_address);
        let labelURL = shippingLabel.data.label_download.pdf;
        let trackingNumber = shippingLabel.data.tracking_number;

        // Send reply SMS with Label URL and tracking number
        replySMS(fromNumber, labelURL, trackingNumber)
    } else {

        // Send reply SMS requesting valid address info
        replyBadAddress(fromNumber);
    }
});

// Listen
let server = app.listen(4000, function () {
    console.log('Listening on port %d', server.address().port);
});