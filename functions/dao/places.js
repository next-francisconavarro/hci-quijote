const {admin} = require('../firebase.initializers');
const placesList = require('./places.json');

function getPlaces() {
    return admin.database().ref('places').once('value');
}

function getPlaceById(placeId) {
  if(!placeId) {
    throw new Error('Se requiere identificador de lugar');
  }

  return Promise.resolve(placesList[placeId]);
}

module.exports = { getPlaces, getPlaceById };
