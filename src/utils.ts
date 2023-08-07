import Joi from "joi";
import jwt from "jsonwebtoken";

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

/**Generates a token for logged in user */
export const generateToken = (user: any) => {
  try {
    const secret = process.env.JWT_SECRET as string;
    return jwt.sign(user, secret, { expiresIn: '3h' });
  } catch (error) {
    console.log(error);
  }
}