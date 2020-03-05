const contextDao = require('../dao/context');
const usersDao = require('../dao/users');

function saveUser(request) {
    return function(agent) {
        const userName = agent.parameters.user;
        const userAccount = contextDao.getUserId(request);
        agent.add(`Excelente nombre, ${userName}`);
        return usersDao.addUser(userAccount, userName);
    }
}

module.exports = { saveUser };