const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const objectsDao = require('../dao/objects');

function showInventory(request) {
    return agent => {
        const userAccount = contextDao.getUserId(request);
        //TODO: Implementar y usar getUserById en vez de getUsers con child
        return usersDao.getUsers().then(snapShot => {
            const value = snapShot.child(userAccount).val();
            if(value !== null) {
                return objectsDao.getObjectsByUserId(userAccount).then(objects => {
                    if(objects && objects.length) {
                        return agent.add(`Tienes en tu inventario los siguientes objetos: ${objects}`);
                    } else {
                        return agent.add(`No tienes nada en tu inventario`);
                    }
                })
            }
        });
    }
}

module.exports = { showInventory };