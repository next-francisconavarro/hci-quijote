const handleRequest = require('./utils/handleRequest');
const usersDao = require('../dao/users.js')

beforeEach(() => {
  usersDao.addUser("victormanuel.puebla.next","victorman");
});

test('Inventory intent assistant does not crash', () => {

    return handleRequest({
        intent: 'Inventario',
        payload: {
          user: 'victorman'
        }
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.join('')).toMatch('Tienes en tu inventario los siguientes objetos: llave,patata');
      });
});
