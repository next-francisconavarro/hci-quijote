const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const placesDao = require('../dao/places');
const { Image } = require('dialogflow-fulfillment');

function difficulty(request) {
    return async agent => {
        const difficultyLevel = agent.parameters.difficultyLevel;
        const userId = contextDao.getUserId(request);
        const userData = await usersDao.getUserById(userId);
        const preMessage = `Excelente, comenzarás la aventura con dificultad *${difficultyLevel}*.\n`;

        await usersDao.updateUser(userId, Object.assign(userData, {difficultyLevel}));
        // Comenzamos en la biblioteca
        return placesDao.getPlaceById('biblioteca').then(place => {
          if(place) {
            agent.add(new Image(place.media.images[0]));
            return agent.add(`${preMessage}${place.description}`);
          }
        });
    }
}

module.exports = { difficulty };
