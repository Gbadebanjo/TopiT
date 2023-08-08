import { NextFunction, Response, Request } from "express";
import { User } from "../models";
import { loginValidator } from "../utils";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

/**Verify user's identity */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  console.log('authenticating user token...');
  // user already has a token from login
  // I always have to paste the token manually in user's authorisation in postman
  // Is there a way i can put the token on the users authorisation
  // automatically after every login? YES ==> cookies to the rescue :)
  const secretKey = process.env.JWT_SECRET as string;
  const token = req.cookies.token;

  if (!token) {
    console.log('user unknown!')
    return res.status(401).json({ message: "kindly sign in as a user!" });
  }

  try {
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (error: any) {
    console.log({ error: error.message });
    return res.status(500).json({ error: 'Please try again later' });
  }
}

/**Verify user's authority */
export async function authorization(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      console.log('fetching user data...')
      req.user = user.dataValues;
      console.log(req.user.username);
      next();
    } else {
      throw new Error("unable to identify user!");
    }
  }
  catch (error: any) {
    res.render('error', { error, message: error.message });
  }
}


declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}