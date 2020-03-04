const {WebhookClient} = require('dialogflow-fulfillment');
const {WebhookMock} = require('../tests/utils/mocks');

const isTest =  process.argv.join('').match('jest');

module.exports = {
  WebhookClient: isTest ? WebhookMock : WebhookClient
};
