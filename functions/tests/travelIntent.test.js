const handleRequest = require('./utils/handleRequest');
const usersDao = require('../dao/users.js')
const placesDao = require('../dao/places.js')

beforeEach(() => {
  jest.spyOn(placesDao, 'getPlaceById')
  .mockImplementation(() =>  Promise.resolve(
  {
    'alcoba':{ branch: 1, step: 3 }
  }));

  jest.spyOn(placesDao, 'getPlaces')
    .mockImplementation(() =>  Promise.resolve(
    {
      'alcoba':{ branch: 1, step: 3 },
      'acantilado':{ branch: 1, step: 2 }
    }));
  jest.spyOn(usersDao, 'updateUser').mockImplementation(() => Promise.resolve({}));
})

test('Travel intent without hungry advice', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      hungry: 20,
      room: {'acantilado': { branch: 1, step: 2}},
      placesKnown: ['acantilado', 'alcoba']
    } ));

    return handleRequest({
        intent: 'viajar',
        payload: {
          place: 'alcoba'
        }
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.join('')).toMatch('Has llegado a alcoba desde acantilado, has recorrido una distancia de 2');
      });
})

test('Travel intent with hungry advice', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      hungry: 5,
      room: {'acantilado': { branch: 1, step: 2}},
      placesKnown: ['acantilado', 'alcoba']
    } ));

  return handleRequest({
      intent: 'viajar',
      payload: {
        place: 'alcoba'
      }
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.join('')).toMatch('Has llegado a alcoba desde acantilado, has recorrido una distancia de 2 y empiezas a estar hambriento, uno es un hidalgo pero aun asi necesita comer.');
    });
})
