const usersDao = require('../dao/users');
const objectsDao = require('../dao/objects');

function leaveObject(request) {
    agent => {
        const object = agent.parameters.object;
        const userAccount = usersDao.getUserId(request);
        //TODO: Implementar y usar getUserById en vez de getUsers con child
        return usersDao.getUsers().then(snapShot => {
            const value = snapShot.child(userAccount).val();
            if(value !== null) {
                objectsDao.deleteObjectByUserId(userAccount, object);
                agent.add(`Con sumo pesar dejas caer tu ${object} y se pierde en el infinito ante tus ojos`);
            }
        });
    }
}

module.exports = { leaveObject };