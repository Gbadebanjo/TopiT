import express from "express";
import * as controller from "../controllers/transaction"

const router = express.Router();

// account/transaction/
router.get('/all', controller.getAllTransactions);
router.get('/recharge', controller.recharge);
router.post('/recharge', controller.recharge);
router.post('/fund', controller.fund);
router.get('/recharge', controller.recharge);
// router.get('/transactions', controller.transactions);

// router.get('/fund', controller.fund);
// router.post('/fund', controller.fund);
// import router into app.ts
export default router;


