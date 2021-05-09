const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name: String,
    phone: String,
    company_name: String,
    address_line1: String,
    address_line2: String,
    address_line3: String,
    city_locality: String,
    state_province: String,
    postal_code: String,
    country_code: String,
    address_residential_indicator: String
});

module.exports = mongoose.model('Address', addressSchema)