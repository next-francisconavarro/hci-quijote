const contextDao = require('../dao/context');
const placesDao = require('../dao/places');
const usersDao = require('../dao/users');
const arrayUtils = require('../utils/arrayUtils');

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

function checkPlaceRequirements(userStatusList, placeRequirement) {
  if(placeRequirement) {
    return arrayUtils.isSubset(placeRequirement, userStatusList)
  }
  else return false;
}

function travel(agent, userId, user) {
  const selectedPlace = agent.parameters.place;
  const placeName = Object.keys(user.room)[0];
  if(placeName == selectedPlace) {
    return agent.add('¡Ya estás en este lugar!');
  } else {
    return placesDao.getPlaceById(selectedPlace).then(place => {
        if(place) {
            console.log(`travel -> Selected place: ${JSON.stringify(place)}`)
            const distance = calculateTravelCoeficient(user.room[placeName], place);
            const newPlace = {};
            const withHungry = user.hungry - distance < 10 ? ' y empiezas a estar hambriento, uno es un hidalgo pero aun asi necesita comer.' : '';
            const distanceText = distance > 4 ? '. Ha sido un largo viaje' : '';
            newPlace[`${selectedPlace}`] = place;
            
            let updatedPlaces = user.placesKnown;
            if(!updatedPlaces.includes(selectedPlace)) {
              updatedPlaces.push(selectedPlace);
            }
            
            if (checkPlaceRequirements(user.status, place.requirementStatus)) {
              Object.assign( user, { placesKnown: Object.assign(user.placesKnown, updatedPlaces), room: newPlace, hungry: user.hungry - distance });
              usersDao.updateUser(userId, user);
              return agent.add(`${place.description}${distanceText}${withHungry}`);
            } else {
              return agent.add(`no puedes ir a ${selectedPlace}, hay cosas que debes hacer antes.`);
            }
        }
    }).catch( e => {
        console.log(`error: ${e}`);
        return agent.add('Nadie ha oido hablar de ese lugar nunca!');
    });
  }
}

function calculateTravelCoeficient(origin, destiny) {
    console.log(`calculateTravelCoeficient -> origin: ${JSON.stringify(origin)} - destiny: ${JSON.stringify(destiny)}`);
    return (Math.abs(origin.branch - destiny.branch) * 2) + (Math.abs(origin.step - destiny.step)) * 2;
}

module.exports = { recoverCurrentPlaceStep };