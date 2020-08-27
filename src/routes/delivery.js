const { Router } = require("express")
const DeliveryController = require("../controllers/delivery_controller")

const router = Router()

router.post("/", DeliveryController.ScheduleDelivery)
router.get("/deliverers", DeliveryController.GetDeliverers)

module.exports = router
