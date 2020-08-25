const { Router } = require("express")
const PostController = require("../controllers/post_controller")

const router = Router()

router.post("/", PostController.PostPost)
router.get("/", PostController.GetPosts)

router.post("/:id", PostController.PostComment)
router.get("/:id", PostController.GetPostById)

module.exports = router
