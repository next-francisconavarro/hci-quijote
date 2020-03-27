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

function getObjectByObjectId(user, object) {
  if(!user) {
    throw new Error('Se requiere usuario');
  }

  if(!object) {
    throw new Error('Se requiere objeto a consultar');
  }
  
  console.log(`getObjectByObjectId -> Objetos disponibles: ${user.objects}`);

  let objectFound;
  if(user.objects && user.objects.length) {
    objectFound = user.objects.find(element => element == object);
  }

  return objectFound?Promise.resolve(object):Promise.reject('Object not found');
}

function deleteObjectByUser(userId, user, object) {
  if(!userId) {
      throw new Error('Se requiere identificador de usuario');
  } else if(!user) {
      throw new Error('Se requiere usuario');
  } else if(!object) {
      throw new Error('Se requiere objeto a borrar');
  }

  return getObjectByObjectId(user, object).then(object => {
    Object.assign( user, { objects: user.objects.filter(item => item.name !== object)});
    return usersDao.updateUser(userId, user);
  });
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

  if(toTake) {
    console.log('addObject -> Object accepted');
    Object.assign( user, { objects: objects});
    return usersDao.updateUser(userId, user);
  } else {
    console.log('addObject -> Object repeated');
    return Promise.reject('Object repeated');
  }
}

module.exports = { getObjectByObjectId, getObjectsByUserId, deleteObjectByUser, addObject };