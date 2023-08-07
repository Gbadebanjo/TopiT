import express from "express";
import * as controller from "../controllers/transaction"

const router = express.Router();

// topit/account/transaction/
router.get('/', controller.getAllTransactions);
router.post('/', controller.addTransaction);

// import router into app.ts
export default router;
