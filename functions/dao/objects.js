const admin = require('firebase-admin');

function getObjectsByUserId(userAccount) {
    // TODO: Implementar y hacer uso de getUserById en vez de getUsers con child
    return usersDao.getUsers().then(snapShot => {
        const value = snapShot.child(userAccount).val();
        if(value !== null) {
            // TODO: Query a bbdd de objetos del usuario
            return ["llave", "patata"];
        }
    });
}

function deleteObjectByUserId(userId, object) {
    // TODO: Implementar query delete object by user id
    return null;
}


module.exports = { getObjectsByUserId, deleteObjectByUserId };