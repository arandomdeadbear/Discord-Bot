const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

module.exports = {
	name: 'menu',
	description: 'select menu test command.',
	type: 1,
	options: [],
	permissions: ['SendMessages'],
	async execute(client, interaction) {
        await interaction.deferReply();
        const menu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('test_menu')
            .setPlaceholder('select your preferable language.')
            .addOptions(
                {
                    label: 'JavaScript',
                    description: 'JavaScript is cool.',
                    value: 'js'
                },
                {
                    label: 'TypeScript',
                    description: 'Typescript is more cool.',
                    value: 'ts'
                }
            )
        ),
        embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('Language Selector')
        .setDescription('Select your favourite programming language.');
        await interaction.editReply({
            embeds: [embed],
            components: [menu]
        });
	},
};