// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient, admin} = require('./firebase.initializers');//nos permite leer y escribir en la BBDD

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  //console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  //console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcomeResponse(agent) {
    console.log('request payload: ', JSON.stringify(request.body.originalDetectIntentRequest.payload));
    console.log('request user: ',JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail));
    console.log('request date: ',JSON.stringify(request.body.originalDetectIntentRequest.payload.data.created));
    agent.add(`Hola aventurero!, no sé si eres un valiente o un inconsciente al saludarme, pero en fin, ya lo descubriremos si estas dispuesto a embarcarte en esta aventura. ¿Quieres comenzar la gesta para convertirte en un ingenioso hidalgo?`);
  }

  function getUserId() {
    const userMail = JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail);
    return userMail.split('@')[0].split('.').join('');
  }

  /*function getValidDomain() {
    const userMail = JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail);
    return userMail.split('@')[1].split('.')[0];
  }*/
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  function recoverUserName(agent) {
    const userAccount = getUserId();
    return admin.database().ref('users').once('value').then(snapShot => {
      const value = snapShot.child(userAccount).val();
        if(value !== null) {
          agent.add(`Que memoria la tuya, tu nombre es ${value.userName}`);
        }
    });
  }

  function saveUserName(agent) {
    const userName = agent.parameters.user;
    const userAccount = getUserId();
    agent.add(`Excelente nombre, ${userName}`);
    return admin.database().ref('users').set({
     [userAccount]: {
        room: { 'biblioteca': { step: 0, branch: 0 }},
        placesKnown:{ 'biblioteca': true },
        stairsReviewed: false,
        stair: false,
        apple: false,
        bread: false,
        sword: false,
        armor: false,
        mainDoorKey: false,
        candle: false,
        mushroom: false,
        vine: false,
        hammer: false,
        stone: false,
        rake: false,
        hungry: 100,
        userName: userName
      } 
    });
  }

  function updateUser(userId, newData) {
    return admin.database().ref('users').update({
      [userId]: newData
     });
  }

  function calculateTravelCoeficient(origin, destiny) {
    return (Math.abs(origin.branch - destiny.branch) * 2) + (Math.abs(origin.step - destiny.step)) * 2;
  }

  function travel(userData, SelectedPlace, userId) {
    const placeName = Object.keys(userData.room)[0];
    return admin.database().ref('places').once('value').then(snapShot => {
      const value = snapShot.child(SelectedPlace).val();
      if(value !== null) {
        const distance = calculateTravelCoeficient(userData.room[placeName], value);
        const newPlace = {};
        const conHambre = userData.hungry - distance < 10 ? ' y empiezas a estar hambriento, uno es un hidalgo pero aun asi necesita comer.' : '';
        newPlace[`${SelectedPlace}`] = value;
        Object.assign( userData, { placesKnown: Object.assign(userData.placesKnown, { [`${SelectedPlace}`]: true }), room: newPlace, hungry: userData.hungry - distance });
        updateUser(userId, userData);
        return agent.add(`Has llegado a ${SelectedPlace} desde ${placeName}, has recorrido una distancia de ${distance} ${conHambre}`);
      }
    }).catch( e => {
      console.log('error: ', e);
      return agent.add(`Nadie ha oido hablar de ese lugar nunca!`);
    });
  }

  function recoverCurrentPlaceStep(agent) {
    const userAccount = getUserId();
    return admin.database().ref('users').once('value').then(snapShot => {
      const value = snapShot.child(userAccount).val();
      if(value !== null) {
        return travel(value, agent.parameters.place, userAccount);
      }
    });
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcomeResponse);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Recordar el nombre', recoverUserName);
  intentMap.set('Guardar mi nombre', saveUserName);
  intentMap.set('viajar', recoverCurrentPlaceStep);
  agent.handleRequest(intentMap);
});
