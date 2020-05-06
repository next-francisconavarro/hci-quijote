const contextDao = require('../dao/context');

function welcomeResponse({ body = {}}) {
    return agent => {
      console.log('datos del agent: ', agent);
      console.log('request user: ', contextDao.getUserId(body));

      // TODO: Conseguir que pida los permisos 
      // app.askForPermission('para localizarte', app.SupportedPermissions.DEVICE_PRECISE_LOCATION);
      
      agent.add('Hola aventurero!, no sé si eres un valiente o un inconsciente al saludarme, pero en fin, ya lo descubriremos si estas dispuesto a embarcarte en esta aventura. ¿Quieres comenzar la gesta para convertirte en un ingenioso hidalgo?');

      return Promise.resolve();
    };
}

module.exports = { welcomeResponse };
