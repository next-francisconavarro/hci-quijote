const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const placesDao = require('../dao/places');

function beginAdventure(request) {
    return agent => {
        const userName = agent.parameters.user;
        const userAccount = contextDao.getUserId(request);
        const coordinates = { lat: 39.5137458, lng: -3.0046506};
        const preMessage = `Excelente nombre, ${userName}. Comencemos pues la aventura...\n`;
        return usersDao.addUser(userAccount, userName, coordinates).then(() => {
          // Comenzamos en la biblioteca
          return placesDao.getPlaceById('biblioteca').then(place => {
            if(place) {
              return agent.add(`${preMessage}${place.description}`);
            }
          });
        });
    }
}

module.exports = { beginAdventure };