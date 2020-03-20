const handleRequest = require('../utils/handleRequest');
const usersDao = require('../../dao/users.js');
const placesDao = require('../../dao/places.js');

beforeEach(() => {
  jest.spyOn(placesDao, 'getPlaceById')
  .mockImplementation(() =>  Promise.resolve(
    { branch: 1, step: 3 }
  ));

  jest.spyOn(placesDao, 'getPlaces')
    .mockImplementation(() =>  Promise.resolve(
    {
      'alcoba':{ branch: 1, step: 3 },
      'acantilado':{ branch: 1, step: 2 },
      'bosque':{ branch: 2, step: 6 }
    }));
  jest.spyOn(usersDao, 'updateUser').mockImplementation(() => Promise.resolve({}));
})

test('Travel intent without hungry advice', () => {
    jest.spyOn(usersDao, 'getUserById')
      .mockImplementation(() =>  Promise.resolve( 
      { 
        userName: 'victorman',
        hungry: 20,
        room: { acantilado: { branch: 1, step: 2}},
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

test('Travel intent with long distance advice', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      hungry: 20,
      room: {'acantilado': { branch: 3, step: 4}},
      placesKnown: ['acantilado', 'bosque']
    } ));

  return handleRequest({
      intent: 'viajar',
      payload: {
        place: 'bosque'
      }
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.join('')).toMatch('Has llegado a bosque desde acantilado, has recorrido una distancia de 6. Ha sido un largo viaje');
    });
})

test('Travel intent no need to trip. Now on desired place', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      hungry: 20,
      room: { acantilado: { branch: 1, step: 2}},
      placesKnown: ['acantilado', 'alcoba']
    } ));

  return handleRequest({
      intent: 'viajar',
      payload: {
        place: 'acantilado'
      }
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.join('')).toMatch('¡Ya estás en este lugar!');
    });
})
