const usersDao = require('../dao/users');

// Reset de partida
function reset(agent, userAccount, userName, endingMessage, reason) {
  console.log(`reset -> ¡${reason}!`);
  let extraMessage;
  switch(reason) {
    case 'hungry':
    case 'death': extraMessage = '¡¡FIN DE LA PARTIDA!!';
      break;
    case 'end': extraMessage = 'CONTINUARÁ...';
      break;
  }

  agent.add(endingMessage + `\n${extraMessage}`);
  const coordinates = { lat: 39.5137458, lng: -3.0046506};
  return usersDao.addUser(userAccount, userName, coordinates);
}

module.exports = { reset };
