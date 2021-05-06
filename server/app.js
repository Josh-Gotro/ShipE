const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')
// const bodyParser = require('body-parser')


require('dotenv').config();

// allow cross origin requests
app.use(cors())


mongoose.connect(process.env.MongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/batch', express.urlencoded({
    extended: false
}));

app.use('/batch', express.json());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.post("/batch", (req, res) => {
    console.log(req.body) // Call your action on the request here
    res.status(200).end() // Respond
})


app.listen(4000, () => {
    console.log("now listening for requests on port 4000")
}); 



