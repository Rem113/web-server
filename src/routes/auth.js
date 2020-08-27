const { Router } = require("express")
const AuthController = require("../controllers/auth_controller")
const AuthMiddleware = require("../middlewares/auth_middleware")

const router = Router()

router.get("/delivers", AuthController.GetDelivers)
router.post("/register", AuthController.RegisterController)
router.post("/login", AuthController.LoginController)
router.put("/promote/to/manager", AuthMiddleware, AuthController.PromoteToManager)
router.put("/delivers", AuthController.PutDelivers)

module.exports = router
