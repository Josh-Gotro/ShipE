const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config();

// allow cross origin requests
app.use(cors())

mongoose.connect(process.env.MongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

// app.use(express.urlencoded({
//     extended: false
// }));

// app.use(['/sms', '/batch'], express.json());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("now listening for requests on port 4000")
}); 

// Handle POST requests
app.post('/batch', async (req, res) => {
    const resourceUrl = req.body.resource_url;
    console.log(req.body, resourceUrl) // Call your action on the request here
    res.status(200).end() // Respond
})

// app.post('/sms', async (req, res) => {
//     console.log(req.body, "lolSMS") // Call your action on the request here
//     res.status(200).end() // Respond
// })



