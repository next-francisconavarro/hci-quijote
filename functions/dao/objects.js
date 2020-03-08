const usersDao = require('../dao/users');

function getObjectsByUserId(userId) {
  if(!userId) {
    throw new Error("Se requiere usuario a consultar");
  }

  return usersDao.getUserById(userId).then(user => {
      if(user) {
          return user.objects;
      }
  });
}

function getObjectByObjectId(user, object) {
  if(!user) {
    throw new Error("Se requiere usuario");
  }

  if(!object) {
    throw new Error("Se requiere objeto a consultar");
  }
  
  console.log("getObjectByObjectId -> Objetos disponibles: " + user.objects);

  if(user.objects && user.objects.length) {
    return user.objects.find(element => element == object);
  } else {
    return Promise.reject("Object not found");
  }
}

function deleteObjectByUser(userId, user, object) {
  if(!userId) {
      throw new Error("Se requiere identificador de usuario");
  } else if(!user) {
      throw new Error("Se requiere usuario");
  } else if(!object) {
      throw new Error("Se requiere objeto a borrar");
  }

  return getObjectByObjectId(user, object).then(object => {
    Object.assign( user, { objects: user.objects.filter(item => item !== object)});
    return usersDao.updateUser(userId, user);
  });
}


module.exports = { getObjectsByUserId, deleteObjectByUser };