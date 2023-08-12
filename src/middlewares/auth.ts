import { NextFunction, Response, Request } from "express";
import { User } from "../models";
import jwt from "jsonwebtoken";

// middlewares -> app.ts

// authenticate user => verify token
export function authenticate(req: Request, res: Response, next: NextFunction) {
  console.log('calling authenticate middleware');
  const secretKey = process.env.JWT_SECRET as string;
  const token = req.cookies.token;

  if (!token) {
    // return res.status(401).json({ message: "Please login/signup!" });
    console.log('No token found. Please sign up or login if you already have an account');
    return res.redirect('/');
  }

  try {
    const user = jwt.verify(token, secretKey);
    req.user = user;
    // token is valid, proceed!
    next();
  } catch (error: any) {
    res.render('error', { error, message: error.message });
  }
}

// authorize user => verify user
export async function authorization(req: Request, res: Response, next: NextFunction) {
  console.log('calling authorization middleware');
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [{ all: true }]
    });
    if (user) {
      req.user = user;
      // user is authorized, proceed!
      next();
    } else {
      return res.status(401).json({ message: "Please login/signup!" });
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