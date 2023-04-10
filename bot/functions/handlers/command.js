const { readdirSync } = require('node:fs'),
logger = require('@util/logger');

module.exports = (client) => {
    readdirSync('./bot/commands/prefix/').forEach((folder) => {
        const commandFiles = readdirSync(`./bot/commands/prefix/${folder}`).filter((file) => file.endsWith('.js'));

        for(const file of commandFiles) {
            const command = require(`@bot/commands/prefix/${folder}/${file}`);
            if(command && command.name) {
                client.prefix_commands.set(command.name, command);
            } else {
                logger.error(`could not find command name in ${file}`, 'CLIENT');
            }
        }
    });
};