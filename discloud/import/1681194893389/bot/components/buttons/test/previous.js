const { 
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = {
    id: 'previous',
    async execute(client, interaction) {
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
            await interaction.update({
            embeds: [
                new EmbedBuilder()
                .setColor('Random')
                .setDescription('This is the first page of an embed.')
            ],
            components: [buttons]
        });
    },
};