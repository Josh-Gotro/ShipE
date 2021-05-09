const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
    ship_date: String,
    shipment_cost: Number,
    tracking_number: String,
    label_download: String,
    addressId: String
});

module.exports = mongoose.model('Label', labelSchema)