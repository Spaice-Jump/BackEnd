const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

class deleteUserController {
    index(req, res, next) {
      res.locals.error = '';
      res.locals.email = '';
      res.render('delete');
    }
  
    // borrar post desde el API
    async postAPI(req, res, next) {
      try {
        console.log('body',req.body)
        const { email, password } = req.body;

        console.log('controller',email)

        if (email.indexOf('@') === -1) {
            res.json({ status: 400, message : "Email is not valid"  }); 
            return
          }
  
        // buscar el usuario en la BD
        const usuario = await Usuario.findOne({ email: email });
  
        // si no lo encuentro o no coincide la contraseña --> error
        if (!usuario || !(await usuario.comparePassword(password))) {
          
          res.json({ status: 400, error: 'invalid credentials' });
  
          return;
        }
  
        // si existe y la contrseña coincide
        // Borrar el usuario 
       
        
        res.json({ jwt: token, userId: usuario._id });
  
      } catch (err) {
        next(err);
      }
    }
  }
  
  module.exports = deleteUserController;
  