const { Router } = require("express")
const DeliveryController = require("../controllers/delivery_controller")

const router = Router()

router.post("/", DeliveryController.ScheduleDelivery)

module.exports = router
