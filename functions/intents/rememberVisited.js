const contextDao = require('../dao/context');
const usersDao = require('../dao/users');

function rememberVisited(request) {
    return agent => {
        const userAccount = contextDao.getUserId(request);
        console.log(`rememberVisited -> User account recovered: ${userAccount}`);
        return usersDao.getUserById(userAccount).then(user => {
            if(user) {
              console.log(`rememberVisited -> User recovered: ${JSON.stringify(user)}`);
              const message = user.placesKnown && user.placesKnown.length?`Ya has visitado los siguientes lugares: ${user.placesKnown.join(', ')}`:'No has visitado aún ningún sitio. ¡Acabas de empezar!'
              agent.add(message);
            } else {
              console.log(`rememberVisited -> No user found for account ${userAccount}`);
            }
        }); 
    }
}

module.exports = { rememberVisited };