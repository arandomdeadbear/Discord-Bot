const { Events } = require('discord.js'),
{ settings, secrets } = require('@util/config'),
logger = require('@util/logger');

module.exports = {
	name: Events.MessageCreate,
	once: false,
	async execute(client, message) {
		const { author, content } = message,
		prefix = secrets.prefix;
		if(author.bot || author.system || message.system ) return;
			if(!content.toLowerCase().startsWith(prefix) || !secrets.developers.includes(author.id) || !settings.developer_mode) return;

			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
			if(cmd.length === 0) return;
	
			const command = client.commands.get(cmd.toLowerCase()) || client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
			if(!command) return;
			
			try {
		  		command.execute(client, message, args);
			} catch (err) {
		  logger.logForError(err, 'CLIENT');
		}
	}
}