const { Schema, model } = require("mongoose")

const DeliverySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  isFood: {
    type: Boolean,
    default: false,
  },
  isMedicine: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
})

module.exports = model("Delivery", DeliverySchema, "Deliveries")
