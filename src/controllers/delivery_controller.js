const Delivery = require('../models/delivery')
const { getFromLatLon, getFromAddress } = require('../services/address_converter')

module.exports = {
    DeliveryController: async (req, res) => {

        console.log(Converter)

        const { name, isFood, isMedicine, address, lat, lon } = req.body
        console.log(req.body)

        if (address == null)
            address = getFromLatLon(lat, lon)
        else
            getFromAddress(address)

        // Il faut mettre toutes les infos dans une variable
        // et faire un Delivery.create(variable)

        return res.status(201).end(name + ' is OK')
    }
}