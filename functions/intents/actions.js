const objectsDao = require('../dao/objects');
const placesDao = require('../dao/places');
const usersDao = require('../dao/users');
const statesDao = require('../dao/states');
const contextDao = require('../dao/context');
const arrayUtils = require('../utilities/arrayUtils');

const everyWhereActions = ['tirar'];

function execute(request) {
  return agent => {
    console.log('execute -> Agent Parameters: ' + JSON.stringify(agent.parameters));
    const action = agent.parameters.action;
    const object = agent.parameters.object;
    const userAccount = contextDao.getUserId(request);
    console.log(`takeObject -> Cuenta de usuario: ${userAccount}`);

    return usersDao.getUserById(userAccount).then(user => {
      const placeName = Object.keys(user.room)[0];
      return placesDao.getPlaceById(placeName).then(currentPlace => {
        if(currentPlace) {
          if(everyWhereActions.includes(action)) {
            return everyWhereActionsTreatment(agent, userAccount, user, action, object);
          } else {
            return contextActionsTreatment(agent, userAccount, user, currentPlace[placeName], action, object);
          }
        }
      });
    });
  }
}

function contextActionsTreatment(agent,userAccount,user,place,action,object) {
  let currentAction = place.actions.find(actionObj => actionObj.action == action && actionObj.object == object);
  let allowedAction = currentAction !== undefined;
  let requirementsOk;

  if(allowedAction) {
    requirementsOk = arrayUtils.isSubset(currentAction.requirementObject, user.objects) &&
      arrayUtils.isSubset(currentAction.requirementStatus, user.states);
  }

  let message;
  if(!allowedAction) {
    message = place.genericFailResponse;
  } else if(!requirementsOk) {
    message = currentAction.failResponse;
  } else {
    switch(action) {
      case 'coger': console.log('execute -> Take action execution');
        return objectsDao.addObject(userAccount, user, object)
          .then(() => agent.add(currentAction.successResponse))
          .catch(e => {
            console.log(`Error: ${e}`);
            return agent.add(`Ya tienes el objeto ${object} en tu inventario`);
          });
      default:
        return statesDao.addStatus(userAccount, user, action + '_' + object)
          .then(() => agent.add(currentAction.successResponse))
          .catch(e => {
            console.log(`Error: ${e}`);
            return agent.add(`Ya has hecho eso`);
          });
    }
  }
  return agent.add(message);
}

function everyWhereActionsTreatment(agent, userAccount, user, action, object) {
  switch(action) {
    case 'tirar': console.log('execute -> Leave action execution');
      return objectsDao.deleteObjectByUser(userAccount, user, object).then(result => {
        console.log(`leaveObject -> Resultado desde deleteObjectByUser: ${result}`);
        return agent.add(`Has dejado ${object} en el suelo`);
      }).catch(e => {
        console.log(`leaveObject error -> ${e}`);
        return agent.add(`No dispones del objeto ${object} del que deseas deshacerte`);
      });
  }
}

module.exports = { execute };