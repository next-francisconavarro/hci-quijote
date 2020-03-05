function getUserId(request) {
    const userMail = JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail);
    return userMail.split('@')[0].split('.').join('');
}

/*function getValidDomain() {
    const userMail = JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail);
    return userMail.split('@')[1].split('.')[0];
}*/

module.exports = { getUserId };