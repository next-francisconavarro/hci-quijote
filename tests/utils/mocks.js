const sinon = require('sinon');

const WebhookMock = class {
  constructor({ request, response }) {
    this.req = request;
    this.res = response;
    this.req.body.originalDetectIntentRequest = originalDetectIntentRequest
    this.intent = this.req.body.intent;
    this.parameters = {};
    this.output = [];
  }

  add() {
    this.output.push(...arguments);
  }

  handleRequest(intentMap) {
    const intentFn = intentMap.get(this.intent);
    this.res.json(intentFn(this));
    this.res.json(this.output);
    this.res.send(200);
  }
}

// WebhookMock.prototype.add = sinon.stub();

const originalDetectIntentRequest = {
  payload: {
    "source": "spark",
    "data": {
      "created": "2020-02-09T21:44:41.649Z",
      "ownedBy": "creator",
      "status": "active",
      "targetUrl": "https://bots.api.ai/spark/aaaeb48e-79cd-4f47-858a-ae4a49c65c14/webhook",
      "resource": "messages",
      "orgId": "Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi8wZmUyMzhjMC1jOTRhLTQ0NDYtYWI0OC0xOTMyYWJjZjYwZjk",
      "name": "webhhokaaaeb48e-79cd-4f47-858a-ae4a49c65c14",
      "event": "created",
      "id": "Y2lzY29zcGFyazovL3VzL1dFQkhPT0svYWM1MGU2YjAtMTkxZS00NjVjLWEwZjUtYjVmY2M5MDExNmMz",
      "createdBy": "Y2lzY29zcGFyazovL3VzL1BFT1BMRS82MDUwMDMwMy1hZTBiLTQ5NjItYTUzOC02MWMzNjZjOWZmNDA",
      "data": {
        "personId": "Y2lzY29zcGFyazovL3VzL1BFT1BMRS9iYTA2Zjc1NC01MjQzLTQ2ODEtYWI5Mi0wYWYyZjhhOGNlMTA",
        "personEmail": "victormanuel.puebla.next@bbva.com",
        "roomId": "Y2lzY29zcGFyazovL3VzL1JPT00vNjdjZjFmOGEtZmVhOS0zZmUwLWFhM2ItNDZhNzZjNmFhNjI1",
        "id": "Y2lzY29zcGFyazovL3VzL01FU1NBR0UvMWNkNGJmODAtNTZkYy0xMWVhLTk4NmUtNzU1ZTZjZDk2MDE3",
        "roomType": "direct",
        "created": "2020-02-24T08:03:16.472Z"
      },
      "actorId": "Y2lzY29zcGFyazovL3VzL1BFT1BMRS9iYTA2Zjc1NC01MjQzLTQ2ODEtYWI5Mi0wYWYyZjhhOGNlMTA",
      "appId": "Y2lzY29zcGFyazovL3VzL0FQUExJQ0FUSU9OL0MzMmM4MDc3NDBjNmU3ZGYxMWRhZjE2ZjIyOGRmNjI4YmJjYTQ5YmE1MmZlY2JiMmM3ZDUxNWNiNGEwY2M5MWFh"
    }
  }

};


module.exports = {
  WebhookMock
};