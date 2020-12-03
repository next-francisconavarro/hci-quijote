const usersDao = require('../dao/users');

function getObjectsByUserId(userId) {
  if(!userId) {
    throw new Error('Se requiere usuario a consultar');
  }

  return usersDao.getUserById(userId).then(user => {
      if(user) {
          return user.objects;
      }
  });
}

function getObjectByObjectId(user, objectName) {
  if(!user) {
    throw new Error('Se requiere usuario');
  }

  if(!objectName) {
    throw new Error('Se requiere objeto a consultar');
  }
  
  console.log(`getObjectByObjectId -> Objetos disponibles: ${user.objects}`);

  let objectFound;
  if(user.objects && user.objects.length) {
    objectFound = user.objects.find(element => element.name == objectName);
  }

  return objectFound?Promise.resolve(objectFound):Promise.reject('Object not found');
}

function deleteObjectByUser(userId, user, objectName) {
  if(!userId) {
      throw new Error('Se requiere identificador de usuario');
  } else if(!user) {
      throw new Error('Se requiere usuario');
  } else if(!objectName) {
      throw new Error('Se requiere objeto a borrar');
  }

  Object.assign( user, { objects: user.objects.filter(item => item.name !== objectName)});
  return usersDao.updateUser(userId, user);
}

function addObject(userId, user, object) {
  if(!userId) {
      throw new Error('Se requiere identificador de usuario');
  } else if(!user) {
      throw new Error('Se requiere usuario');
  } else if(!object) {
      throw new Error('Se requiere objeto a borrar');
  }
  let objects;
  let errorLog = 'repeated';
  let toTake = false;

  const objectAvailableOnCurrentPlace = user.objectsList[object.name].currentPlace == Object.keys(user.room);

  if (objectAvailableOnCurrentPlace) {
    if(user.objects && user.objects.length) {
      objects = user.objects;
      const isIncluded = objects.map(item => item.name).includes(object.name);
      console.log(`addObject -> ${objects} includes ${object}? ${isIncluded}`);
      if(!isIncluded) {
        toTake = true;
        objects.push(object);
      }
    } else {
      toTake = true;
      objects = [object];
    }
    user.objectsList[object.name].currentPlace = 'none';
    user.objectsList[object.name].jointToSuccess = true;
  } else {
    errorLog = user.objectsList[object.name].unFindResponse;
  }

  if(toTake) {
    console.log('addObject -> Object accepted');
    Object.assign( user, { objects: objects});
    return usersDao.updateUser(userId, user);
  } else {
    console.log('addObject -> Object repeated');
    return Promise.reject(errorLog);
  }
}

module.exports = { getObjectByObjectId, getObjectsByUserId, deleteObjectByUser, addObject };