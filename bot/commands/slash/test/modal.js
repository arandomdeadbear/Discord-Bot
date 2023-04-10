const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: 'modal',
    description: 'modal test command.',
    type: 1,
    options: [],
    permissions:['SendMessages'],
    async execute (client, interaction) {
        const modal = new ModalBuilder()
        .setCustomId('test_modal')
        .setTitle('TEST MODAL'),
        color = new ActionRowBuilder()
        .addComponents(
             new TextInputBuilder()
            .setCustomId('color')
            .setPlaceholder('RED')
            .setRequired(true)
            .setLabel('What is your favourite color?')
            .setStyle(TextInputStyle.Short)

        ),
        bio = new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
            .setCustomId('bio')
            .setLabel('Tell us more about you.')
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(20)

        );
        modal.addComponents(color, bio);
        await interaction.showModal(modal);
    },
};