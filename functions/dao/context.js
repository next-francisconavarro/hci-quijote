function getUserId(request) {
    console.log("getUserId -> " + request.payload);
    const userMail = request.body.originalDetectIntentRequest.payload.data.data.personEmail;
    return userMail.split('@')[0].split('.').join(''); // userMail.replace('.|@.*', '');
}

/*function getValidDomain() {
    const userMail = JSON.stringify(request.body.originalDetectIntentRequest.payload.data.data.personEmail);
    return userMail.split('@')[1].split('.')[0];
}*/

module.exports = { getUserId };