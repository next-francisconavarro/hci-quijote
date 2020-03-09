const handleRequest = require('../utils/handleRequest');
const usersDao = require('../../dao/users');
const objectsDao = require('../../dao/objects');

test('Take a new object action', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman'
    } ));

  jest.spyOn(objectsDao, 'addObject')
    .mockImplementation(() => Promise.resolve());

  return handleRequest({
      intent: 'Acciones',
      payload: {
        user: 'victorman',
        action: 'cogido',
        object: 'cosita'
      }
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.join('')).toMatch('Has cogido cosita');
    });
})

test('Take repeated object action', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      objects:['cosita', 'otra']
    } ));

  jest.spyOn(objectsDao, 'addObject')
    .mockImplementation(() => Promise.reject('Object repeated'));

  return handleRequest({
      intent: 'Acciones',
      payload: {
        user: 'victorman',
        action: 'cogido',
        object: 'cosita'
      }
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.join('')).toMatch('Ya tienes el objeto cosita en tu inventario');
    });
})
