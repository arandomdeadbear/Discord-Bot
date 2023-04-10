const logger = require('@util/logger');

module.exports = {
    name: 'say',
    type: 3,
    async execute (client, interaction) {
        await interaction.deferReply({ ephemeral: true });
        const { targetId, channel } = interaction;
        await channel.messages.fetch(targetId).then(async (msg) => {
            channel.send({
                content: msg.content.toString()
            });
            await interaction.editReply({
                content: 'Sent the response.'
            })
        }).catch(err => {
            logger.logForErr(err, 'CLIENT');
        })
    },
};