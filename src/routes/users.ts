import express from 'express';
import * as controller from '../controllers/user';

const router = express.Router();

// admin and users SIGNUP routes
router.post('/admin/signup', controller.signup);
router.post('/signup', controller.signup);

// admin and users LOGIN route
router.post("/login", controller.login);

router.put("/",  controller.updateAcct);
router.delete("/", controller.deleteAcct);
router.get('/', controller.getDashboard);

// admin GET all users => return all users in json format
router.get('/all', controller.getAllUsers);

// import router into app.ts
export default router;
