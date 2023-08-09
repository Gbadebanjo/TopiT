import express from "express";
import * as controller from "../controllers/transaction"

const router = express.Router();

// account/transaction/
router.get('/all', controller.getAllTransactions);
router.post('/recharge', controller.recharge);
router.get('/recharge', controller.recharge);
// import router into app.ts
export default router;


