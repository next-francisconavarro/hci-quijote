const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const objectsDao = require('../dao/objects');

function takeObject(agent, request) {
  console.log(`takeObject -> Agent Parameters: ${JSON.stringify(agent.parameters)}`);
  const object = agent.parameters.object;
  const userAccount = contextDao.getUserId(request);
  console.log(`takeObject -> Cuenta de usuario: ${userAccount}`);
  return usersDao.getUserById(userAccount).then(user => {
      if(user) {
        return objectsDao.addObject(userAccount, user, object).then(result => {
          console.log(`takeObject -> Resultado desde takeObject: ${result}`);
          return agent.add(`Has cogido ${object}`);
        }).catch(e => {
          console.log(`takeObject error -> ${e}`);
          return agent.add(`Ya tienes el objeto ${object} en tu inventario`)
        });
      }
  });
}

module.exports = { takeObject };