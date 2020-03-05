const request = require('supertest');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const myFirebaseFunctions = require('../../functions/index.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(myFirebaseFunctions.dialogflowFirebaseFulfillment);

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

module.exports = (payload) => request(app)
  .post('/')
  .send(payload)
  .accept('json');