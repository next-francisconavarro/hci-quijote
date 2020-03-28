const handleRequest = require('../utils/handleRequest');
const usersDao = require('../../dao/users');
const objectsDao = require('../../dao/objects');
const placesDao = require('../../dao/places');
const statesDao = require('../../dao/states');

/* TAKE OBJECTS ACTION TESTS */
test('Actions take new object intent execution', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      objects:[ { name: 'cosita', type: 'util' } ],
      room: { 'cocina': { 'branch': 0, 'step': 3 } }
    } ));

  jest.spyOn(objectsDao, 'addObject')
    .mockImplementation(() => Promise.resolve());

  jest.spyOn(statesDao, 'addStatus')
    .mockImplementation(() => Promise.resolve());

  jest.spyOn(placesDao, 'getPlaceById')
    .mockImplementation(() =>  Promise.resolve( 
      {
          step: 3, 
          branch: 0,
          description: 'En la antigua y acogedora cocina, desnuda de todo lo que pueda recordar olorosas comidas, queda una triste alacena y, al fondo, una despensa',
          actions: [
            {   
              action: 'coger',
              object: { name: 'llave', type: 'util' },
              successResponse: 'Guardala bien, nunca se sabe'
            }
          ],
          genericFailResponse: 'Eso no se puede hacer aqui'
        }
      ));

  return handleRequest({
      intent: 'Acciones',
      payload: {
        user: 'victorman',
        action: 'coger',
        object: ['llave']
      }
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.join('')).toMatch('Guardala bien, nunca se sabe');
    });
})

test('Actions take same object intent execution', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      objects:[ { name: 'llave', type: 'util' } ],
      room: { 'cocina': { 'branch': 0, 'step': 3 } }
    } ));

  jest.spyOn(objectsDao, 'addObject')
    .mockImplementation(() => Promise.reject('Object repeated'));

  jest.spyOn(statesDao, 'addStatus')
    .mockImplementation(() => Promise.resolve());

  jest.spyOn(placesDao, 'getPlaceById')
    .mockImplementation(() =>  Promise.resolve( 
      {
          step: 3, 
          branch: 0,
          description: 'En la antigua y acogedora cocina, desnuda de todo lo que pueda recordar olorosas comidas, queda una triste alacena y, al fondo, una despensa',
          actions: [
            {   
              action: 'coger',
              object: { name: 'llave', type: 'util' },
              successResponse: 'Guardala bien, nunca se sabe'
            }
          ],
          genericFailResponse: 'Eso no se puede hacer aqui'
        }
      ));

  return handleRequest({
      intent: 'Acciones',
      payload: {
        user: 'victorman',
        action: 'coger',
        object: ['llave']
      }
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.join('')).toMatch('Ya tienes el objeto llave en tu inventario');
    });
})