const objectsDao = require('../../dao/objects');

function take(agent, userAccount, user, currentAction) {
  console.log('take -> Take action execution');
  return objectsDao.addObject(userAccount, user, currentAction.object)
    .then(() => agent.add(currentAction.successResponse))
    .catch(e => {
      console.log(`Take error: ${e}`);
      agent.add(`Ya tienes el objeto ${currentAction.object.name} en tu inventario`);
    });
}

function takeLeaved(agent, userAccount, user, objectName, placeName) {
  console.log('takeLeaved -> Take leaved object action execution');

  return objectsDao.addObjectFromFloor(userAccount, user, objectName, placeName)
  .then( () => agent.add(`Recoges el objeto ${objectName} que había quedado olvidado en el suelo de ${placeName}`))
  .catch(e => {
      console.log(`Take error: ${e}`);
      if (e == 'Object repeated') 
        agent.add(`Ya tienes el objeto ${objectName} en tu inventario`);
      else if (e == 'Object not found')
        agent.add(`No encuentras el objeto ${objectName} por ninguna parte`);
    });
}

module.exports = { take, takeLeaved };
