import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../models";
import * as utils from "../utils";
import bcrypt from "bcrypt"

/**Lists all users in database */
export async function getAllUsers(req: Request, res: Response) {
  if (!req.user.isAdmin) {
    console.log("unauthorized");
    return res.json({error: 'unauthorized'})
  }
  try {
    const allUsers = await User.findAll({ include: [{ all: true }] });
    return res.json(allUsers);
  }
  catch (error: any) {
    console.log(error.message);
    res.redirect('/topit/login/');
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
    console.log(error.message);
    res.redirect('/topit/signup/');
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
      return res.json({ message: "updated successfully" });
    } else {
      throw new Error("Unknown user!");
    }
  }
  catch (error: any) {
    console.log(error.message);
    res.redirect('/topit/login/');
  }
}

/**delete user acct */
export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.destroy();
      return res.json({ message: "User deleted successfully" })
    } else {
      throw new Error("Unknown user!");
    }
  }
  catch (error: any) {
    console.log(error.message);
    res.redirect('/topit/login/');
  }
}

/**Login user/admin */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = utils.loginValidator.validate(req.body, utils.options);
    if (result.error) {
      console.log({ message: result.error.details[0].message })
      return res.status(400).json({ error: "Invalid login details1" });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid login details2" });
    }

    // Compare the provided password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(password, user.dataValues.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid login details3" });
    }

    // give user a token after successful login
    const { id, username, isAdmin } = user.dataValues;
    const token = utils.generateToken({ id, isAdmin });
    req.headers.authorization =  token;
    req.headers.email = email;
    req.headers.password = password;
    // next();
    console.log({ msg: `Hi ${username}! You are now logged in.` });
    // res.redirect('account/dashboard')
    res.json({ message: 'Login successful!', token });
  }
  catch (error: any) {
    console.log(error.message);
    res.redirect('/topit/login/');
  }
}

/*GET user dashboard */
export async function dashboard(req: Request, res: Response) {
  console.log(req.user)
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      const { username } = user?.dataValues;
      res.render('dashboard', {
        username: username.toUpperCase()
      });
    } else {
      throw new Error("Unknown user!");
    }
  }
  catch (error: any) {
    console.log(error.message);
    res.redirect('/topit/login/');
  }
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