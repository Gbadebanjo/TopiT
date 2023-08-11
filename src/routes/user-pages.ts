import express from "express";

// routes -> app.ts
// pages router and controllers for user pages (rendered views only)

const router = express.Router();

/* GET dashboard page. */
// url => /account/dashboard
router.get('/dashboard', function (req, res) {
  console.log('calling dashboard');
  // render view from views/dashboard.ejs
  const user = req.user.dataValues;

  let amounts: number[] = [], descriptions: string[] = [], createdAts: Date[] = [];
  user.Transactions.reverse().slice(0, 4).forEach((transaction: any) => {
    amounts.push(transaction.dataValues.amount);
    descriptions.push(transaction.dataValues.description);
    createdAts.push(transaction.dataValues.createdAt.toLocaleDateString());
  });
  console.log(createdAts)
  res.render('dashboard', {
    username: user.username,
    acctBal: user.FundingAccount.dataValues.acctBal,
    amt: amounts,
    desc: descriptions,
    date: createdAts,
    // transactions: [1,2,3,4]
  })
});

/* GET recharge (airtime) page. */
// url => /account/transaction/recharge
router.get('/transaction/recharge', function (req, res) {
  // render view from views/recharge.ejs
  res.render('recharge');
});

/* GET data page. */
// url => /account/transaction/data
router.get('/transaction/data', function (req, res) {
  // render view from views/data.ejs
  res.render('data');
});

/* GET addfunds page. */
// url => /account/transaction/fund
router.get('/transaction/fund', function (req, res) {
  // render view from views/addfunds.ejs
  res.render('addfunds');
});

/* GET profile page. */
// url => /account/profile
router.get('/profile', function (req, res) {
  // render view from views/profile.ejs
  const user = req.user.dataValues;
  const fundingAcct = user.FundingAccount.dataValues;
  res.render('profile', {
    username: user.username,
    email: user.email,
    phone: user.phone,
    fullname: user.fullname,
    fundingAcct: fundingAcct.acctNo + ' ' + "Topidus Bank",
  });
});

/* GET update profile page. */
// url => /account/profile/update
router.get('/profile/update', function (req, res) {
  // render view from views/update-profile.ejs
  res.render('update-profile');
});

/* GET all-transactions page. */
// url => /account/transaction/all
router.get('/transaction/all', function (req, res) {
  // render view from views/transactions.ejs
  console.log('calling controller to get all transactions (last 4)');
  const user = req.user.dataValues;

  let amounts: number[] = [], descriptions: string[] = [], createdAts: Date[] = [];
  user.Transactions.reverse().slice(0, 4).forEach((transaction: any) => {
    amounts.push(transaction.dataValues.amount);
    descriptions.push(transaction.dataValues.description);
    createdAts.push(transaction.dataValues.createdAt.toLocaleDateString());
  });
  res.render('transactions', {
    username: user.username,
    amt: amounts,
    desc: descriptions,
    date: createdAts
  })
});

/* GET withdraw page. */
// url => /account/transaction/withdraw
router.get('/transaction/withdraw', function (req, res) {
  // render view from views/withdraw.ejs
  res.render('withdraw');
});

// import router into app.ts
export default router;
