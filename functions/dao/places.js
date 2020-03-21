const {admin} = require('../firebase.initializers');
const placesList = require('./places.json');

function getPlaces() {
    return admin.database().ref('places').once('value');
}

function getPlaceById(placeId) {
  if(!placeId) {
    throw new Error('Se requiere identificador de lugar');
  }

  const place = placesList[placeId];
  console.log(`getPlaceById -> ${placeId} => ${place}`)
  return Promise.resolve(place);
}

module.exports = { getPlaces, getPlaceById };
