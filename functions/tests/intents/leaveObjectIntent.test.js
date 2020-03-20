const handleRequest = require('../utils/handleRequest');
const usersDao = require('../../dao/users');
const objectsDao = require('../../dao/objects');
const placesDao = require('../../dao/places');

/* LEAVE OBJECTS ACTION TESTS */
test('Leave object that i do have', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      objects:['cosita'],
      room: { 'cocina': { 'branch': 0, 'step': 3 } }
    } ));

  jest.spyOn(objectsDao, 'deleteObjectByUser')
    .mockImplementation(() =>  Promise.resolve(true));

    jest.spyOn(placesDao, 'getPlaceById')
    .mockImplementation(() =>  Promise.resolve( 
      {
        cocina: { 
          step: 3, 
          branch: 0,
          description: 'En la antigua y acogedora cocina, desnuda de todo lo que pueda recordar olorosas comidas, queda una triste alacena y, al fondo, una despensa',
          actions: [
            {   
              action: 'coger',
              object: 'llave',
              successResponse: 'Guardala bien, nunca se sabe'
            }
          ],
          genericFailResponse: 'Eso no se puede hacer aqui'
        }
      }));

  return handleRequest({
      intent: 'Acciones',
      payload: {
        user: 'victorman',
        action: 'tirar',
        object: ['cosita']
      }
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.join('')).toMatch('Has dejado cosita en el suelo');
    });
})

test('Leave object that i do not have', () => {
    jest.spyOn(usersDao, 'getUserById')
      .mockImplementation(() =>  Promise.resolve( 
      { 
        userName: 'victorman',
        room: { 'cocina': { 'branch': 0, 'step': 3 } }
      } ));

    jest.spyOn(objectsDao, 'deleteObjectByUser')
      .mockImplementation(() =>  Promise.reject('Object not found'));

    return handleRequest({
        intent: 'Acciones',
        payload: {
          user: 'victorman',
          action: 'tirar',
          object: ['cosita']
        }
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.join('')).toMatch('No dispones del objeto cosita del que deseas deshacerte');
      });
})

