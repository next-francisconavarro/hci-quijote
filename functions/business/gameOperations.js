const usersDao = require('../dao/users');
const { Image } = require('dialogflow-fulfillment');

// Reset de partida
function reset(agent, userAccount, userName, endingMessage, reason) {
  switch(reason) {
    case 'hungry':
    case 'death': death(agent, endingMessage, userAccount);
      break;
    case 'end': end(agent, endingMessage, userAccount, userName);
      break;
  }

  
}

function end(agent, endingMessage, userAccount, userName) {
  agent.add(endingMessage + `\nCONTINUARÁ...`);
  const coordinates = { lat: 39.5137458, lng: -3.0046506};
  return usersDao.addUser(userAccount, userName, coordinates);
}

function death(agent, endingMessage, userAccount) {
  agent.add(endingMessage);

agent.add(new Image(images[0]));
  agent.add('\nSi deseas iniciar una *nueva partida*, di *REINICIAR*');
  console.log(userAccount);
}

module.exports = { reset };
