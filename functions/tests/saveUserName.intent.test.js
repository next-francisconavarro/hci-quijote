const handleRequest = require('./utils/handleRequest');

test('Guardar mi nombre', () => {

    return handleRequest({
        intent: 'Guardar mi nombre',
        payload: {
          user: 'Foo Bar'
        }
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.join('')).toMatch('Excelente nombre, Foo Bar');
      });
})
