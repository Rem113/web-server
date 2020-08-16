const { Schema, model } = require('mongoose')

const DeliveryScheme = Schema({
    name: {
        type: String,
        required: true,
    },
    isFood: {
        type: Boolean,
        required: true,
    },
    isMedicine: {
        type: Boolean,
        required: true,
    },
    address: {
        type: String,
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    }
})

module.exports = model("Delivery", DeliveryScheme, "Deliveries")