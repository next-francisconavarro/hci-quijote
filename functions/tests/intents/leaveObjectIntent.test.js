const handleRequest = require('../utils/handleRequest');
const usersDao = require('../../dao/users');
const objectsDao = require('../../dao/objects');

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
      intent: 'Acciones',
      payload: {
        user: 'victorman',
        action: 'tirado',
        object: 'cosita'
      }
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.join('')).toMatch('Has tirado cosita');
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
        intent: 'Acciones',
        payload: {
          user: 'victorman',
          action: 'tirado',
          object: 'cosita'
        }
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.join('')).toMatch('No dispones del objeto cosita del que deseas deshacerte');
      });
})
