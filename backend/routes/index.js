const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/api/submit-form/create', function (req, res, next) {
//   res.render();
// })



// app.listen(3001, () => {
//   console.log('Server Listening on port 3001');
// });

module.exports = router;

// https://stackoverflow.com/questions/54952355/how-to-post-data-from-react-to-express