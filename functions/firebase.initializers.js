const admin = require('firebase-admin');//nos permite leer y escribir en la BBDD
const {WebhookClient} = require('dialogflow-fulfillment');
const {WebhookMock} = require('./tests/utils/mocks');

const isTest =  process.argv.join('').match('jest');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'ws://quijote-hci-next.firebaseio.com/',
});

module.exports = {
  admin,
  WebhookClient: isTest ? WebhookMock : WebhookClient
};
