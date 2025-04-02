const Joi = require("joi");

const signupValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{3,20}$/)).required().messages({
            'string.pattern.base':"please follow my name rules",
            'any.required':"please send your name",
            'string.empty':"please fill your name"
        }),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required().messages({
            'string.pattern.base':"password must contain capital,small letter and numbers '8' "
        }),
        cPassword: Joi.string().valid(Joi.ref("password")).required().messages({
            'any.only':"please confirm password"
        }),
        age:Joi.number().required(),
        phone:Joi.string().min(11).max(11).required()
    })
}


const signinValidation = {
    body: Joi.object().required().keys({
    
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required().messages({
            'string.pattern.base':"password incorrect "
        })
        
    })
}



module.exports = {
    signupValidation,
    signinValidation
}