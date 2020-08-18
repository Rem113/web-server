const { Schema, model } = require('mongoose')

const DeliveryScheme = Schema({
    name: {
        type: String,
        required: true,
    },
    isFood: {
        type: Boolean,
        default: false,
        required: true
    },
    isMedicine: {
        type: Boolean,
        default: false,
        required: true
    },
    address: {
        type: String,
    },
    city: {
        type: String
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    }
})

module.exports = model("Delivery", DeliveryScheme, "Deliveries")