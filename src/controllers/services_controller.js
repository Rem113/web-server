const { getFromAddress } = require('../services/address_converter')
const { getAutocomplete } = require('../services/address_autocomplete')

module.exports = {
    GetFromAddress: async (req, res) => {
        const result = await getFromAddress(req.body.address)
        return res.status(200).json(result)
    },

    // GetAutocomplete: async (req, res) => {
    //     const result = await getAutocomplete(48.968037, 2.300856, 'Rue de la marne')
    // }
}