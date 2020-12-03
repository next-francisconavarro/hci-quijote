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

  let object = user.objects.find(item => item.name === objectName);
  if (object) {
    let difficulty = { level: user.difficulty.level, maxCapacity: user.difficulty.maxCapacity + object.weight };
    Object.assign( user, { difficulty, objects: user.objects.filter(item => item.name !== objectName)});
  }
  return usersDao.updateUser(userId, user);
}

function addObject(userId, user, objectName) {
  if(!userId) {
      throw new Error('Se requiere identificador de usuario');
  } else if(!user) {
      throw new Error('Se requiere usuario');
  } else if(!objectName) {
      throw new Error('Se requiere objeto a borrar');
  }
  let objects;
  let errorLog = 'repeated';
  let toTake = false;
  let nextWeight = user.difficulty.maxCapacity - user.objectsList[objectName].weight;
  let isIncluded = false;
  let isOverweight = nextWeight < 0;

  const objectAvailableOnCurrentPlace = user.objectsList[objectName].currentPlace == Object.keys(user.room)[0];

  if (objectAvailableOnCurrentPlace) {
    user.objectsList[objectName].currentPlace = 'none';
    user.objectsList[objectName].jointToSuccess = true;
    if(user.objects && user.objects.length) {
      objects = user.objects;
      const isIncluded = objects.map(item => item.name).includes(objectName);
      console.log(`addObject -> ${objects} includes ${objectName}? ${isIncluded}`);
      if(!isIncluded) {
        toTake = true;
        objects.push(user.objectsList[objectName]);
      }
    } else {
      toTake = true;
      objects = [user.objectsList[objectName]];
    }
  } else {
    errorLog = user.objectsList[objectName].unFindResponse;
  }

  if(toTake) {
    console.log('addObject -> Object accepted');
    let difficulty = { level: user.difficulty.level, maxCapacity: user.difficulty.maxCapacity - user.objectsList[objectName].weight };
    Object.assign( user, { difficulty: difficulty, objects: objects });
    return usersDao.updateUser(userId, user);
  } else if(isIncluded) {
    console.log('addObject -> Object repeated');
    return Promise.reject(errorLog);
  }

}

module.exports = { getObjectByObjectId, getObjectsByUserId, deleteObjectByUser, addObject };