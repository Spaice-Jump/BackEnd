const Usuario = require('../models/users.js');
const User = require('../models/users');


class UpdateUserController{
    updateUser(req, res, next){
        const hola = req.body
        console.log('hola',hola)

    }
}
module.exports = UpdateUserController;