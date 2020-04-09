const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const placesDao = require('../dao/places');
const { Image } = require('dialogflow-fulfillment');

function difficulty(request) {
    return agent => {
        const difficultyLevel = agent.parameters.difficultyLevel;
        const userAccount = contextDao.getUserId(request);
        const preMessage = `Excelente, comenzarás la aventura con dificultad *${difficultyLevel}*.\n`;
        // return usersDao.addUser(userAccount, ).then(() => {
        //   // Comenzamos en la biblioteca
          return placesDao.getPlaceById('biblioteca').then(place => {
            if(place) {
              agent.add(new Image(place.media.images[0]));
              return agent.add(`${preMessage}${place.description}`);
            }
          });
        // });
    }
}

module.exports = { difficulty };
