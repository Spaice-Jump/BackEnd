const Usuario = require('../models/users.js');
const User = require('../models/users');
const nodemailer = require('nodemailer');

function generateRandomPassword(length = 12) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}

const randomPassword = generateRandomPassword();
console.log(randomPassword);

class PasswordController {
  index(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('password');
  }
  async putAPI(req, res, next) {
    try {
      const { email } = req.body;

      // buscar el usuario en la BD
      //const usuario = await Usuario.findOne({ email: email });
      const passw = generateRandomPassword();
      const usuario = await Usuario.findOneAndUpdate(
        { email: email },
        { password: await User.hashPassword(passw) }
      );

      // si no lo encuentro o no coincide la contraseña --> error
      if (!usuario) {
        res.json({
          status: 400,
          error: 'No existe ese email en la base de datos',
        });

        return;
      }

      // si existe mandar el email

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
        from: 'spacejumpkeepcoding@gmail.com',
        to: email,
        subject: 'Recuperacion Password',
        text: `Le escribimos de la App Space Jump con su nueva contraseña es :  ${passw}`
        //passw,
      };

      // Envía el correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error al enviar el correo:', error);
        } else {
          console.log('Correo electrónico enviado:', info.response);
        }
      });

      //usuario = {password:'1111'}
      res.json({ password: usuario.password, pass: passw });

      //   const token = await jwt.sign(
      //     { _id: usuario._id },
      //     process.env.JWT_SECRET,
      //     {
      //       expiresIn: '2d',
      //     }
      //   );

      //   res.json({ jwt: token, userId: usuario._id });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PasswordController;
