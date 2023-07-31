const User = require("../models/users.js");
const jsonWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class LoginController {

    index(req, res, next){
        res.render("login");
    }

    async Authenticate(req, res, next){
        try {
            const {email, password} = req.body;
    
            const userData = await User.findOne({email: email});

            if(!userData || !(await bcrypt.compare(password, userData.password))){
                res.locals.error = 'El usuario no existe';
                res.redirect('/login');
                return;
            }

            const signedToken = jsonWT.sign({userId: userData.email}, process.env.JWT_POWER_SECRET, {
               expiresIn: '4d' 
            });

            res.json({token: signedToken});

        } catch(err) {
            next(err);
        }
    }
}

module.exports = LoginController;