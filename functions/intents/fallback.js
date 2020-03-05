function fallback(agent) {
    agent.add(`No te entiendo`);
    agent.add(`Lo siento, ¿Puedes repetirmelo?`);
}

module.exports = { fallback };