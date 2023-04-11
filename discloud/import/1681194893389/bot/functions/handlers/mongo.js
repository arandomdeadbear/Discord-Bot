const { readdirSync } = require('node:fs'),
{ connection } = require('mongoose');

module.exports = (client) => {
  readdirSync('./database/events').forEach((folder) => {
    const eventFiles = readdirSync(`./database/events/${folder}`).filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
      const event = require(`@database/events/${folder}/${file}`);
      if (event.once) {
        connection.once(event.name, (...args) =>
          event.execute(client, ...args)
        );
      } else {
        connection.on(event.name, (...args) => event.execute(client, ...args));
      }
    }
  });
};