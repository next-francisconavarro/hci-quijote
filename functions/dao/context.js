const NO_USER = 'nouser';

function getUserId({ body = {} }) {
  const payload = body.originalDetectIntentRequest && body.originalDetectIntentRequest.payload;

  console.log(`getUserId -> Request payload data: ${JSON.stringify(payload)}`);

  const userMail = payload &&
    payload.data &&
    payload.data.data &&
    payload.data.data.personEmail;
  
  if (userMail) {
    return userMail.replace(/\.|@.*/g, '');
  }
  
  return payload && 
    payload.data && 
    payload.data.event &&
    payload.data.event.user || NO_USER;
}

/*function getValidDomain() {
    const userMail = JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail);
    return userMail.split('@')[1].split('.')[0];
}*/

module.exports = { getUserId };