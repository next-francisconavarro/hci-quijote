const admin = require('firebase-admin');

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
        console.error("Se requiere identificador de usuario");
    }
    // TODO: Implementar query por user id
    return null;
}

function addUser(userAccount, username) {
    return admin.database().ref('users').set({
        [userAccount]: {
        room: { 'biblioteca': { step: 0, branch: 0 }},
        placesKnown:{ 'biblioteca': true },
        stairsReviewed: false,
        stair: false,
        apple: false,
        bread: false,
        sword: false,
        armor: false,
        mainDoorKey: false,
        candle: false,
        mushroom: false,
        vine: false,
        hammer: false,
        stone: false,
        rake: false,
        hungry: 100,
        userName: username
        } 
    });
}

module.exports = { updateUser, addUser, getUsers, getUserById };