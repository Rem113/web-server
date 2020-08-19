const Delivery = require("../models/delivery")

const {
  getFromLatLon,
  getFromAddress,
} = require("../services/address_converter")

module.exports = {
  DeliveryController: async (req, res) => {
    let { name, isFood, isMedicine, address, lat, lon } = req.body
    console.log(req.body)

    if (address == null) data = await getFromLatLon(lat, lon)
    else data = await getFromAddress(address)

    let city = data.city
    address = data.address
    lat = data.coordinates[0]
    lon = data.coordinates[1]

    isFood = isFood === "true"
    isMedicine = isMedicine === "true"

    const delivery = { name, isFood, isMedicine, address, city, lat, lon }
    console.log(delivery)

    try {
      await Delivery.create(delivery)
    } catch (error) {
      return res.status(400).end(error)
    }

    return res.status(201).end(name + " is OK")
  },
}
