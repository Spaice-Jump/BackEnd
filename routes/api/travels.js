const express = require('express');
const router = express.Router();
const Travels = require('../../models/Travels');
const User = require('../../models/users');
const Favorites = require('../../models/favorites');
const uploadPhoto = require('../../lib/multerConfig');
const FileSystem = require('fs');

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// GET /api/travels Return all travels.

router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    const select = req.query.select;
    let result = await Travels.list(filter, limit, skip, sort, select);
    
    for (let i = 0; i < result.length; i++) {
      const user = await User.findOne({ _id: result[i].userId });
      result[i].userName = user.user;
      const favorite = await Favorites.findOne({ userId: req.query.userId, travelId: result[i]._id });
      if (favorite) {result[i].favorite = true;}else{result[i].favorite = false;}
        

    }
    
    res.json(result); 
  } catch (err) {
    next(err);
  }
});

// GET /api/travels/:id Return a travel find by id.

router.get('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const result = await Travels.findOne({ _id: _id });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/travels Create a new travel.

router.post('/', uploadPhoto.single('photo'), async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file){
      data.photo = req.file.filename; 
    }
    data.favorite = false;
    const travel = new Travels(data);
    const result = await travel.save();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// PUT /api/travels/:id Update a travel by id.

router.put('/:id', uploadPhoto.single('photo'), async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = req.body;
    if (req.file){
      data.photo = req.file.filename; 
      const oldTravel = await Travels.findOne({ _id: _id });
      FileSystem.unlinkSync(`public/uploads/${oldTravel.photo}`);
    }
    const result = await Travels.findOneAndUpdate({ _id: _id }, data, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}); 

// DELETE /api/travels/:id Delete a travel by id.

router.delete('/:id', async (req, res, next) => {
  try { 
    const _id = req.params.id;
    const travel = await Travels.findOne({ _id: _id });
    FileSystem.unlinkSync(`public/uploads/${travel.photo}`);
    await Travels.deleteOne({ _id: _id });
    res.json("Anuncio borrado correctamente");
  } catch (err) {
    next(err);
  }   
});

// DELETE /api/travels/deletePhoto/:photoName Delete a photo by name.

router.delete('/deletePhoto/:photoName', async (req, res, next) => {
  try {
    const photoName = req.params.photoName;
    FileSystem.unlinkSync(`public/uploads/${photoName}`);
    const travel = await Travels.findOneAndUpdate({ photo: photoName }, { photo: null });
    res.json("Foto borrada correctamente");
  } catch (err) {
    next(err);
  }
});

router.put("/buy/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const buyerId = req.body;
    const result = await Travels.findOneAndUpdate({ _id: _id }, {active: false}, {userBuyer: buyerId},{new: true});
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/users/:user Return a travels find by user.

router.post('/users',
upload.array('files'),

async function (req, res, next) {
  try {

    const user = req.body.user;
    
    const userData = await User.findOne({ user: user });
    const userId = userData._id;
    const travels = await Travels.find({ userId: userId });
     
    res.json({ status:"OK", result: travels });
    return
  } catch (error) {
      
    res.json({ status: 400, message : "User Not Exist"  }); 
    return   
  }
}

);




module.exports = router;