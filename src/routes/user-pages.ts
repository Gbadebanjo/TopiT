import express from "express";

// pages router and controllers for user pages (rendered views only)

const router = express.Router();

/* GET dashboard page. */
// url => /account/dashboard
router.get('/dashboard', function (req, res) {
  // render view from views/dashboard.ejs
  const user = req.user.dataValues;
  res.render('dashboard', {
    username: user.username,
    acctBal: user.FundingAccount.dataValues.acctBal
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
// url => /account/transaction/addfund
router.get('/transaction/addfund', function (req, res) {
  // render view from views/addfunds.ejs
  res.render('addfunds');
});

/* GET profile page. */
// url => /account/profile
router.get('/profile', function (req, res) {
  // render view from views/profile.ejs
  res.render('profile');
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
  res.render('transactions', {});
});

// import router into app.ts
export default router;
