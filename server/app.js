const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const { parseAddress, validateAddress, createLabel } = require('./shipE');
const { replySMS } = require('./sendSMS');
const { saveAddress } = require('./controllers');
const Address = require('./models/address')

// Enable .env 
require('dotenv').config();

// Allow cross origin requests
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
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
    // console.log("formatted address", formatedAddress.data.address)

    // Validate parsed addres using ShipE /validate
    let checkedAddress = await validateAddress(formatedAddress.data.address, fromNumber);
    let currentReceiver = checkedAddress.data[0].matched_address
    // console.log("matched address:", checkedAddress.data[0].matched_address)
    let persistedAddress = await saveAddress(currentReceiver)

    // Create Shipping Label
    let shippingLabel = await createLabel(checkedAddress.data[0].matched_address, fromNumber);
    console.log(shippingLabel.data)

    // Attach shipping label to Address in Mongo DB

    // Send SMS confirmation with label pdf and tracking number
    let labelURL = shippingLabel.data.label_download.pdf;
    let trackingNumber = shippingLabel.data.tracking_number;
    // let replySuccess = replySMS(fromNumber, labelURL, trackingNumber)


});

// Listen
let server = app.listen(4000, function () {
    console.log('Listening on port %d', server.address().port);
});