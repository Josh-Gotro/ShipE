// const schema = require('./schema/schema');
const mongoose = require('mongoose');
const Address = require('./models/address')


module.exports = {

    saveAddress: function (e) {
        console.log(e)
        return new Promise(function (resolve) {

            const savedAddress = function (e) {
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
                newAddress.save(function ( err) {
                    if (err) {
                        console.log("Saved to DB: ", err)
                        return err
                    }
                })
            }
            savedAddress(e);
            resolve(savedAddress)    
        })
    },

    saveLabel: function (e) {
        console.log(e)
        return new Promise(function (resolve) {

            const savedLabel = function (e) {
                const newLabel = new Label({
                    _id: new mongoose.Types.ObjectId(),
                    ship_date: e.ship_date,
                    shipment_cost: e.shipment_cost,
                    tracking_number: e.tracking_number,
                    label_download: e.label_download,
                    addressId: e.addressId
                });
                newAddress.save(function (err) {
                    if (err) {
                        console.log("Saved to DB: ", err)
                        return err
                    }
                })
            }
            savedLabel(e);
            resolve(saveLabel)
        })
    },
};