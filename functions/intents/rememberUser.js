const contextDao = require('../dao/context');
const usersDao = require('../dao/users');

function recoverUserName(agent, request) {
    const userAccount = contextDao.getUserId(request);
    return usersDao.getUsers().then(snapShot => {
        const value = snapShot.child(userAccount).val();
        if(value !== null) {
            agent.add(`Que memoria la tuya, tu nombre es ${value.userName}`);
        }
    });
}

module.exports = { recoverUserName };