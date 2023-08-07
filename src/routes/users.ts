import express from 'express';
import * as controller from '../controllers/user';

const router = express.Router();

// topit/account/
router.put("/",  controller.updateUser);
router.delete("/", controller.deleteUser);
router.get('/users', controller.getAllUsers);
router.get('/dashboard', controller.dashboard)

// import router into app.ts
export default router;
