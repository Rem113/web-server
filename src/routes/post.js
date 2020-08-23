const { Router } = require("express")
const PostController = require('../controllers/post_controller')

const router = Router();

router.post('/', PostController.PostPost)
router.get('/', PostController.GetPost)

module.exports = router