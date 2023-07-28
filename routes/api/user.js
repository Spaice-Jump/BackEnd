const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { body, validationResult } = require('express-validator');
const { check, oneOf } = require('express-validator');

router.get('/', function (req, res, next) {
  res.json({ API: 'Good Day In Space' });
});

//POST /api/v1/signup (body)
// Crea un Usuario

router.post(
  '/signup',
  upload.array('files'),
  [
    body(body.email)
      .custom(valor => {
        if (email.indexOf('@') === -1) {
          return false;
        }
      })
      .withMessage(`email is not valid`),
  ],
  function (req, res, next) {
    validationResult(req).throw();

    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    console.log('user', user);
    console.log('email', email);
    console.log('password', password);
    res.json({ API: 'Good Day In Space' });
  }
);





module.exports = router;