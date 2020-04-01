const placesList = require('./places.json');

function getPlaces() {
    return placesList;
}

function getPlaceById(placeId) {
  if(!placeId) {
    throw new Error('Se requiere identificador de lugar');
  }

  const place = placesList[placeId];

  return place?Promise.resolve(place):Promise.reject('place not found');
}

module.exports = { getPlaces, getPlaceById };
