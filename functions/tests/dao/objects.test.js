const objectsDao = require('../../dao/objects.js');
const usersDao = require('../../dao/users.js');

test('Delete object in inventory', () => {
    const updateUserMock = jest.spyOn(usersDao, 'updateUser')
      .mockImplementation(() =>  Promise.resolve());

    return objectsDao.deleteObjectByUser(
      'victormanuelpueblanext', 
      {
        userName: 'victorman', 
        objects: ['espada', 'llave']
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
      objects: ['llave']
    }, 
    'espada'
    ).catch(e =>
      expect(e).toEqual('Object not found'));    
});