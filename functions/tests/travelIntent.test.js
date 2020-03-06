const handleRequest = require('./utils/handleRequest');

test('Travel intent assistant response does not crash', () => {

    return handleRequest({
        intent: 'viajar',
        payload: {
          user: 'victormanuel.puebla.next'
        }
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.join('')).toMatch('Has llegado a ');
      });
})
