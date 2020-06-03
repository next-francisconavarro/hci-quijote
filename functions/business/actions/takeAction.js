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
  console.log('take -> Take leaved object action execution');
  let object;
  if (user.objectsByPlace) {
    object = user.objectsByPlace[placeName] || [].filter(o => o.name == objectName)[0];
  }

  return objectsDao.addObject(userAccount, user, object)
    .then(() => agent.add(`Recoges el objeto ${object.name} abandonado en el suelo`))
    .catch(e => {
      console.log(`Take error: ${e}`);
      agent.add(`Ya tienes el objeto ${object.name} en tu inventario`);
    });
}

module.exports = { take, takeLeaved };
