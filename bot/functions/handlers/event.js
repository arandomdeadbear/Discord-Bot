const { readdirSync } = require('node:fs'),
logger = require('@util/logger');

module.exports = (client) => {
    readdirSync('./bot/events/').forEach((folder) => {
        const eventFiles = readdirSync(`./bot/events/${folder}`).filter((file) => file.endsWith('.js'));
        for(const file of eventFiles) {
            const event = require(`@bot/events/${folder}/${file}`);
            if(event && event.name) {
                client.events.set(event.name, event);
                if(event.once) {
                    client.once(event.name, (...args) => event.execute(client, ...args));
                } else {
                    client.on(event.name, (...args) => event.execute(client, ...args));
                }
            } else {
                logger.error(`could not event name in ${file}`, 'CLIENT');
            }
        }
    });
};