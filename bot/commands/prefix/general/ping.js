module.exports = {
	name: 'ping',
    aliases: ['ws'],
    description: 'returns client websocket.',
    category: 'general',
    guild_only: false,
    dev_only: false,
    owner_only: false,
    permissions: {
        member: ['SendMessages'],
        bot: ['SendMessages']
    },
    timeout: 3000,
	async execute(client, message, args) {
        message.reply({
            content: 'pong!'
        });
	},
};