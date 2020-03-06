function welcomeResponse(request) {
    return agent => {
        console.log('datos del agent: ',agent);
        console.log('request payload: ',JSON.stringify(request.body.originalDetectIntentRequest.payload));
        console.log('request user: ',JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail));
        console.log('request date: ',JSON.stringify(request.body.originalDetectIntentRequest.payload.data.created));
        
        agent.add(`Hola aventurero!, no sé si eres un valiente o un inconsciente al saludarme, pero en fin, ya lo descubriremos si estas dispuesto a embarcarte en esta aventura. ¿Quieres comenzar la gesta para convertirte en un ingenioso hidalgo?`);
    };
}

module.exports = { welcomeResponse };