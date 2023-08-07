import express from 'express';
import * as controller from "../controllers/user"

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  // render view from views/index.ejs
  res.render('index', {
    title: 'TOPIT RECHARGE APP',
    value: 'check check 1, 2, 3, testing'
  });
});

/* GET login page. */
// router.get('/login', function (req, res) {
//   // render view from views/login.ejs
//   res.render('index', {
//     error: '',
//   });
// });

/* GET signup page. */
router.get('/signup', function (req, res) {
  // render view from views/signup.ejs
  // res.render('signup', {});
  return res.json("render signup page");
});

/* GET contact page. */
router.get('/contact', function (req, res) {
  // render view from views/login.ejs
  res.render('contact', {
    error: '',
  });
});

// admin and users can SIGNUP and LOGIN from these routes
router.post('/admin/signup', controller.signup);
router.post('/signup', controller.signup);
router.post("/login", controller.login);

// import router into app.ts
export default router;
