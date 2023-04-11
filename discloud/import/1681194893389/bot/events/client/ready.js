const { Events } = require('discord.js'),
logger = require('@util/logger');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        logger.info(`${client.user.username.toLowerCase()} is online.`, 'CLIENT');
    },
};