const admin = require('firebase-admin');

function getPlaces() {
    return admin.database().ref('places').once('value');
}

function getPlaceById(userId, placeId) {
    // TODO: Implementar query de lugar con id concreto
    return "rellano";
}

function getPlacesByUserId(userId) {
    // TODO: Implementar query de lugares visitados por usuario
    return ["rellano","cocina"];
}

module.exports = { getPlaces, getPlaceById, getPlacesByUserId };