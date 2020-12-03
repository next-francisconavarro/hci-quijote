const objectsDao = require('../../dao/objects');

function take(agent, userAccount, user, objectName) {
  console.log('take -> Take action execution');
  return objectsDao.addObject(userAccount, user, objectName)
    .then(() => agent.add(user.objectsList[objectName].successResponse))
    .catch(e => {
      console.log(`Take error: ${e}`);
      if (e === 'repeated') {
        agent.add(`Ya tienes el objeto ${objectName} en tu inventario`);
      } else {
        agent.add(e);
      }
    });
}

module.exports = { take };