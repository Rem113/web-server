const { Router } = require("express")
const DeliveryController = require("../controllers/delivery_controller")
const { Authenticate, IsManager } = require("../middlewares/auth_middleware")

const router = Router()

router.post("/", Authenticate, IsManager, DeliveryController.ScheduleDelivery)
router.get(
  "/deliverers",
  Authenticate,
  IsManager,
  DeliveryController.GetDeliverers
)
router.put(
  "/calculate",
  Authenticate,
  IsManager,
  DeliveryController.CalculateDeliveries
)

module.exports = router
