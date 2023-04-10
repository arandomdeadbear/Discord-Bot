const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    type: 2,
    async execute (client, interaction) {
        await interaction.deferReply({ ephemeral: true });
        const { targetId, guild } = interaction,
        member = guild.members.cache.get(targetId);
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setColor('Random')
                .setTitle(`${member.user.username}'s Avatar.`)
                .setImage(member.user.displayAvatarURL({
                    dynamic: true,
                    size: 2048  //16, 32, 64, 128, 256, 512, 1024, 2048, 4096
                }))
            ]
        });
    },
};