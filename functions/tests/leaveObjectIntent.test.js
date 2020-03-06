const handleRequest = require('./utils/handleRequest');

test('Leave my object intent assistant response does not crash', () => {

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
