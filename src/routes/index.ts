import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  // render view from views/index.ejs
  res.render('index', {});
});

/* GET login page. */
// router.get('/login', function (req, res) {
//   // render view from views/login.ejs
//   res.render('login', {});
// });

/* GET signup page. */
router.get('/signup', function (req, res) {
  // render view from views/signup.ejs
  res.render('signup');
});

/* GET contact page. */
router.get('/contact', function (req, res) {
  // render view from views/contact.ejs
  res.render('contact', {});
});

/* GET dashboard page. */
// router.get('/account/dashboard', function (req, res) {
//   // render view from views/dashboard.ejs
//   res.render('dashboard', {
//     username: req.user.username.toUpperCase()
//     //
//     // values for ejs
//     // 
//   });
// })

// import router into app.ts
export default router;
