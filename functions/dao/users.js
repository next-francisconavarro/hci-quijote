const {admin} = require('../firebase.initializers');

function updateUser(userId, newData) {
  return admin.database().ref(`users/${userId}`).update(newData);
}

function getUsers() {
    return admin.database().ref('users').once('value');
}

function getUserById(userId) {
    if(!userId) {
        throw new Error('Se requiere identificador de usuario');
    }
    return admin.database().ref(`users/${userId}`).once('value').then(snapshot => {
      return snapshot.val() || {};
    });
}

function addUser(userAccount, username, coordinates) {
  if(!userAccount) {
      throw new Error('Se requiere identificador');
  } else if(!username) {
    throw new Error('Se requiere nombre de usuario');
  }
  
  return admin.database().ref(`users/${userAccount}`).set({
        room: { 'biblioteca': { step: 0, branch: 0 }},
        placesKnown: ['biblioteca'],
        objects: [], // Inicialmente no tiene objetos en el inventario
        hungry: 100,
        userName: username,
        coordinates
  });
}

module.exports = { updateUser, addUser, getUsers, getUserById };