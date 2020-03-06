const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const placesDao = require('../dao/places');

function rememberVisited(request) {
    return agent => {
        const userAccount = contextDao.getUserId(request);
        //TODO: Implementar y usar getUserById en vez de getUsers con child
        return usersDao.getUsers().then(snapShot => {
            const value = snapShot.child(userAccount).val();
            if(value !== null) {
                return placesDao.getPlacesByUserId(userAccount).then(places => {
                    if(places && places.length) {
                        return agent.add(`Ya has visitado los siguientes lugares: ${places}`);
                    } else {
                        return agent.add(`No has visitado aún a ningún sitio. ¡Acabas de empezar!`);
                    }
                })
            }
        });
    }
}

module.exports = { rememberVisited };