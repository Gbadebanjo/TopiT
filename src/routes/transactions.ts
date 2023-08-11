import express from "express";
import * as controller from "../controllers/transaction"

// routes -> app.ts
// router and controllers for user transactions

const router = express.Router();

// url => /account/transaction
router.post('/recharge', controller.recharge);
router.post('/data', controller.recharge);
router.post('/fund', controller.fund);

router.get('/', function (req, res) {
  res.redirect('recharge');
});

// import router into app.ts
export default router;


