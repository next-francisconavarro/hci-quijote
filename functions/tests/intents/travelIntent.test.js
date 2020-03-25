const handleRequest = require('../utils/handleRequest');
const usersDao = require('../../dao/users.js');
const placesDao = require('../../dao/places.js');

beforeEach(() => {
  jest.spyOn(placesDao, 'getPlaceById')
  .mockImplementation(() =>  Promise.resolve(
    { description: 'Un diminuto acantilado esta frente ti, quizas podrias cruzarlo de un salto, pero parece mucha distancia incluso para un valiente hidalgo, creo que seria mejor darse media vuelta', requirementStatus: ["colocar_escalon"], failDescription: "no puedes llegar, necesitas hacer algo antes" , branch: 1, step: 3 }
  ));

  jest.spyOn(placesDao, 'getPlaces')
    .mockImplementation(() =>  Promise.resolve(
    {
      'alcoba':{ description: 'un dormitorio sin mas. Una cama, un suelo... poco mas. Para descansar es suficiente supongo', branch: 1, step: 3 },
      'acantilado':{ description: 'Un diminuto acantilado esta frente ti, quizas podrias cruzarlo de un salto, pero parece mucha distancia incluso para un valiente hidalgo, creo que seria mejor darse media vuelta', branch: 1, step: 2 },
      'bosque':{ description:'Un oscuro bosque, tan oscuro que apenas alcanzas a ver poco más que un pedrusco en el suelo. Se escuchan lobos al rededor tuya. Yo me daria media vuelta y me iria', requirementStatus: ["colocar_escalón"], branch: 2, step: 6 }
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
        states: ["colocar_escalon"],
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
        expect(response.body.join('')).toMatch('Un diminuto acantilado esta frente ti, quizas podrias cruzarlo de un salto, pero parece mucha distancia incluso para un valiente hidalgo, creo que seria mejor darse media vuelta');
      });
})

test('Travel intent with hungry advice', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      hungry: 5,
      room: {'acantilado': { branch: 1, step: 2}},
      states: ["colocar_escalon"],
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
      expect(response.body.join('')).toMatch('Un diminuto acantilado esta frente ti, quizas podrias cruzarlo de un salto, pero parece mucha distancia incluso para un valiente hidalgo, creo que seria mejor darse media vuelta y empiezas a estar hambriento, uno es un hidalgo pero aun asi necesita comer.');
    });
})

test('Travel intent with long distance advice', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      hungry: 20,
      room: {'acantilado': { branch: 3, step: 4}},
      states: ["colocar_escalon"],
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
      expect(response.body.join('')).toMatch('Un diminuto acantilado esta frente ti, quizas podrias cruzarlo de un salto, pero parece mucha distancia incluso para un valiente hidalgo, creo que seria mejor darse media vuelta. Ha sido un largo viaje');
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

test('Can´t travel to this place because dont have needed place required status', () => {
  jest.spyOn(usersDao, 'getUserById')
    .mockImplementation(() =>  Promise.resolve( 
    { 
      userName: 'victorman',
      hungry: 20,
      room: { alcoba: { branch: 1, step: 2}},
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
      expect(response.body.join('')).toMatch('no puedes llegar, necesitas hacer algo antes');
    });
})
