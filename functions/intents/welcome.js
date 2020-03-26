const emptyPayload = {
  data: {
    personEmail: 'nouser'
  }
};

function welcomeResponse({ body = {} }) {
    return agent => {
        const payload = getPayload(body);
        console.log('datos del agent: ', agent);
        console.log('request payload data: ', JSON.stringify(payload));
        console.log('request user: ', JSON.stringify(payload.event.user));
        console.log('request date: ', JSON.stringify(payload.event_time));

        // TODO: Conseguir que pida los permisos 
        // app.askForPermission('para localizarte', app.SupportedPermissions.DEVICE_PRECISE_LOCATION);
        
        agent.add('Hola aventurero!, no sé si eres un valiente o un inconsciente al saludarme, pero en fin, ya lo descubriremos si estas dispuesto a embarcarte en esta aventura. ¿Quieres comenzar la gesta para convertirte en un ingenioso hidalgo?');
    };
}

function getPayload(body) {
  return body.originalDetectIntentRequest &&
    body.originalDetectIntentRequest.payload && 
    body.originalDetectIntentRequest.payload.data || emptyPayload;
}

module.exports = { welcomeResponse };