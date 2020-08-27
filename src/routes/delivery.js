const { Router } = require("express")
const DeliveryController = require("../controllers/delivery_controller")

const router = Router()

router.post("/", DeliveryController.ScheduleDelivery)
router.get("/delivers", DeliveryController.GetDelivers)

module.exports = router
