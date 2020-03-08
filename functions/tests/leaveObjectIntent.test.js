const handleRequest = require('./utils/handleRequest');
const usersDao = require('../dao/users');
const objectsDao = require('../dao/objects');

test('Leave object that i do have', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      objects:['cosita']
    } ));

  jest.spyOn(objectsDao, 'deleteObjectByUser')
    .mockImplementation(() =>  Promise.resolve(true));

  return handleRequest({
      intent: 'Tirar',
      payload: {
        user: 'victorman',
        object: 'cosita'
      }
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.join('')).toMatch('Con sumo pesar dejas caer tu cosita y se pierde en el infinito ante tus ojos');
    });
})

test('Leave object that i do not have', () => {
    jest.spyOn(usersDao, 'getUserById')
      .mockImplementation(() =>  Promise.resolve( 
      { 
        userName: 'victorman'
      } ));

    jest.spyOn(objectsDao, 'deleteObjectByUser')
      .mockImplementation(() =>  Promise.reject('Object not found'));

    return handleRequest({
        intent: 'Tirar',
        payload: {
          user: 'victorman',
          object: 'cosita'
        }
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.join('')).toMatch('No dispones del objeto cosita del que deseas deshacerte');
      });
})
