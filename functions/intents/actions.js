const leaveAction = require('./leaveObject');
const takeAction = require('./takeObject');

function execute(request) {
  return agent => {
    console.log('execute -> Agent Parameters: ' + JSON.stringify(agent.parameters));
    const action = agent.parameters.action;

    switch(action) {
      case 'cogido': console.log('execute -> Take action execution');
        return takeAction.takeObject(agent, request);
      case 'tirado': console.log('execute -> Leave action execution');
        return leaveAction.leaveObject(agent, request);
    }
  }
}

module.exports = { execute };