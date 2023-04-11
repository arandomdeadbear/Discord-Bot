const { EmbedBuilder } = require('discord.js');

module.exports = {
    id: 'test_menu',
    async execute(client, interaction) {
        const { values } = interaction,
        selected = values[0],
        embed = new EmbedBuilder()
        .setColor('Random');

        if(selected == 'js') {
            embed.setDescription('You selected JavaScript')
            await interaction.update({
                embeds: [embed]
            });
        } else if(selected == 'ts') {
            embed.setDescription('You selected TypeScript')
            await interaction.update({
                embeds: [embed]
            });
        }
    },
};