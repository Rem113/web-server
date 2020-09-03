const R = require("ramda")

const Delivery = require("../models/delivery")
const { getFromAddress } = require("../services/address_converter")

/* Validation */
/*
   - At least one between food and medicine must be true
   - Addresses must not be empty
*/
const validateDeliveryData = ({ food, medicine, addresses }) => {
  const errors = {}

  if (food === undefined && medicine === undefined) {
    errors.food = "Please select at least one type of delivery"
    errors.medicine = "Please select at least one type of delivery"
  }

  if (addresses === undefined || addresses.length === 0)
    errors.addresses = "Please specify at least one address or coordinates"

  return Object.keys(errors).length > 0 ? errors : null
}

// Creates a new date without time
// Date can be passed as an argument
const createDate = (date) => {
  const temp = date ? new Date(date) : new Date()
  temp.setHours(0, 0, 0, 0)
  return temp
}

module.exports = {
  ScheduleDelivery: async (req, res) => {
    const errors = validateDeliveryData(req.body)

    if (errors) return res.status(400).json(errors)

    const data = {}

    // Figure out the locations
    const { addresses } = req.body

    data.addresses = await Promise.all(
      addresses.map((address) =>
        getFromAddress(address).then(({ coordinates: [lat, lon] }) => ({
          lat,
          lon,
        }))
      )
    )

    // Delivery dates
    const { dates } = req.body

    data.dates =
      dates === undefined
        ? [createDate()]
        : dates.map((date) => createDate(date))

    // Additional info
    const { food, medicine } = req.body

    data.food = food
    data.medicine = medicine

    // Create addresses x dates deliveries
    const created = []

    for (const address of data.addresses)
      for (const date of data.dates)
        created.push(
          Delivery.create({
            address,
            date,
            food: data.food,
            medicine: data.medicine,
          })
        )

    return res.status(201).json(await Promise.all(created))
  },

  GetDeliverers: async (req, res) => {
    const users = await User.find({ isManager: false })

    return res.status(200).json(users)
  },

  CalculateDeliveries: async (req, res) => {
    const today = createDate()

    // Get deliveries for today
    const deliveries = await Delivery.find({
      done: false,
      date: today,
    })

    return res.status(200).json(deliveries)
  },
}
