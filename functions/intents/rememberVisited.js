const placesDao = require('../dao/places');
const usersDao = require('../dao/users');

function rememberVisited(agent, request) {
    const userAccount = usersDao.getUserId(request);
    //TODO: Implementar y usar getUserById en vez de getUsers con child
    return usersDao.getUsers().then(snapShot => {
        const value = snapShot.child(userAccount).val();
        if(value !== null) {
            return placesDao.getPlacesByUserId(userAccount).then(places => {
                if(places && places.length) {
                    return agent.add(`Ya has visitado los siguientes lugares: ${places}`);
                } else {
                    return agent.add(`No has visitado aún ningún sitio. ¡Acabas de empezar!`);
                }
            })
        }
    });
}

module.exports = { rememberVisited };