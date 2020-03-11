const contextDao = require('../dao/context');
const usersDao = require('../dao/users');

function recoverUserName(request) {
    return agent => {
        const userAccount = contextDao.getUserId(request);
        return usersDao.getUserById(userAccount).then(user => {
          if (user) {
            agent.add(`Que memoria la tuya, tu nombre es ${user.userName}`);
          }
        });
    }
}

module.exports = { recoverUserName };