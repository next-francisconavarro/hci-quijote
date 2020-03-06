const handleRequest = require('./utils/handleRequest');

test("Remember user intent assistant response does not crash", () => {

    return handleRequest({
        intent: 'Recordar el nombre',
        payload: {
          user: 'victorman'
        }
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.join('')).toMatch('Que memoria la tuya, tu nombre es victorman');
      });
})
