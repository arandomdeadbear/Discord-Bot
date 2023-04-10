const { 
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = {
	name: 'button',
	description: 'button test command',
	type: 1,
	options: [],
	permissions: ['SendMessages'],
	async execute(client, interaction) {
        await interaction.deferReply();
        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('previous')
            .setDisabled(true)
            .setEmoji('◀️')
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId('next')
            .setEmoji('▶️')
            .setStyle(ButtonStyle.Primary),
        )
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setColor('Random')
                .setDescription('This is the first page of an embed.')
            ],
            components: [buttons]
        });
	},
};