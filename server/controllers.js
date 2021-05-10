// const schema = require('./schema/schema');
const mongoose = require('mongoose');
const Address = require('./models/address')
const Label = require('./models/label')


module.exports = {

    saveAddress: function (e) {
        return new Promise(function (resolve) {
            const newAddress = new Address({
                _id: new mongoose.Types.ObjectId(),
                name: e.name,
                phone: e.phone,
                company_name: e.company_name,
                address_line1: e.address_line1,
                address_line2: e.address_line2,
                address_line3: e.address_line3,
                city_locality: e.city_locality,
                city_locality: e.city_locality,
                state_province: e.state_province,
                postal_code: e.postal_code,
                country_code: e.country_code,
                address_residential_indicator: e.address_residential_indicator,
            });
            newAddress.save(function (err, object) {
                if (err) {
                    console.log("error: ", err)
                } 
            })
            resolve(newAddress)
        })
    },

    saveLabel: function (e, id) {
        return new Promise(function (resolve) {
            const newLabel = new Label({
                _id: new mongoose.Types.ObjectId(),
                ship_date: e.ship_date,
                shipment_cost: e.shipment_cost.amount,
                tracking_number: e.tracking_number,
                label_download: e.label_download.pdf,
                addressId: id
            });
            newLabel.save(function (err, object) {
                if (err) {
                    console.log("error: ", err)
                } 
            })
            resolve(newLabel)
        })
    },
};