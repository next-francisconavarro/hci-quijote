const usersDao = require('../dao/users');

function count(userId) {  
  if (userId) {
    return usersDao.getUserById(userId).then(user => {
      if (user) {
        const intents = (user.intents || 0) + 1;
    
        user.intents = intents;
        usersDao.updateUser(userId, user);
      }
    });
  }
  return Promise.resolve();
}

function checkIfNeedHelp() {

}

module.exports = { count, checkIfNeedHelp };
