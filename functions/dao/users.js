const {admin} = require('../firebase.initializers');

function updateUser(userId, newData) {
    return admin.database().ref('users').update({
        [userId]: newData
    });
}

function getUsers() {
    return admin.database().ref('users').once('value');
}

function getUserById(userId) {
    if(!userId) {
        throw new Error("Se requiere identificador de usuario");
    }
    // TODO: sacar directamente por ID
    return getUsers().then(snapShot => {
        return snapShot.child(userId).val();
    });
}

function addUser(userAccount, username) {
  if(!userAccount || !username) {
      throw new Error("Se requiere identificador");
  } else if(!username) {
    throw new Error("Se requiere nombre de usuario");
  }
  
  return admin.database().ref('users').set({
      [userAccount]: {
      room: { 'biblioteca': { step: 0, branch: 0 }},
      placesKnown:{ 'biblioteca': true },
      stairsReviewed: false,
      objects: [], // Inicialmente no tiene objetos en el inventario
      hungry: 100,
      userName: username
      } 
  });
}

module.exports = { updateUser, addUser, getUsers, getUserById };