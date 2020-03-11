const NO_USER = 'nouser';

function getUserId({ body = {} }) {
    console.log(`getUserId -> Request body: ${JSON.stringify(body)}`);
    const userMail = body.originalDetectIntentRequest &&
      body.originalDetectIntentRequest.payload &&
      body.originalDetectIntentRequest.payload.data &&
      body.originalDetectIntentRequest.payload.data.data &&
      body.originalDetectIntentRequest.payload.data.data.personEmail || NO_USER;
    return userMail.replace(/\.|@.*/g, '');
}

/*function getValidDomain() {
    const userMail = JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail);
    return userMail.split('@')[1].split('.')[0];
}*/

module.exports = { getUserId };