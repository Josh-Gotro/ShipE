const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')


// Enable .env 
require('dotenv').config();

// Allow cross origin requests
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true } );
mongoose.connection.once('open', () => { console.log('connected to database') })

// Specify middleware for each endpoint
app.use(['/sms', '/batch'],express.urlencoded({ extended: false }));

app.use('/batch', express.json());

app.use('/sms', function (req, res, next) {
    res.contentType('application/xml');
    next();
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Handle incoming SMS
app.post('/sms', function (request, res) {
    let from_number = request.body.From || request.query.From;
    let to_number = request.body.To || request.query.To;
    let text = request.body.Text || request.query.Text;
    res.sendStatus(200); // Respond
    console.log('Message received - From: ' + from_number + ', To: ' + to_number + ', Text: ' + text);
});

// Listen
let server = app.listen(4000, function () {
    console.log('Listening on port %d', server.address().port);
});