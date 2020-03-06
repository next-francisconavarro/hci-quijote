const contextDao = require('../dao/context');
const placesDao = require('../dao/places');
const usersDao = require('../dao/users');

function recoverCurrentPlaceStep(request) {
    return agent => {
        const userAccount = contextDao.getUserId(request);
        return usersDao.getUsers().then(snapShot => {
            const value = snapShot.child(userAccount).val();
            if(value !== null) {
                return travel(agent, value, userAccount);
            }
        });
    }
}

function travel(agent, userData, userId) {
    const selectedPlace = agent.parameters.place;
    const placeName = Object.keys(userData.room)[0];
    // TODO: Implementar y hacer uso de getPlacesById en vez de getPlaces con child
    return placesDao.getPlaces().then(snapShot => {
        const value = snapShot.child(selectedPlace).val();
        if(value !== null) {
            const distance = calculateTravelCoeficient(userData.room[placeName], value);
            const newPlace = {};
            const conHambre = userData.hungry - distance < 10 ? ' y empiezas a estar hambriento, uno es un hidalgo pero aun asi necesita comer.' : '';
            newPlace[`${selectedPlace}`] = value;
            Object.assign( userData, { placesKnown: Object.assign(userData.placesKnown, { [`${selectedPlace}`]: true }), room: newPlace, hungry: userData.hungry - distance });
            usersDao.updateUser(userId, userData);
            return agent.add(`Has llegado a ${selectedPlace} desde ${placeName}, has recorrido una distancia de ${distance} ${conHambre}`);
        }
    }).catch( e => {
        console.log('error: ', e);
        return agent.add(`Nadie ha oido hablar de ese lugar nunca!`);
    });
}

function calculateTravelCoeficient(origin, destiny) {
    return (Math.abs(origin.branch - destiny.branch) * 2) + (Math.abs(origin.step - destiny.step)) * 2;
}

module.exports = { recoverCurrentPlaceStep };