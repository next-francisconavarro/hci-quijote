// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('./firebase.initializers');//nos permite leer y escribir en la BBDD

// Intent modules
const welcomeIntent = require('./intents/welcome');
const fallbackIntent = require('./intents/fallback');
const rememberUserIntent = require('./intents/rememberUser');
const beginIntent = require('./intents/begin');
const travelIntent = require('./intents/travel');
const inventoryIntent = require('./intents/inventory');
const rememberVisitedIntent = require('./intents/rememberVisited');
const actionsIntent = require('./intents/actions');
const difficultyIntent = require('./intents/difficulty');
const helpIntent = require('./intents/help');

require('./utils/sun');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcomeIntent.welcomeResponse(request));
  intentMap.set('Default Fallback Intent', fallbackIntent.fallback);
  intentMap.set('Recordar el nombre', rememberUserIntent.recoverUserName(request));
  intentMap.set('Guardar mi nombre', beginIntent.beginAdventure(request));
  intentMap.set('Viajar', travelIntent.recoverCurrentPlaceStep(request));
  intentMap.set('Inventario', inventoryIntent.showInventory(request));
  intentMap.set('Recordar visitados', rememberVisitedIntent.rememberVisited(request));
  intentMap.set('Acciones', actionsIntent.execute(request));
  intentMap.set('difficulty', difficultyIntent.difficulty(request))
  intentMap.set('Ayuda', helpIntent.execute(request))
  agent.handleRequest(intentMap);
});
