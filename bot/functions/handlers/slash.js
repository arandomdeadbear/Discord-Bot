const { Routes, REST, PermissionsBitField } = require('discord.js'),
logger = require('@util/logger'),
{ readdirSync } = require('node:fs'),
{ settings, secrets } = require('@util/config');

module.exports = (client) => {
    const commands = [];
    readdirSync('./bot/commands/slash').forEach((folder) => {
        const commandFiles = readdirSync(`./bot/commands/slash/${folder}`).filter((file) => file.endsWith('.js'));

        for(const file of commandFiles) {
           const command = require(`@bot/commands/slash/${folder}/${file}`);
           if(command && command.name && command.description) {
            client.slashes.set(command.name, command);
            commands.push({
                name: command.name,
                description: command.description,
                type: command.type || 1,
                options: command.options ?? null,
                default_member_permissions: command.permissions ? PermissionsBitField.resolve(command.permissions).toString() : null
            });
           } else {
            logger.error(`missing one or more required parameters in ${file}`, 'CLIENT');
            continue;
           }
        }
    });

    //register slash commands
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    (async () => {
        try {
            if(settings.developer_mode) {
                var data = await rest.put(
                    Routes.applicationGuildCommands(secrets.client_id, secrets.guild_id),
                    {
                        body: commands
                    }
                );
            } else {
                data = await rest.put(
                    Routes.applicationCommands(id),
                    {
                        body: commands
                    }
                )
            }
            logger.info(`${data.length} slash commands reloaded succesfully.`, 'CLIENT');
        } catch (err) {
            logger.logForError(err, 'CLIENT');
        }
    })();
}