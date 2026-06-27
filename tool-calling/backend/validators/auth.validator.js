import joi from "joi"

const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_-]).{8,25}/;

const RegisterDTO = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(21).allow(null, "").optional().default(null),
  password: Joi.string().regex(PasswordRegex).required().messages({
    "string.empty": "Password cannot be null",
    "string.pattern.base":
      "Password must have an alpha numeric value with a special character and of 8 to 25",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Password and confirmPassword must be same",
  }),
});

const LoginDTO = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().required()
})

const updateUserDTO = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().max(21).allow(null, "").optional().default(null),
}).min(1).messages({
  "object.min": "At least one field is required to update the user"
})

const ForgetPasswordDTO = Joi.object({
  email: Joi.string().email().required()
})

const ResetPasswordDTO = Joi.object({
  password: Joi.string().regex(PasswordRegex).required().messages({
    "string.empty": "Password cannot be null",
    "string.pattern.base":
      "Password must have an alpha numeric value with a special character and of 8 to 25",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Password and confirmPassword must be same",
  })
})

module.exports = { RegisterDTO, updateUserDTO, LoginDTO, ForgetPasswordDTO, ResetPasswordDTO };
