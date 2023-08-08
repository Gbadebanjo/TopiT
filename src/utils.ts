import Joi from "joi";

export const registerValidator = Joi.object().keys({
  username: Joi.string().lowercase().required(),
  email: Joi.string().lowercase().required(),
  password: Joi.string().min(6).max(15).required(),
  fullname: Joi.string().required(),
  phone: Joi.string().required()
});

export const loginValidator = Joi.object().keys({
  email: Joi.string().lowercase().required(),
  password: Joi.string().min(6).max(35).required(),
});

/**validation options*/
export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};