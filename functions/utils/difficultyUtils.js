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

function getHelp(user) {
  const room = (Object.keys(user.room) || [])[0];
  const actionsDone = user.room.actions || [];
  const actions = placesDao.getPlaceActions(room);
  const connectedRooms = placesDao.getConnectedRooms(room);
  let response = `Estás en ${room}. `;

  if (connectedRooms.length) {
    response += 'Desde aquí puedes ir a '
    response += connectedRooms.map(room => `*${room}*`).join(' ') + '. ';
  }

  if (actionsDone.length < actions.length) {
    response += 'Quizás puedas hacer algo con: ';
    
    if (actions.length > 1) {
      response += onlyUnique(actions.map(el => el.object && `*${el.object.name}*`)).join(', ') + '...';
    } else {
      response += actions[0].object && actions[0].object.name;
    }

    response += '.';
  }


  return response;
}

function onlyUnique(values) { 
  return Array.from(new Set(values));
}

module.exports = { textByDifficulty, getHelp };
