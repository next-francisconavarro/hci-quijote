const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const { isNight } = require('../utils/time');

function recoverUserName(request) {
    return agent => {
        const userAccount = contextDao.getUserId(request);
        return usersDao.getUserById(userAccount).then(user => {
          if (user) {
            agent.add(`Que memoria la tuya, tu nombre es ${user.userName}.`);
            if (isNight(user)) {
              agent.add('Parece que es de noche.');
            } else {
              agent.add('Hace un día estupendo.');
            }
          }
        });
    }
}

module.exports = { recoverUserName };