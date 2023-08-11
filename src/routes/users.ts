import express from 'express';
import * as controller from '../controllers/user';

// routes -> app.ts
// router and controllers for user accounts

// create router for /account
const router = express.Router();

// admin and users SIGNUP routes
router.post('/admin/signup', controller.signup);
router.post('/signup', controller.signup);

// admin and users LOGIN route
router.post("/login", controller.login);

router.put("/",  controller.updateAcct);
router.delete("/", controller.deleteAcct);

// GET /account should redirect to /account/dashboard
router.get('/', function (req, res) {
  res.redirect('dashboard');
});

// admin GET all users => return all users in json format
router.get('/all', controller.getAllUsers);

// POST /account/logout => logout user
router.get('/logout', controller.logout);

// import router into app.ts
export default router;
