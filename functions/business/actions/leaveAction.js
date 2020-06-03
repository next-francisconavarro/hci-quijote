const objectsDao = require('../../dao/objects');
const usersDao = require('../../dao/users');
const mapUtils = require('../../utils/mapUtils');

function leave(agent, userAccount, user, objectName, placeName) {
  console.log('leave -> Leave action execution');

  return objectsDao.deleteObjectByUser(userAccount, user, objectName).then(() => {
    console.log('leave -> Objeto borrado del inventario');
  }).then(() => {
    var objectsByPlace = mapUtils.addValueToKey(user.objectsByPlace, placeName, objectName);
    Object.assign( user, { objectsByPlace: objectsByPlace});
    usersDao.updateUser(userAccount, user);
    agent.add(`Has dejado ${objectName} en el suelo`);
  }).catch(e => {
    console.log(`Leave error -> ${e}`);
    agent.add(`No dispones del objeto ${objectName} del que deseas deshacerte`);
  });
}

module.exports = { leave };
