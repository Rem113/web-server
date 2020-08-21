const Delivery = require("../models/delivery")

const {
  getFromLatLon,
  getFromAddress,
} = require("../services/address_converter")

module.exports = {
  DeliveryController: async (req, res) => {
    let { address, lat, lon } = req.body

    if (address === undefined && (lat === undefined || lon === undefined))
      return res.status(400).end("Please specify either address or coordinates")

    const data =
      address === undefined
        ? await getFromLatLon(lat, lon)
        : await getFromAddress(address)

    await Delivery.create({ ...req.body, ...data })

    return res.status(201).end()
  },
}
