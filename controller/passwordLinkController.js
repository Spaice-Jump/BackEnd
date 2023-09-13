const Usuario = require('../models/users.js');
const User = require('../models/users');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const axios = require("axios");


class PasswordLinkController {
  index(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('password');
  }
  
  async getAPI(req, res, next){
    try{
      // Captura el token de la URL
      const token = req.body.token;
    
      // Realiza la lógica que necesites con el token
      console.log('Token recibido:', token);
    
      //res.json('Token recibido correctamente')
  
  
        // Verificar el token utilizando una clave secreta (si es un JWT)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
          consolelog('noooooo')
          throwerror(error)
        }
        console.log('decoded',decoded)
    
        // Comprobar la asociación con el usuario (por ejemplo, en tu base de datos)
        const user = await Usuario.findById(decoded._id);
        console.log('user',user)
        if (!user) {
          return { valid: false, reason: 'Usuario no encontrado' };
        }
    
        
    
        // Si todas las verificaciones pasan, el token es válido
        return { valid: true, user };
   } catch (error) {
        console.log(error)
        res.json({ valid: false, error: 'Token no válido', status:400 });
      }
    
  }
   
}

module.exports = PasswordLinkController;
