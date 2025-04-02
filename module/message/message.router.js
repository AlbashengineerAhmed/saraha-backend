const router = require('express').Router()
const { auth } = require('../../middlwear/auth')
const validation = require('../../middlwear/validation')
const messageController = require('./controller/message')
const endPoint = require('./message.endPoint')
const messageValidators = require("./message.validation")


router.post("/message/:id", validation(messageValidators.sendMessage), 
messageController.sendMessage)

router.get("/message", auth(endPoint.messageList), messageController.messageList)

router.get("/message/ByMe", auth(endPoint.messageByMe), messageController.messageByMeList)
router.delete("/message/:id", validation(messageValidators.deleteMessage),
    auth(endPoint.deleteMessage), messageController.deleteMessage)

module.exports = router