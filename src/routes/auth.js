const { Router } = require("express")
const AuthController = require("../controllers/auth_controller")

const router = Router()

router.post("/register", AuthController.RegisterController)

module.exports = router
