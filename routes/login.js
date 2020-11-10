var express = require('express');
const { checkToken } = require('../middleware');
var  info = require('../controllers/info');
var router = express.Router();
let jwt = require( 'jsonwebtoken' );
let config = require( '../config' );

/* GET home page. */


 router.post('/',function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    info.getInfo(username, (inf)=>{
    let infos = inf;
     
    // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
   
    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if( username && password && infos ) {

      // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
      // de lo contrario, un mensaje de error es retornado
      if( password === infos.pass ) {
        
        // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
        let token = jwt.sign( { username: username },
          config.secret, { expiresIn: '24h' } );
        info.updateInfo(username,token,(result)=>{
        // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
        return res.json( {
          success: true,
          message: 'Authentication successful!',
          token: token
        } );
    });
      } else {
        
        // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
        return res.send( 403 ).json( {
          success: false,
          message: 'Incorrect username or password'
        } );

      }

    } else {

      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      return res.send( 400 ).json( {
        success: false,
        message: 'Authentication failed! Please check the request'
      } );

    }
}); 
});

/*router.get('/',checkToken,HandlerGenerator.index);
*/

module.exports = router;
