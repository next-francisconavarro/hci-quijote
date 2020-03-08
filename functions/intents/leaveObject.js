const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const objectsDao = require('../dao/objects');

function leaveObject(request) {
    return agent => {
      console.log("leaveObject -> Agent Parameters: " + JSON.stringify(agent.parameters));
      const object = agent.parameters.object;
      const userAccount = contextDao.getUserId(request);
      console.log("leaveObject -> Cuenta de usuario: " + userAccount);
      return usersDao.getUserById(userAccount).then(user => {
          if(user) {
            return objectsDao.deleteObjectByUser(userAccount, user, object).then(result => {
              console.log("leaveObject -> Resultado desde deleteObjectByUser: " + result);
              let message = result?`Con sumo pesar dejas caer tu ${object} y se pierde en el infinito ante tus ojos`:`No dispones del objeto ${object} del que deseas deshacerte`;
              agent.add(message);
            });
          }
      });
    }
}

module.exports = { leaveObject };