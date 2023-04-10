const {
    Client,
    GatewayIntentBits,
    Collection,
    Partials
} = require('discord.js'),
logger = require('@util/logger'),
client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.User,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.ThreadMember,
        Partials.GuildScheduledEvent,
    ],
    allowedMentions: {
        parse: ['everyone', 'roles', 'users'],
        repliedUser: false,
      },
      restRequestTimeout: 20000,
});

module.exports = client;

client.events = new Collection();
client.commands = new Collection();
client.slashes = new Collection();
client.buttons = new Collection();
client.menus = new Collection();

[
    'event',
    'command',
    'slash',
    'component',
    'mongo'
].forEach(file => {
    require(`./functions/handlers/${file}`)(client);
});

client.login(process.env.TOKEN).catch(() => {
    logger.error('could not log into the bot, check your token and try again', 'CLIENT');
});