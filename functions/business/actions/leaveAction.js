const objectsDao = require('../../dao/objects');
const usersDao = require('../../dao/users');

function leave(agent, userAccount, user, objectName) {
  console.log('leave -> Leave action execution');
      return objectsDao.deleteObjectByUser(userAccount, user, objectName).then(() => {
        console.log('leave -> Objeto borrado del inventario');
        agent.add(`Has dejado ${objectName} en el suelo`);
        user.objectsList[objectName].currentPlace = Object.keys(user.room)[0];
        usersDao.updateUser(userAccount, user);
      }).catch(e => {
        console.log(`Leave error -> ${e}`);
        agent.add(`No dispones del objeto ${objectName} del que deseas deshacerte`);
      });
}

module.exports = { leave };