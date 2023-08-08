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
//   res.render('index', {
//     error: '',
//   });
// });

/* GET signup page. */
router.get('/signup', function (req, res) {
  // render view from views/signup.ejs
  // res.render('signup', {});
  res.render('signup', {
    error: '',
  });
});

/* GET contact page. */
router.get('/contact', function (req, res) {
  // render view from views/contact.ejs
  res.render('contact', {
    error: '',
  });
});

// import router into app.ts
export default router;
