const contextDao = require('../dao/context');
const placesDao = require('../dao/places');
const usersDao = require('../dao/users');

function recoverCurrentPlaceStep(request) {
    return agent => {
      console.log(`recoverCurrentPlaceStep -> ${JSON.stringify(agent.parameters)}`);
      const userAccount = contextDao.getUserId(request);
      return usersDao.getUserById(userAccount).then(user => {
          if(user) {
              return travel(agent, userAccount, user);
          }
      });
    }
}

function travel(agent, userId, user) {
  const selectedPlace = agent.parameters.place;
  const placeName = Object.keys(user.room)[0];
  return placesDao.getPlaceById(selectedPlace).then(place => {
      if(place) {
          const distance = calculateTravelCoeficient(user.room[placeName], place[selectedPlace]);
          const newPlace = {};
          const withHungry = user.hungry - distance < 10 ? 'y empiezas a estar hambriento, uno es un hidalgo pero aun asi necesita comer.' : '';
          newPlace[`${selectedPlace}`] = place;
          Object.assign( user, { placesKnown: Object.assign(user.placesKnown, { [`${selectedPlace}`]: true }), room: newPlace, hungry: user.hungry - distance });
          usersDao.updateUser(userId, user);
          return agent.add(`Has llegado a ${selectedPlace} desde ${placeName}, has recorrido una distancia de ${distance} ${withHungry}`);
      }
  }).catch( e => {
      console.log(`error: ${e}`);
      return agent.add('Nadie ha oido hablar de ese lugar nunca!');
  });
}

function calculateTravelCoeficient(origin, destiny) {
    return (Math.abs(origin.branch - destiny.branch) * 2) + (Math.abs(origin.step - destiny.step)) * 2;
}

module.exports = { recoverCurrentPlaceStep };