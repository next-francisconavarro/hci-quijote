const objectsDao = require('../../dao/objects');

function leave(agent, userAccount, user, object) {
  console.log('leave -> Leave action execution');
      return objectsDao.deleteObjectByUser(userAccount, user, object).then(() => {
        console.log('leave -> Objeto borrado del inventario');
        agent.add(`Has dejado ${object} en el suelo`);
      }).catch(e => {
        console.log(`Leave error -> ${e}`);
        agent.add(`No dispones del objeto ${object} del que deseas deshacerte`);
      });
}

module.exports = { leave };