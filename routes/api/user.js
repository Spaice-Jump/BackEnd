const express = require('express');
const router = express.Router();
const User = require('../../models/users');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//GET default response API
router.post('/', function (req, res, next) {
	res.json({ API: 'Good Day In Space' });
});

//POST /api/v1/signup (body)
// Create un User
router.post(
	'/signup',
	upload.array('files'),

	async function (req, res, next) {
		try {
			const user = req.body.user;
			const email = req.body.email;
			const password = req.body.password;

			if (email.indexOf('@') === -1) {
				res.json({ status: 400, message: 'Email is not valid' });
				return;
			}

			//Habilitate Crypto Password
			const newUser = new User({
				user: user,
				email: email,
				password: await User.hashPassword(password),
			});
			//const newUser = new User({user:user , email:email, password:password });

			const userSave = await newUser.save();

			res.json({ status: 'OK', result: userSave });
			return;
		} catch (error) {
			if (error.code === 11000) {
				res.json({ status: 400, message: 'User duplicate' });
				return;
			} else {
				res.json({ status: 400, message: 'Error Create User' });
				return;
			}
		}
	}
);

// Borrar un User

router.post(
	'/deleteuser',
	upload.array('files'),

	async function (req, res, next) {
		try {
			const userId = req.body.userId;
			const email = req.body.email;
			const password = req.body.password;

			if (email.indexOf('@') === -1) {
				res.json({ status: 400, message: 'Email is not valid' });
				return;
			}

			// buscar el usuario en la BD
			const user = await User.findOne({ email: email });

			// si no lo encuentro o no coincide la contraseña --> error
			if (!user || !(await user.comparePassword(password))) {
				res.json({ status: 400, error: 'invalid credentials' });

				return;
			}

			await User.deleteOne(user);

			res.json({ status: 'OK', result: email });
			return;
		} catch (error) {
			res.json({ status: 400, message: 'Error Delete User' });
			return;
		}
	}
);
module.exports = router;
