// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('./firebase.initializers');//nos permite leer y escribir en la BBDD

// Intent modules
const welcomeIntent = require('./intents/welcome');
const fallbackIntent = require('./intents/fallback');
const rememberUserIntent = require('./intents/rememberUser');
const saveUserIntent = require('./intents/saveUser');
const travelIntent = require('./intents/travel');
const inventoryIntent = require('./intents/inventory');
const rememberVisitedIntent = require('./intents/rememberVisited');
const actionsIntent = require('./intents/actions');

require('./utils/sun');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  //console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  //console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

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
  intentMap.set('Default Welcome Intent', welcomeIntent.welcomeResponse(request));
  intentMap.set('Default Fallback Intent', fallbackIntent.fallback);
  intentMap.set('Recordar el nombre', rememberUserIntent.recoverUserName(request));
  intentMap.set('Guardar mi nombre', saveUserIntent.saveUser(request));
  intentMap.set('viajar', travelIntent.recoverCurrentPlaceStep(request));
  intentMap.set('Inventario', inventoryIntent.showInventory(request));
  intentMap.set('Recordar visitados', rememberVisitedIntent.rememberVisited(request));
  intentMap.set('Acciones', actionsIntent.execute(request))
  agent.handleRequest(intentMap);
});
