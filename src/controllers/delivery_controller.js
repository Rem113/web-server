const Delivery = require("../models/delivery")

const { getFromAddress } = require("../services/address_converter")

/* Validation */
/*
   - At least one between isFood and isMedicine must be true
   - Address or lat and lon or addresses or lats and lons should be defined
*/
const validateDeliveryData = ({
  isFood,
  isMedicine,
  address,
  addresses,
  lat,
  lats,
  lon,
  lons,
}) => {
  const errors = {}

  if (isFood === undefined && isMedicine === undefined) {
    errors.isFood = "Please select at least one type of delivery"
    errors.isMedicine = "Please select at least one type of delivery"
  }

  if (
    address === undefined &&
    (lat === undefined || lon === undefined) &&
    addresses === undefined &&
    (lats === undefined || lons === undefined)
  )
    errors.address = "Please specify at least one address or coordinates"

  return Object.keys(errors).length > 0 ? errors : null
}

module.exports = {
  ScheduleDelivery: async (req, res) => {
    const errors = validateDeliveryData(req.body)

    if (errors) return res.status(400).json(errors)

    const deliveryData = {}

    // Figure out the locations
    const { address, lat, lon, addresses, lats, lons } = req.body

    if (address !== undefined) {
      const {
        coordinates: [lat, lon],
      } = await getFromAddress(address)
      deliveryData.addresses = [{ lat, lon }]
    } else if (lat !== undefined && lon !== undefined) {
      deliveryData.addresses = [{ lat, lon }]
    } else if (addresses !== undefined) {
      deliveryData.addresses = await Promise.all(
        addresses.map((address) =>
          getFromAddress(address).then(({ coordinates: [lat, lon] }) => ({
            lat,
            lon,
          }))
        )
      )
    } else {
      deliveryData.addresses = lats.map((lat, i) => ({ lat, lon: lons[i] }))
    }

    // Delivery dates
    const { dates } = req.body

    deliveryData.dates =
      dates === undefined ? [new Date()] : dates.map((date) => new Date(date))

    // Additional info
    const { isFood, isMedicine } = req.body

    deliveryData.isFood = isFood
    deliveryData.isMedicine = isMedicine

    // Create it, then return its ID
    const delivery = await Delivery.create(deliveryData)

    return res.status(201).json({ id: delivery.id })
  },
}
