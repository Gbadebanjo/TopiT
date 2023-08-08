import express from 'express';
import * as controller from '../controllers/user';

const router = express.Router();

// admin and users can SIGNUP and LOGIN from these routes
// topit/
router.post('/admin/signup', controller.signup);
router.post('/signup', controller.signup);
router.post("/login", controller.login);

// topit/account/
router.put("/",  controller.updateUser);
router.delete("/", controller.deleteUser);

router.get('/users', controller.getAllUsers);
router.get('/dashboard', controller.dashboard)

// import router into app.ts
export default router;
