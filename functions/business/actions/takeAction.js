const objectsDao = require('../../dao/objects');

function take(agent, userAccount, user, objectName) {
  console.log('take -> Take action execution');
  return objectsDao.addObject(userAccount, user, objectName)
    .then(() => agent.add(user.objectsList[objectName].successResponse))
    .catch(e => {
      console.log(`Take error: ${e}`);
        agent.add(chooseTakeErrorMessage(e, currentAction.object.name));
    });
}

function takeLeaved(agent, userAccount, user, objectName, placeName) {
  console.log('takeLeaved -> Take leaved object action execution');

  return objectsDao.addObjectFromFloor(userAccount, user, objectName, placeName)
  .then( () => agent.add(`Recoges el objeto ${objectName} que había quedado olvidado en el suelo de ${placeName}`))
  .catch(e => {
      agent.add(chooseTakeErrorMessage(e, objectName));
    });
}

function chooseTakeErrorMessage(e, objectName) {
  let message;
  console.log(`Take error: ${e}`);
  if (e == 'Object repeated') 
    message = `Ya tienes el objeto ${objectName} en tu inventario`;
  else if (e == 'Object not found')
    message = `No encuentras el objeto ${objectName} por ninguna parte`;
  else if (e == 'Object not allowed')
    message = `Llevas demasiada carga para coger ${objectName}. Dejar ir, es dejar llegar...`;

  return message;
}

module.exports = { take, takeLeaved };
