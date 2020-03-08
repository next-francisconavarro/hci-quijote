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
  if(!user || !object) {
    throw new Error("Se requiere usuario y objeto a consultar");
  }
  
  return user.objects.find(element => element == object);
}

function deleteObjectByUser(userId, user, object) {
  let deleted = false;
    if(!userId || !user || !object) {
        throw new Error("Se requiere identificador de usuario, usuario y objeto a borrar");
    }

    if(getObjectByObjectId(user, object)) {
      Object.assign( user, { objects: user.objects.filter(item => item !== object)});
      usersDao.updateUser(userId, user);
      deleted = true;
    }

    return deleted;
}


module.exports = { getObjectsByUserId, deleteObjectByUser };