const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const objectsDao = require('../dao/objects');

function leaveObject(agent, request) {
    console.log('leaveObject -> Agent Parameters: ' + JSON.stringify(agent.parameters));
    const action = agent.parameters.action;
    const object = agent.parameters.object[0];
    const userAccount = contextDao.getUserId(request);
    console.log('leaveObject -> Cuenta de usuario: ' + userAccount);
    return usersDao.getUserById(userAccount).then(user => {
        if(user) {
          return objectsDao.deleteObjectByUser(userAccount, user, object).then(result => {
            console.log(`leaveObject -> Resultado desde deleteObjectByUser: ${result}`);
            // `Con sumo pesar dejas caer tu ${object} y se pierde en el infinito ante tus ojos`
            return agent.add(`Has ${action} ${object}`);
          }).catch(e => {
            console.log(`leaveObject error -> ${e}`);
            return agent.add(`No dispones del objeto ${object} del que deseas deshacerte`);
          });
        }
    });
}

module.exports = { leaveObject };