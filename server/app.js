const express = require('express');
const app = express();
const axios = require('axios');
const { graphqlHTTP } = require('express-graphql');
const fs = require('fs');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')

// Enable .env 
require('dotenv').config();

// Allow cross origin requests
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MongoURI);
mongoose.connection.once('open', () => { console.log('connected to database') })

// handle incoming data for each endpoint
app.use(['/sms', '/batch'],express.urlencoded({ extended: false }));

app.use(['/sms', '/batch'], express.json());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Listen
app.listen(4000, () => {
    console.log("now listening for requests on port 4000")
}); 

// Handle Post Requests
app.post('/batch', async (req, res) => {
    const resourceUrl = req.body.resource_url;
    console.log(req.body, resourceUrl) // Action
    res.sendStatus(200); // Respond
})

app.post('/sms', async (req, res) => {
    console.log(req.body, "lolSMS") // Action 
    res.sendStatus(200); // Respond
})



