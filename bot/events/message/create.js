const { Events, ChannelType, EmbedBuilder, PermissionsBitField } = require('discord.js'),
{ settings, secrets } = require('@util/config'),
logger = require('@util/logger');

module.exports = {
	name: Events.MessageCreate,
	once: false,
	async execute(client, message) {
		const { author, content, channel, member, guild } = message,
		prefix = secrets.prefix;
		if(author.bot || author.system || message.system || !content.toLowerCase().startsWith(prefix)) return;
			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
			if(cmd.length === 0) return;
	
			const command = client.commands.get(cmd.toLowerCase()) || client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
			if(!command) return;

			const errEmbed = new EmbedBuilder()
			.setColor('Red')

		if(channel.type == ChannelType.DM && command.guild_only) {
			errEmbed.setDescription('❌ | This command can not be executed inside dm.')
		message.reply({
			embeds: [errEmbed]
		});
		return;
		} else if(channel.type !== ChannelType.DM && command.dm_only) {
			errEmbed.setDescription('❌ | This command can only be executed inside dm.')
		message.reply({
			embeds: [errEmbed]
		});
		return;
		} else if(command.dev_only && !secrets.developers.includes(author.id)) {
			errEmbed.setDescription('❌ | Only developers of this bot can run this command.')
			message.reply({
				embeds: [errEmbed]
			});
			return;
		} else if(command.category?.toLowerCase() === 'dev' && !secrets.developers.includes(author.id)) {
			errEmbed.setDescription('❌ | Only developers of this bot can run this command.')
			message.reply({
				embeds: [errEmbed]
			});
			return;
		} else if(command.owner_only && secrets.owner !== author.id.toString()) {
			errEmbed.setDescription('❌ | Only owner of this bot can run this command.')
			message.reply({
				embeds: [errEmbed]
			});
			return;
		} 
		if(channel.type !== ChannelType.DM && command.permissions.member){
				const requiredPerms = PermissionsBitField.resolve(command.permissions.member).toString() || null;
				if(!member.permissions.has(requiredPerms)) {
					errEmbed.setDescription('❌ | You do not have required permissions to execute this command.')
					message.reply({
						embeds: [errEmbed]
					});
					return;
			}
		} 
		if(channel.type !== ChannelType.DM && command.permissions.bot){
			const requiredPerms = PermissionsBitField.resolve(command.permissions.bot).toString() || null,
			me = await guild.members.fetch(client.user.id);
			if(!me.permissions.has(requiredPerms)) {
				errEmbed.setDescription('❌ | I do not have required permissions to execute this command.')
				message.reply({
					embeds: [errEmbed]
				});
				return;
		}
	};
			try {
				command.execute(client, message, args);
		  } catch (err) {
		logger.logForError(err, 'CLIENT');
	  }
	},
};