/**Module for signup and login */

import express from 'express';
import * as controller from "../controllers/user"

const router = express.Router();

// admin and users can SIGNUP and LOGIN from these routes
// router.post('/admin/signup', controller.signup);
// router.post('/signup', controller.signup);
// router.post("/login", controller.login);


// import router into app.ts
export default router;