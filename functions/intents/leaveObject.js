const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const objectsDao = require('../dao/objects');

function leaveObject(request) {
    return agent => {
        const object = agent.parameters.object;
        const userAccount = contextDao.getUserId(request);
        return usersDao.getUserById(userAccount).then(user => {
            if(user) {
              objectsDao.deleteObjectByUser(userAccount, user, object).then(result => {
                let message = result?`Con sumo pesar dejas caer tu ${object} y se pierde en el infinito ante tus ojos`:`No dispones del objeto ${object} del que deseas deshacerte`;
                agent.add(message);
              });
            }
        });
    }
}

module.exports = { leaveObject };