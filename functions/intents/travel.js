const contextDao = require('../dao/context');
const placesDao = require('../dao/places');
const usersDao = require('../dao/users');
const arrayUtils = require('../utils/arrayUtils');
const gameOperations = require('../business/gameOperations');
const { Image } = require('dialogflow-fulfillment');

const image = new Image('https://i.imgur.com/weTtlt5.png');

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

function checkPlaceRequirements(placeRequirement, userStatusList) {
    return arrayUtils.isSubset(placeRequirement, userStatusList);
}

function travel(agent, userId, user) {
  const noWhereMessage = 'Nadie ha oido hablar de ese lugar nunca!';
  const selectedPlace = agent.parameters.place;
  const placeName = Object.keys(user.room)[0];
  if(!selectedPlace) {
    return agent.add(noWhereMessage);
  } else if(placeName == selectedPlace) {
    return agent.add('¡Ya estás en este lugar!');
  } else {
    return placesDao.getPlaceById(selectedPlace).then(place => {
        if(place) {
            console.log(`travel -> Selected place: ${JSON.stringify(place)}`)
            const distance = calculateTravelCoeficient(user.room[placeName], place);
            const newPlace = {};
            const currentHungry = user.hungry - distance;
            const withHungry = currentHungry < 10 ? ' y empiezas a estar hambriento, uno es un hidalgo pero aun asi necesita comer.' : '';
            const distanceText = distance > 4 ? '. Ha sido un largo viaje' : '';
            newPlace[`${selectedPlace}`] = place;
            
            let updatedPlaces = user.placesKnown;
            if(!updatedPlaces.includes(selectedPlace)) {
              updatedPlaces.push(selectedPlace);
            }
            
            if (checkPlaceRequirements(place.requirementStatus, user.states)) {
              if(currentHungry > 0) {
                Object.assign( user, { placesKnown: Object.assign(user.placesKnown, updatedPlaces), room: newPlace, hungry: currentHungry });
                usersDao.updateUser(userId, user);
                agent.add(image);
                return agent.add(`${place.description}${distanceText}${withHungry}`);
              } else {
                return gameOperations.reset(agent, userId, user.userName, 
                  'Te encuentras muy débil para seguir caminando. Te detienes y te sientes como una pluma. Tu vista se nubla y caes desmayado en el suelo. Los cuervos, lobos y delincuentes harán el trabajo sucio. Limpiar tus restos', 'hungry');
              }
            } else {
              return agent.add(place.failResponse);
            }
        }
    }).catch(e => {
      console.log(`Error: ${e}`);
      agent.add(noWhereMessage);
    });
  }
}

function calculateTravelCoeficient(origin, destiny) {
    console.log(`calculateTravelCoeficient -> origin: ${JSON.stringify(origin)} - destiny: ${JSON.stringify(destiny)}`);
    return (Math.abs(origin.branch - destiny.branch) * 2) + (Math.abs(origin.step - destiny.step)) * 2;
}

module.exports = { recoverCurrentPlaceStep };
