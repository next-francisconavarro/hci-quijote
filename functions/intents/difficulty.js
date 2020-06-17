const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const placesDao = require('../dao/places');
const { Image } = require('dialogflow-fulfillment');
const { textByDifficulty } = require('../utils/difficultyUtils');

function difficulty(request) {
    return async agent => {
        const difficultyLevel = agent.parameters.difficultyLevel;
        const userId = contextDao.getUserId(request);
        const userData = await usersDao.getUserById(userId);
        const preMessage = `Excelente, comenzarás la aventura con dificultad *${difficultyLevel}*.\n`;

        let maxCapacity = 0;
        switch(difficultyLevel) {
          case 'facil': maxCapacity = 9999999;
            break;
          case 'medio': maxCapacity = 100;
            break;
          case 'dificil': maxCapacity = 50;
            break;
        }

        await usersDao.updateUser(userId, Object.assign(userData, { difficulty: { level: difficultyLevel, maxCapacity: maxCapacity }}));
        // Comenzamos en la biblioteca
        return placesDao.getPlaceById('biblioteca').then(place => {
          if(place) {
            agent.add(new Image(place.media.images[0]));
            return agent.add(`${preMessage}${textByDifficulty(place.description, { difficultyLevel })}`);
          }
        });
    }
}

module.exports = { difficulty };
