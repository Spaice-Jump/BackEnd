const express = require('express');
const router = express.Router();
const Travels = require('../../../models/Travels');
const User = require('../../../models/users');
const uploadPhoto = require('../../../lib/multerConfig');
const FileSystem = require('fs');
const Favorites = require('../../../models/favorites');
const jwt = require('jsonwebtoken');

const multer = require('multer');
const revieJwtoken = require('../../../lib/revieJwtoken');

const upload = multer({ dest: 'uploads/' });




// POST /api/travels Create a new travel.

router.post('/', uploadPhoto.single('photo'), async (req, res, next) => {
	try {
		const data = req.body;
		if (req.file) {
			data.photo = req.file.filename;
		}
        data.favorite = false;
		const user = await User.findOne({ _id: data.userId });
		data.userName = user.user;
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
		if (req.file) {
			data.photo = req.file.filename;
			const oldTravel = await Travels.findOne({ _id: _id });
			if (oldTravel.photo) {
				FileSystem.unlinkSync(`public/uploads/${oldTravel.photo}`);
			}
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

		if (travel.photo) {
			FileSystem.unlinkSync(`public/uploads/${travel.photo}`);
		}

		await Travels.deleteOne({ _id: _id });
		res.json('Anuncio borrado correctamente');
	} catch (err) {
		next(err);
	}
});

// DELETE /api/travels/deletePhoto/:photoName Delete a photo by name.

router.delete('/deletePhoto/:photoName', async (req, res, next) => {
	try {
		const photoName = req.params.photoName;
		FileSystem.unlinkSync(`public/uploads/${photoName}`);
		const travel = await Travels.findOneAndUpdate(
			{ photo: photoName },
			{ photo: null }
		);
		res.json('Foto borrada correctamente');
	} catch (err) {
		next(err);
	}
});

// PUT /api/travels/buy/:id buy a travel by id.

router.put('/buy/:id', async (req, res, next) => {
	try {
		const _id = req.params.id;
		const userBuyer = req.body;
		update = { active: false, userBuyer: userBuyer.userBuyer };
		const result = await Travels.findOneAndUpdate({ _id: _id }, update, {
      new: true,
		});
		res.json(result);
		console.log('result', result);
	} catch (err) {
    next(err);
	}
});

// PUT /api/travels/active/:id active a travel by id.

router.put('/active/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const travelActive = req.body.travelActive;
    const result = await Travels.findOneAndUpdate({ _id: id }, {active: travelActive}, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/users/:user Return a travels find by user.

router.post(
	'/users',
	upload.array('files'),

	async function (req, res, next) {
		try {
			const user = req.body.user;
         

			const userData = await User.findOne({ user: user });
     
			const userId = userData._id;
      
			const travels = await Travels.find({ userId: userId });
 
			res.json({ status: 'OK', result: travels });
			return;
		} catch (error) {
			res.json({ status: 400, message: 'The user has no ads' });
			return;
		}
	}
);


module.exports = router;