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

function addObject(userId, user, object) {
  if(!userId) {
      throw new Error('Se requiere identificador de usuario');
  } else if(!user) {
      throw new Error('Se requiere usuario');
  } else if(!object) {
      throw new Error('Se requiere objeto a borrar');
  }

  let objects;
  let toTake = false;
  let nextWeight = user.difficulty.maxCapacity - object.weight;
  let isIncluded = false;
  let isOverweight = nextWeight < 0;

  console.log(`addObject -> ${user.difficulty.maxCapacity} - ${object.weight} = ${nextWeight} => ¿isOverweight?${isOverweight}`);

  if(user.objects && user.objects.length) {
    objects = user.objects;
    isIncluded = objects.map(item => item.name).includes(object.name);
    console.log(`addObject -> ${JSON.stringify(objects)} includes ${JSON.stringify(object)}? ${isIncluded}`);
    if(!isIncluded && !isOverweight) {
      toTake = true;
      objects.push(object);
    }
  } else if (!isOverweight) {
    toTake = true;
    objects = [object];
  }

  if(toTake) {
    console.log('addObject -> Object accepted');
    let difficulty = { level: user.difficulty.level, maxCapacity: user.difficulty.maxCapacity - object.weight };
    Object.assign( user, { difficulty: difficulty, objects: objects });
    return usersDao.updateUser(userId, user);
  } else if(isIncluded) {
    console.log('addObject -> Object repeated');
    return Promise.reject('Object repeated');
  } else if(isOverweight) {
    console.log('addObject -> Object take action generate overweight');
    return Promise.reject('Object not allowed');
  }
}

function addObjectFromFloor(userId, user, objectName, placeName) {
  if(!userId) {
    throw new Error('Se requiere identificador de usuario');
  } else if(!user) {
    throw new Error('Se requiere usuario');
  } else if(!objectName) {
    throw new Error('Se requiere objeto');
  } else if(!placeName) {
    throw new Error('Se requiere lugar del objeto borrar');
  }
  
  let object;
  if (user.objectsByPlace) {
    object = user.objectsByPlace[placeName] || [].find(element => element.name == objectName);
    object = object[0];
    console.log(`addObjectFromFloor -> ${userId} va a coger objeto ${JSON.stringify(object)} del suelo en ${placeName}`);

    let objects;
    let toTake = false;
    let nextWeight = user.difficulty.maxCapacity - object.weight;
    let isIncluded = false;
    let isOverweight = nextWeight < 0;

    console.log(`addObject -> ${user.difficulty.maxCapacity} - ${object.weight} = ${nextWeight} => ¿isOverweight?${isOverweight}`);

    if(user.objects && user.objects.length) {
      objects = user.objects;
      isIncluded = objects.map(item => item.name).includes(object.name);
      console.log(`addObjectFromFloor -> ${JSON.stringify(objects)} includes ${JSON.stringify(object)}? ${isIncluded}`);
      if(!isIncluded && !isOverweight) {
        toTake = true;
        objects.push(object);
      }
    } else if(!isOverweight) {
      toTake = true;
      objects = [object];
    }
  
    if(toTake) {
      console.log('addObjectFromFloor -> Object accepted');
      user.objectsByPlace[placeName] = user.objectsByPlace[placeName].filter(item => item.name !== objectName);
      let difficulty = { level: user.difficulty.level, maxCapacity: nextWeight };
      Object.assign( user, { difficulty: difficulty, objects: objects, objectsByPlace: user.objectsByPlace });
      return usersDao.updateUser(userId, user);
    } else if(isIncluded) {
      console.log('addObjectFromFloor -> Object repeated');
      return Promise.reject('Object repeated');
    } else if(isOverweight) {
      console.log('addObjectFromFloor -> Object take action generate overweight');
      return Promise.reject('Object not allowed');
    }
  } else {
    console.log('addObjectFromFloor -> Object not found');
    return Promise.reject('Object not found');
  }  

}

module.exports = { getObjectByObjectId, getObjectsByUserId, deleteObjectByUser, addObject, addObjectFromFloor };