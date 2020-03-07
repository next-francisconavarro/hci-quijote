const handleRequest = require('./utils/handleRequest');
const usersDao = require('../dao/users.js')
const placesDao = require('../dao/places.js')

beforeEach(() => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      hungry: 5,
      room: [{'alcoba':{ branch: 1, step: 2}}],
      placesKnown: ['acantilado', 'alcoba']
    } ));

  jest.spyOn(placesDao, 'getPlaceById')
    .mockImplementation(() =>  Promise.resolve(
    {
      'alcoba':{ branch: 1, step: 4 }
    }));

  jest.spyOn(placesDao, 'getPlaces')
    .mockImplementation(() =>  Promise.resolve(
    {
      'alcoba':{ branch: 1, step: 4 },
      'acantilado':{ branch: 2, step: 2 }
    }));
  jest.spyOn(usersDao, 'updateUser').mockImplementation(() => Promise.resolve({}));
})

test('Travel intent assistant response does not crash', () => {
    return handleRequest({
        intent: 'viajar',
        payload: {
          place: 'alcoba'
        }
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.join('')).toMatch('Has llegado a alcoba desde acantilado, has recorrido una distancia de 5 2');
      });
})
