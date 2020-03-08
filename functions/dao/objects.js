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
  let found = null;
  if(!user) {
    throw new Error("Se requiere usuario");
  }

  if(!object) {
    throw new Error("Se requiere objeto a consultar");
  }
  
  console.log("getObjectByObjectId -> " + user.objects);

  if(user.objects && user.objects.length) {
    found = user.objects.find(element => element == object);
  }

  return found;
}

function deleteObjectByUser(userId, user, object) {
  let deleted = false;
    if(!userId) {
        throw new Error("Se requiere identificador de usuario");
    } else if(!user) {
        throw new Error("Se requiere usuario");
    } else if(!object) {
        throw new Error("Se requiere objeto a borrar");
    }

    if(getObjectByObjectId(user, object)) {
      Object.assign( user, { objects: user.objects.filter(item => item !== object)});
      usersDao.updateUser(userId, user);
      deleted = true;
    }

    return deleted;
}


module.exports = { getObjectsByUserId, deleteObjectByUser };