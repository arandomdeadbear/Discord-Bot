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

client.menus = new Collection();
client.modals = new Collection();
client.events = new Collection();
client.buttons = new Collection();
client.user_commands = new Collection();
client.slash_commands = new Collection();
client.prefix_commands = new Collection();
client.message_commands = new Collection();

[
    'event',
    'command',
    'application',
    'component',
    'mongo'
].forEach(file => {
    require(`./functions/handlers/${file}`)(client);
});

client.login(process.env.TOKEN).catch(() => {
    logger.error('could not log into the bot, check your token and try again', 'CLIENT');
});