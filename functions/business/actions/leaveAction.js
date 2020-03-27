const objectsDao = require('../../dao/objects');

function leave(agent, userAccount, user, objectName) {
  console.log('leave -> Leave action execution');
      return objectsDao.deleteObjectByUser(userAccount, user, objectName).then(() => {
        console.log('leave -> Objeto borrado del inventario');
        agent.add(`Has dejado ${objectName} en el suelo`);
      }).catch(e => {
        console.log(`Leave error -> ${e}`);
        agent.add(`No dispones del objeto ${objectName} del que deseas deshacerte`);
      });
}

module.exports = { leave };