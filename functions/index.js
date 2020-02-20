// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const admin = require('firebase-admin');//nos permite leer y escribir en la BBDD
const {WebhookClient} = require('dialogflow-fulfillment');
let recoverCurrentPlaceStep;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'ws://quijote-hci-next.firebaseio.com/',
});
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  //console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  //console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcomeResponse(agent) {
    console.log('datos del agent: ',agent);
    console.log('request user: ',JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail));
    console.log('request date: ',JSON.stringify(request.body.originalDetectIntentRequest.payload.data.created));
    agent.add(`Hola aventurero!, no sé si eres un valiente o un inconsciente al saludarme, pero en fin, ya lo descubriremos si estas dispuesto a embarcarte en esta aventura. ¿Quieres comenzar la gesta para convertirte en un ingenioso hidalgo?`);
  }

  function getUserId() {
    const userMail = JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail);
    return userMail.split('@')[0].split('.').join('');
  }

  function getValidDomain() {
    const userMail = JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail);
    return userMail.split('@')[1].split('.')[0];
  }
 
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
        placesKnown: [],
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

  function recoverCurrentPlaceStep(agent) {
    const userAccount = getUserId();
    console.log('usser account: ', userAccount);
    return admin.database().ref('users').once('value').then(snapShot => {
      const value = snapShot.child(userAccount).val();
      console.log('value: ', value);
      if(value !== null) {
        travel(value.room, agent.parameters.place);
      }
    });
  }

  function travel(currentPlace, SelectedPlace) {
    const stepToGo = currentPlace[Object.keys(currentPlace)[0]].step;
    console.log('current place: ', stepToGo, SelectedPlace);
    return admin.database().ref('places').once('value').then(snapShot => {
      const value = snapShot.child(SelectedPlace).val();
      console.log('selected place: ', value);
      if(value !== null) {
        agent.add(`Quieres viajar a ${SelectedPlace}, que esta a ${value.step} pasos. y estas en el paso ${stepToGo}`);
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
