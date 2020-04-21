const placesDao = require('../dao/places');
const placeNames = placesDao.getPlaceNames();
const items = placesDao.getItems();

function textByDifficulty(text, user) {
  if (user.difficultyLevel === 'facil') {
    let boldText = text;

    placeNames.concat(items).forEach(place =>
      boldText = boldText.replace(new RegExp(`(\\W)${place}(\\W|$)`, 'g'), `$1*${place}*$2`)
    );

    return boldText;
  }

  return text;
}

module.exports = { textByDifficulty };
