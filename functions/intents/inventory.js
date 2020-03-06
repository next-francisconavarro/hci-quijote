const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const objectsDao = require('../dao/objects');

function showInventory(request) {
    return agent => {
        const userAccount = contextDao.getUserId(request);

        return usersDao.getUserById(userAccount).then(user => {
            if (user !== null) {
                return objectsDao.getObjectsByUserId(userAccount).then(objects => {
                    if(objects && objects.length) {
                        return agent.add(`Tienes en tu inventario los siguientes objetos: ${objects.join(', ')}`);
                    } else {
                        return agent.add(`No tienes nada en tu inventario`);
                    }
                })
            }
        });
    }
}

module.exports = { showInventory };