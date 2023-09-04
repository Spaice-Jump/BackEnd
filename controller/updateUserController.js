const Usuario = require('../models/users.js');
const User = require('../models/users');
const res = require('express/lib/response');

class UpdateUserController {
  async updateUser(req, res, next) {
    try {
      const { email, password, user } = req.body;
      console.log('pass', password);
      console.log('ema', email);
      console.log('user', user);

      // buscar el usuario en la BD
      //const usuario = await Usuario.findOne({ email: email });
      let usuario = await Usuario.findOne({ email: email });
      const repetidoUser = await Usuario.findOne({ user: user });
      if (user === repetidoUser?.user && email !== repetidoUser?.email) {
        res.json({ status: 400, error: 'Usuario repetido' });
        return;
      } else {
        if (!!password) {
            console.log('passwortrue', !!password)
          usuario = await Usuario.findOneAndUpdate(
            { email: email },
            { password: await User.hashPassword(password), user: user }
          );

          // si no lo encuentro o no coincide la contraseña --> error
          if (!usuario) {
            console.log('usuariofalse', !password)
            res.json({
              status: 400,
              error: 'No existe ese email en la base de datos',
            });

            return;
          }
        } else {
          console.log('no existe pass');
          usuario = await Usuario.findOneAndUpdate(
            { email: email },
            { user: user }
          );
          if (!usuario) {
            res.json({
              status: 400,
              error: 'No existe ese email en la base de datos',
            });

            return;
          }
        }
    }
    usuario = await Usuario.findOne({ email: email });
    res.json({
      status: 200,
      msg: 'Datos actualizados correctamente',
      userName: usuario.user,
    });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UpdateUserController;
