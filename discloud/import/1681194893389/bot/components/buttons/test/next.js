const { 
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = {
    id: 'next',
    async execute(client, interaction) {
        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('previous')
            .setEmoji('◀️')
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId('next')
            .setDisabled(true)
            .setEmoji('▶️')
            .setStyle(ButtonStyle.Primary),
            )
            await interaction.update({
            embeds: [
                new EmbedBuilder()
                .setColor('Random')
                .setDescription('This is the 2nd page of the embed.')
            ],
            components: [buttons]
        });
    },
};