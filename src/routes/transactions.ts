import express from "express";
import * as controller from "../controllers/transaction"

// routes -> app.ts
// router and controllers for user transactions

const router = express.Router();

// url => /account
router.post('/recharge-airtime', controller.recharge);
router.post('/recharge-data', controller.recharge);
router.post('/fund-wallet', controller.fund);

// router.get('/', function (req, res) {
//   res.redirect('/recharge');
// });

// router.get('/success', function (req, res){
//   const user = req.user.dataValues;
//   const back = req.header('referer');
//   res.render('success', {
//     ...user,
//     // message: 'Airtime recharge successful',
//     back
//   });
// })

// router.get('/success', function (req, res){
//   const user = req.user.dataValues;
//   res.render('success', {
//     ...user,
//     // message: 'Data purchase successful',
//     // back: '/account/transaction/data'
//   });
// })

// redirectes to airtime recharge page
// router.get('/success/back', function (req, res){
//   res.redirect('/account/transaction/recharge');
// })

// // /account/transaction/go-back
// router.get('/go-back', (req, res) => {
//   // Use the referer header to redirect back
//   const referer = req.header('referer');

//   // Redirect to the previous page
//   if (referer) {
//     const url = referer?.slice(0, referer.lastIndexOf('/'));
//     res.redirect(url);
//   } else {
//     // If referer is not available, redirect to a default page
//     res.redirect('dashboard');
//   }
// });

// redirectes to airtime recharge page
// router.get('/success/back', function (req, res){
//   res.redirect('/account/transaction/data');
// })


// import router into app.ts
export default router;


