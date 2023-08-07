import Joi from "joi";
import { NextFunction, Response, Request } from "express";


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

