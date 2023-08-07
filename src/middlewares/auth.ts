import { NextFunction, Response, Request } from "express";
import { loginValidator } from "../utils";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

/**Verify user's identity */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  console.log('calling authenticate middleware...');
  // user already has a token from login
  // I always have to paste the token manually in user's authorisation in postman
  // Is there a way i can put the token on the users authorisation
  // automatically after every login?
  const bearer = req.headers.authorization as string;
  console.log(bearer);
  if (!bearer) {
    return res.status(401).json({ message: "not authorized1!" });
  }
  const [_, token] = bearer.split(" ");
  if (!token) {
    return res.status(401).json({ message: "invalid token2!" });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user;
    next();
  } catch (error: any) {
    console.log({ error: error.message });
    return res.status(401).json({ error: 'invalid token3' });
  }
}

/**Not sure what this middleware is going to do yet */
export function authorize(req: Request, res: Response, next: NextFunction) {
  console.log('calling authorize middleware...');
  next();
}


declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}