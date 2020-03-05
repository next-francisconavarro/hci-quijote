const request = require('supertest');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const {admin} = require('../../firebase.initializers');


const myFirebaseFunctions = require('../../index.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(myFirebaseFunctions.dialogflowFirebaseFulfillment);

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(admin.database(), 'ref').mockImplementation(() => ({
      set: jest.fn().mockImplementation(() => Promise.resolve()),
      once: jest.fn()
  }));
});

module.exports = payload => request(app)
  .post('/')
  .send(payload)
  .accept('json');
