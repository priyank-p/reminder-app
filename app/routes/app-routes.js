const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(500);
    res.send('Reminder must be passed in!');
    return;
  }

  console.log(req.body);
  res.status(200);
});

module.exports = router;
