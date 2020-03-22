const objectsDao = require('../dao/objects');
const placesDao = require('../dao/places');
const usersDao = require('../dao/users');
const statesDao = require('../dao/states');
const contextDao = require('../dao/context');
const arrayUtils = require('../utils/arrayUtils');

const everyWhereActions = ['tirar'];
const genericFailResponse = 'Eso no se puede hacer aqui';

function execute(request) {
  return agent => {
    console.log('execute -> Agent Parameters: ' + JSON.stringify(agent.parameters));
    const action = agent.parameters.action;
    const object = agent.parameters.object;
    const userAccount = contextDao.getUserId(request);
    console.log(`execute -> Cuenta de usuario: ${userAccount}, action: ${action}, object: ${object}`);

    return usersDao.getUserById(userAccount).then(user => {
      const placeName = Object.keys(user.room)[0];
      console.log(`execute -> current place name: ${placeName}`);
      return placesDao.getPlaceById(placeName).then(currentPlace => {
        console.log(`execute -> current place value: ${JSON.stringify(currentPlace)}`);
        if(currentPlace) {
          if(everyWhereActions.includes(action)) {
            return everyWhereActionsTreatment(agent, userAccount, user, action, object);
          } else {
            return contextActionsTreatment(agent, userAccount, user, currentPlace, action, object);
          }
        }
      });
    });
  }
}

function contextActionsTreatment(agent,userAccount,user,place,action,object) {
  console.log(`contextActionsTreatment -> Searching action: ${action} and object: ${object} on list: ${place.actions}`)
  let currentAction = place.actions.find(actionObj => actionObj.action == action && actionObj.object == object);
  console.log(`contextActionsTreatment -> currentAction: ${JSON.stringify(currentAction)}`);
  let allowedAction = currentAction !== undefined;
  let requirementsOk;

  if(allowedAction) {
    console.log('contextActionsTreatment -> action allowed!')
    requirementsOk = arrayUtils.isSubset(currentAction.requirementObject, user.objects) &&
      arrayUtils.isSubset(currentAction.requirementStatus, user.states);
  }

  let message;
  let death = false;
  if(!allowedAction) {
    console.log('contextActionsTreatment -> forbidden action!')
    message = genericFailResponse;
  } else if(!requirementsOk) {
    console.log('contextActionsTreatment -> requirements not met')
    message = currentAction.failResponse;
    death = currentAction.death;
  } else {
    console.log('contextActionsTreatment -> requirements are met')
    switch(action) {
      case 'coger': console.log('contextActionsTreatment -> Take action execution');
        return objectsDao.addObject(userAccount, user, object)
          .then(() => agent.add(currentAction.successResponse))
          .catch(e => {
            console.log(`Error: ${e}`);
            agent.add(`Ya tienes el objeto ${object} en tu inventario`);
          });
      default:
        console.log('contextActionsTreatment -> Updating action state');
        return statesDao.addStatus(userAccount, user, action + '_' + object)
          .then(() => agent.add(currentAction.successResponse))
          .catch(e => {
            console.log(`Error: ${e}`);
            agent.add(`Ya has hecho eso`);
          });
    }
  }

  if(death) {
    console.log('contextActionsTreatment -> ¡Death!');
    agent.add(message + '\n¡¡FIN DE LA PARTIDA!!');
    const coordinates = { lat: 39.5137458, lng: -3.0046506};
    return usersDao.addUser(userAccount, user.userName, coordinates); // Reset de partida
  } else {
    agent.add(message);
  }  
}

function everyWhereActionsTreatment(agent, userAccount, user, action, object) {
  switch(action) {
    case 'tirar': console.log('everyWhereActionsTreatment -> Leave action execution');
      return objectsDao.deleteObjectByUser(userAccount, user, object).then(result => {
        console.log(`leaveObject -> Resultado desde deleteObjectByUser: ${result}`);
        agent.add(`Has dejado ${object} en el suelo`);
      }).catch(e => {
        console.log(`leaveObject error -> ${e}`);
        agent.add(`No dispones del objeto ${object} del que deseas deshacerte`);
      });
    default:
      console.log('everyWhereActionsTreatment -> Action not supported');
      agent.add(genericFailResponse);
  }
}

module.exports = { execute };