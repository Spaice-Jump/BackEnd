const Usuario = require('../models/users.js');
const User = require('../models/users');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
class PasswordController {
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
      

      // si no lo encuentro --> error
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
          expiresIn: '1h',
        }

      );

      const port = 3000;
      
      // Configura nodemailer para enviar correos electrónicos
      
    
      
        // Construye la URL completa con el token
        const server_URL = process.env.SERVER_URL;
        const fullURL = `${server_URL}/recorderPassword/${token}`;
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
        text: `Le escribimos de la App Space Jump para reestablecer la contraseña pinche el siguiente link:  ${fullURL}`
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
      res.json({ jwt: token, _id: usuario._id, email: usuario.email, userName: usuario.user, msg:'Correo electrónico enviado correctamente' });

    } catch (err) {
      console.log(err)
      next(err);
    }
  }
}
module.exports = PasswordController;
