const objectsDao = require('../../dao/objects.js');
const usersDao = require('../../dao/users.js');

test('Delete object in inventory', () => {
    const updateUserMock = jest.spyOn(usersDao, 'updateUser')
      .mockImplementation(() =>  Promise.resolve());

    return objectsDao.deleteObjectByUser(
      'victormanuelpueblanext', 
      {
        userName: 'victorman', 
        difficulty: { level: 'facil', maxCapacity: 99999 },
        objects: [ { name: 'espada', type: 'util', weight: 15 }, { name: 'llave', type: 'util', weight: 2 }]
      }, 
      'espada'
      ).then(() => {
        expect(updateUserMock).toHaveBeenCalledTimes(1);
      });
});

test('Delete non inventory object', () => {
  return objectsDao.deleteObjectByUser(
    'victormanuelpueblanext', 
    {
      userName: 'victorman', 
      difficulty: { level: 'facil', maxCapacity: 99999 },
      objects: [{ name: 'llave', type: 'util', weight: 2 }]
    }, 
    'espada'
    ).catch(e =>
      expect(e).toEqual('Object not found'));    
});