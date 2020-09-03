const { Schema, model } = require("mongoose")

const AddressSchema = Schema({
  _id: false,
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
})

const DeliverySchema = Schema({
  address: AddressSchema,
  date: { type: Date, required: true },
  done: { type: Boolean, default: false },
  food: { type: Boolean, default: false },
  medicine: { type: Boolean, default: false },
})

module.exports = model("Delivery", DeliverySchema, "Deliveries")
