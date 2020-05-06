const difficultyUtils = require('../../utils/difficultyUtils');

test('Should add bold to objects and places', () => {
  const user = { difficultyLevel: 'facil' };
  const text = 'Los libros polvorientos destacan en una estantería situada hacia la izquierda. De todos ellos hay un libro que te llama especialmente la atención';

  expect(difficultyUtils.textByDifficulty(text, user)).toMatch('*libro*');
});
