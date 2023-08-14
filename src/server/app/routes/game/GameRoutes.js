const express = require("express")
const router = express.Router()

const GamesControllers = require("../../controllers/GameControllers")
const MessagesControllers = require("../../controllers/MessageControllers")

router.use('/random/heroes/get', GamesControllers.getHero)

router.get('/confession/get', MessagesControllers.get)
router.post('/confession/send', MessagesControllers.send)
router.get('/confession/read/:id', MessagesControllers.read)
router.delete('/confession/delete/:id', MessagesControllers.delete)

module.exports = router