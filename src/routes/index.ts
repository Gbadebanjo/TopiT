import express from 'express';

// routes -> app.ts
// router and controllers for home pages (rendered views only)

const router = express.Router();

/* GET home page. */
// url => /
router.get('/', function (req, res) {
  // render view from views/index.ejs
  res.render('index');
});

/* GET signup page. */
// url => /signup
router.get('/signup', function (req, res) {
  // render view from views/signup.ejs
  res.render('signup');
});

/* GET contact page. */
// url => /contact
router.get('/contact', function (req, res) {
  // render view from views/contact.ejs
  res.render('contact');
});

// import router into app.ts
export default router;
