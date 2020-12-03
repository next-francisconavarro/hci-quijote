const objectsDao = require('../../dao/objects');

function take(agent, userAccount, user, currentAction) {
  console.log('take -> Take action execution');
  return objectsDao.addObject(userAccount, user, currentAction.object)
    .then(() => agent.add(currentAction.successResponse))
    .catch(e => {
      console.log(`Take error: ${e}`);
      if (e === 'repeated') {
        agent.add(`Ya tienes el objeto ${currentAction.object.name} en tu inventario`);
      } else {
        agent.add(e);
      }
    });
}

module.exports = { take };