const {admin} = require('../firebase.initializers');

function getPlaces() {
    return admin.database().ref('places').once('value');
}

function getPlaceById(placeId) {
  if(!placeId) {
    throw new Error('Se requiere identificador de lugar');
  }
  return admin.database().ref(`places/${placeId}`).once('value').then(snapshot => {
    return snapshot.val() || {};
  });
}

module.exports = { getPlaces, getPlaceById };