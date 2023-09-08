const express = require('express');
const router = express.Router();
const User = require('../../models/users');
const multer = require('multer');
const Favorites = require('../../models/favorites');
const upload = multer({ dest: 'uploads/' });

// POST /api/users/:user Return a travels find by favorites.

router.post('/',
upload.array('files'),

async function (req, res, next) {
  try {

    const user = req.body.user;
    
    const userData = await User.findOne({ user: user });
    const userId = userData._id;
    const travels = await Favorites.find({ userId: userId });
     
    res.json({ status:"OK", result: travels });
    return
  } catch (error) {
      
    res.json({ status: 400, message : "Not Favorite Travels"  }); 
    return   
  }
}

);

module.exports = router;