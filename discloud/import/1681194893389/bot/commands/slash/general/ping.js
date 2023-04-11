module.exports = {
	name: 'ping',
	description: 'Replies with pong.',
	type: 1,
	options: [],
	permissions: ['SendMessages'],
	async execute(client, interaction) {
        await interaction.reply({
            content: 'pong!',
            ephemeral: true
        });
	},
};