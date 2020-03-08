const {admin} = require('../firebase.initializers');

function getPlaces() {
    return admin.database().ref('places').once('value');
}

function getPlaceById(placeId) {
  if(!placeId) {
    throw new Error('Se requiere identificador de lugar');
  }
  // TODO: sacar directamente por ID
  return getPlaces().then(snapShot => {
      return snapShot.child(placeId).val();
  });
}

module.exports = { getPlaces, getPlaceById };