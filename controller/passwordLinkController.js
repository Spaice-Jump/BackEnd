const Usuario = require('../models/users.js');
const User = require('../models/users');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


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
    
      //res.json('Token recibido correctamente');
    
    
    
    

  //   const jwt = require('jsonwebtoken');
  //   // Captura el token de la URL
  // const token = req
  // ;

  // // Realiza la lógica que necesites con el token
  // console.log('Token recibido:', token);
  //   console.log('tokennnnnn', token)
  
  
        // Verificar el token utilizando una clave secreta (si es un JWT)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
          console.log('noooooo')
          throwerror(error)
        }
        console.log('decoded',decoded)
    
        // Comprobar la asociación con el usuario (por ejemplo, en tu base de datos)
        const user = await Usuario.findById(decoded._id);
        console.log('user',user)
        if (!user) {
          res.json ({ valid: false, reason: 'Usuario no encontrado' });
        }
    
        
    
        // Si todas las verificaciones pasan, el token es válido
        res.json( { valid: true, email:user.email, user:user.user });
   } catch (error) {
        console.log(error)
        res.json({ valid: false, error: 'Token no válido', status:400 });
      }
    
  }
   
}

module.exports = PasswordLinkController;

