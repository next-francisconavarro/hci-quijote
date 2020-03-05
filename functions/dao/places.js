const admin = require('firebase-admin');

function getPlaces() {
    return admin.database().ref('places').once('value');
}

function getPlaceById(userId, placeId) {
    if(!userId || !placeId) {
        console.error("Se requiere usuario y lugar a consultar");
    }
    // TODO: Implementar query de lugar con id concreto
    return "rellano";
}

function getPlacesByUserId(userId) {
    if(!userId) {
        console.error("Se requiere usuario para consultar lugares");
    }
    // TODO: Implementar query de lugares visitados por usuario
    return ["rellano","cocina"];
}

module.exports = { getPlaces, getPlaceById, getPlacesByUserId };