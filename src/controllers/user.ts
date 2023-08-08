import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../models";
import * as utils from "../utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**Lists all users in database */
export async function getAllUsers(req: Request, res: Response) {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Unauthorized");
    }
    const allUsers = await User.findAll({
      include: [{ all: true }],
      attributes: ['username', 'email', 'fullname']
    });
    return res.json(allUsers);
  }
  catch (error: any) {
    res.render('error', { error, message: error.message });
  }
}

/**create user/admin acct */
export async function signup(req: Request, res: Response) {
  console.log(req.url);
  const isAdmin = req.url === '/admin/signup';
  if (isAdmin) {
    const admin = await User.findAll({ where: { isAdmin } });
    if (admin.length > 0) {
      return res.status(403).json({ error: 'admin already exists' });
    }
  }

  // validate user input
  const result = utils.registerValidator.validate(req.body, utils.options);
  if (result.error) {
    console.log({ error: result.error });
    return res.status(400).json({ error: "invalid input" });
  }

  // check if user email already exists in database
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).json({ message: "email already exists!" });
  }

  // hash user password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      id: uuidv4(),
      isAdmin,
    });
    console.log('+++SIGNUP SUCCESSFUL+++');
    console.log({ message: 'user created!', userInfo: newUser.dataValues });
    return res.status(201).json({ message: "user created successfully" });
  }
  catch (error: any) {
    res.render('error', { error, message: error.message });
  }
}

/**edit user acct */
export async function updateUser(req: Request, res: Response) {
  const updates = req.body;
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      Object.assign(user, { ...user, ...updates });
      await user.save();
      console.log({ message: "updated successfully", user: user.dataValues })
      return res.json({ message: "updated successfully" });
    } else {
      throw new Error("Unknown user!");
    }
  }
  catch (error: any) {
    res.render('error', { error, message: error.message });
  }
}

/**delete user acct */
export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      console.log(user.dataValues)
      await user.destroy();
      return res.json({ message: "User deleted successfully" })
    } else {
      throw new Error("Unknown user!");
    }
  }
  catch (error: any) {
    res.render('error', { error, message: error.message });
  }
}

/**Login user/admin */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = utils.loginValidator.validate(req.body, utils.options);
    if (result.error) {
      console.log(result.error.details[0].message);
      return res.status(400).json({ message: "Invalid login details" });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('no user with such email');
      return res.status(400).json({ message: "Invalid login details" });
    }

    // Compare the provided password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(password, user.dataValues.password);
    if (!isValidPassword) {
      console.log('invalid password')
      return res.status(400).json({ message: "Invalid login details" });
    }

    // give user a token after successful login
    const { id } = user.dataValues;
    const secretKey = process.env.JWT_SECRET as string;
    const expiresIn = 10 * 60   // in seconds
    const token = jwt.sign({ id }, secretKey, { expiresIn });
    // save token as a cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: expiresIn * 1000,  // in milliseconds
    })

    console.log(`Hi dear! Let's get your dashboard. Redirecting to dashboard page...`);
    res.redirect('/account/dashboard')
  }
  catch (error: any) {
    res.status(500);
    res.render('error', { error, message: error.message });
  }
}

/*GET user dashboard with information */
export async function dashboard(req: Request, res: Response) {
  const user = req.user;
  const { username } = user;
  res.render('dashboard', {
    username: username.toUpperCase()
    //
    // values for ejs
    // 
  });
}

/**Generate random funding account number for user */
// export async function getAccountNo() {
//   const fundingAccts = await FundingAccount.findAll();
//   console.log(fundingAccts);
//   let acctNo = Math.random().toString().slice(2, 12);
//   // while (usedAccountNumbers.includes(acctNo)) {
//   //   acctNo = Math.random().toString().slice(2, 12);
//   // }

//   await FundingAccount.create({
//     id: uuidv4(),
//     number: acctNo,
//   })
// }