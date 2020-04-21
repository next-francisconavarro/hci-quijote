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

function getPlaceNames() {
  return Object.keys(placesList);
}

function getItems() {
  const keys = Object.keys(placesList);
  const items = {};

  keys.forEach(key => {
    placesList[key].actions.forEach(item => {
      if(item.object && item.object.name) {
        items[item.object.name] = 1;
      }
    });
  })
  return Object.keys(items);
}

module.exports = { getPlaces, getPlaceById, getPlaceNames, getItems };
