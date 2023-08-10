import express from "express";
import * as controller from "../controllers/transaction"

const router = express.Router();

// url => /account/transaction
router.get('/all', controller.getAllTransactions);
router.post('/recharge', controller.recharge);
router.post('/data', controller.recharge);
router.post('/fund', controller.fund);

// import router into app.ts
export default router;


