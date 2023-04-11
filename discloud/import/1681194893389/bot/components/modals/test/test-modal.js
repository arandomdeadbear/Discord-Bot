const { EmbedBuilder } = require('discord.js');

module.exports = {
    id: 'test_modal',
    async execute (client, interaction) {
        const { fields } = interaction,
        color = fields.getTextInputValue('color'),
        bio = fields.getTextInputValue('bio');
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor('Random')
                .setDescription(`Your Modal was submitted successfully.\n**FAVOURITE COLOR:** \`\`\`${color}\`\`\`\n**BIO:**\n\`\`\`${bio}\`\`\``)
            ]
        });
    },
};