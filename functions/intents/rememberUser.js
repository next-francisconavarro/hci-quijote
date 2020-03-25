const contextDao = require('../dao/context');
const usersDao = require('../dao/users');
const { isNight } = require('../utils/time');
const { Card } = require('dialogflow-fulfillment');

const imageUrl = 'http://www.commodoreabandonware.com/mod/upload/cmd_es/images/c3/34/ba/61/fe/74/aa/5c/21/72/b4/0b/ea/f5/bd/b1/don_quijote.png';

function recoverUserName(request) {
    return agent => {
        const userAccount = contextDao.getUserId(request);
        return usersDao.getUserById(userAccount).then(user => {
          if (user) {
            agent.add(new Card({
                title: `Que memoria la tuya, tu nombre es ${user.userName}.`,
                imageUrl: imageUrl,
                text: isNight(user) ? 'Hace una noche despejada.' : 'Hace un día estupendo.',
                buttonText: '?',
                buttonUrl: 'https://assistant.google.com/'
              })
            );
          }
        });
    }
}

module.exports = { recoverUserName };