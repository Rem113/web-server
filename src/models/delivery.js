const { Schema, model } = require("mongoose")

const AddressSchema = Schema({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  done: { type: Boolean, default: false },
})

const DeliverySchema = Schema({
  isFood: { type: Boolean, default: false },
  isMedicine: { type: Boolean, default: false },
  done: { type: Boolean, default: false },
  addresses: [AddressSchema],
  dates: [Date],
})

module.exports = model("Delivery", DeliverySchema, "Deliveries")
