const Joi = require('@hapi/joi');


const registerValidation = (data) =>{
    const registerValidationSchema = Joi.object({
        name : Joi.string()
            .min(5)
            .required(),
        email: Joi.string()
            .email(),
        password: Joi.string()
            .min(8)
            .required()
    });
    
   return registerValidationSchema.validate(data);
};

const loginValidation = (data) =>{
    const loginValidationSchema = Joi.object({
        email: Joi.string()
            .email(),
        password: Joi.string()
            .min(8)
            .required()
    });
    
   return loginValidationSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

