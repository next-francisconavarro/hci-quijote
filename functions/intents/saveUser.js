const contextDao = require('../dao/context');
const usersDao = require('../dao/users');

function saveUser(request) {
    return agent => {
        const userName = agent.parameters.user;
        const userAccount = contextDao.getUserId(request);
        const coordinates = { lat: 39.5137458, lng: -3.0046506};
        agent.add(`Excelente nombre, ${userName}`);
        return usersDao.addUser(userAccount, userName, coordinates);
    }
}

module.exports = { saveUser };