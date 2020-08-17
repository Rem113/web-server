const Delivery = require('../models/delivery')
const { getFromLatLon, getFromAddress } = require('../services/address_converter')

module.exports = {
    DeliveryController: async (req, res) => {

        const { name, isFood, isMedicine, address, lat, lon } = req.body
        console.log(req.body)

        var data = "Chalom";

        if (address == null)
            data = getFromLatLon(lat, lon)
        else
            data = getFromAddress(address)

        console.log(data)

        // Il faut mettre toutes les infos dans une variable
        // et faire un Delivery.create(variable)

        return res.status(201).end(name + ' is OK')
    }
}