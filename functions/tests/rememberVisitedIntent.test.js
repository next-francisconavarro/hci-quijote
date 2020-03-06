const handleRequest = require('./utils/handleRequest');

test('Remember my visited places intent assistant response does not crash', () => {

    return handleRequest({
        intent: 'Recordar visitados',
        payload: {
          user: 'victorman'
        }
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.join('')).toMatch('No has visitado aún a ningún sitio. ¡Acabas de empezar!');
      });
})
