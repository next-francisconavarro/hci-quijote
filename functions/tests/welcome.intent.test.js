const handleRequest = require('./utils/handleRequest');

test('assistant does not crash', () => {

    return handleRequest({
        intent: 'Default Welcome Intent'
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.join('')).toMatch('Hola aventurero');
      });
});