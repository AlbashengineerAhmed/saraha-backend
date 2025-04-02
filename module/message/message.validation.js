const Joi = require("joi");
const sendMessage = {
    body: Joi.object().required().keys({
        messageBody: Joi.string().min(1).max(5000) 
    }),
    params: Joi.object().required().keys({
        id: Joi.string().min(24).max(24).required() // reciverID
        // id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an 24 ') // reciverID
    }),
    query : Joi.object().required().keys({
        senderId  : Joi.string().min(24).max(24)
    })
}
const deleteMessage = {
    params: Joi.object().required().keys({
        id: Joi.string().min(24).max(24).required() // reciverID
    })
}
module.exports = {
    sendMessage,
    deleteMessage
}