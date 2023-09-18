const Usuario = require('../models/users.js');
const nodemailer = require('nodemailer');
const SendEmail = require('../models/sendEmail')


class SendEmailContact {

    async sendEmail(req, res, next) {
        try {
          const data = req.body;
          console.log('email', data.user)
    
          // buscar el usuario en la BD
          const usuario = await Usuario.findOne({ user: data.user });
          console.log('use',usuario)
          
    
          // si no lo encuentro --> error
          if (!usuario) {
            res.json({
              status: 400,
              error: 'No existe ese usuario en la base de datos',
            });
    
            return;
          }
    
          // si existe mandar el email
    
          
    
          const port = 3000;
          
          // Configura nodemailer para enviar correos electrónicos
          
        
          
            // Construye la URL completa con el token
           
            const subject =`Contacto Viaje solicitado`
            const text = process.env.TEXT_PASSWORD
    
            //envio email
    
            SendEmail(email, subject, text, fullURL)
    
          res.json({status: 'ok', msg:'Correo electrónico enviado correctamente' });
    
        } catch (err) {
          console.log(err)
          next(err);
        }
      }
    }
    module.exports = SendEmailContact;

