const request = require('supertest');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const myFirebaseFunctions = require('../functions/index.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(myFirebaseFunctions.dialogflowFirebaseFulfillment);

test("assistant does not crash", () => {

    return request(app)
      .post('/')
      .send({
        intent: 'Default Welcome Intent',
        payload: {
          user: 'Foo Bar'
        }
      })
      .accept('json')
      .then((response) => {
        expect(response.status).toBe(200);
      });
})
