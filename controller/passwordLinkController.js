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
  async putAPI(req, res, next) {
    try {
      const { email } = req.body;
      console.log('email', email)

      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email: email });
      //const usuario = await Usuario.findOneAndUpdate(
        //{ email: email },
        //{ password: await User.hashPassword(passw) }
      //);

      // si no lo encuentro o no coincide la contraseña --> error
      if (!usuario) {
        res.json({
          status: 400,
          error: 'No existe ese email en la base de datos',
        });

        return;
      }

      // si existe mandar crear token y el email

      const token = await jwt.sign(
        { _id: usuario._id, email: usuario.email, userName: usuario.user},
        process.env.JWT_SECRET,
        {
          expiresIn: '1s',
        }

      );
      
      


    

      
      const port = 3000;
      
      // Configura nodemailer para enviar correos electrónicos
      
    
      
        // Construye la URL completa con el token
        const fullURL = `http://localhost:${port}/updateUser/${token}`;
        console.log('completa', fullURL)


      // Configura el transporte de correo
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_PASSWORD,    
          pass: process.env.PASSWOR_REMEMBER  
        },
      });

      // Detalles del correo electrónico
      const mailOptions = {
        from: process.env.EMAIL_PASSWORD,
        to: email,
        subject: 'Recuperacion Password',
        text: `Le escribimos de la App Space Jump con su nueva contraseña es :  ${fullURL}`
        //passw,
      };

      // Envía el correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error al enviar el correo:', error);
          res.json({ error:error, msg:'Correo electrónico no enviado' })
        } else {
          console.log('Correo electrónico enviado:', info.response);
          res.json({ status:200, msg:'Correo electrónico enviado correctamente' });

        }
      });
      res.json({ jwt: token, _id: usuario._id, email: usuario.email, userName: usuario.user });

      //usuario = {password:'1111'}

      //   const token = await jwt.sign(
      //     { _id: usuario._id },
      //     process.env.JWT_SECRET,
      //     {
      //       expiresIn: '2d',
      //     }
      //   );

      //   res.json({ jwt: token, userId: usuario._id });
    } catch (err) {
      console.log(err)
      next(err);
    }
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
