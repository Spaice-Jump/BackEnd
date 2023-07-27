const express = require('express');
const router = express.Router();




router.get('/', function(req, res, next) {
    res.json({"API": "Good Day In Space"});
  
  });


//POST /api/v1/signup (body)
// Crea un anuncio

router.post('/signup', function(req, res, next) {
    console.log(req);
    res.json({"API": "Good Day In Space"});
  
  });





module.exports = router;