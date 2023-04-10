const { Events } = require('discord.js'),
logger = require('@util/logger');

module.exports = {
  name: Events.InteractionCreate,
	once: false,
  async execute(client, interaction) {
    if (interaction.isChatInputCommand()) {
      const command = client.slashes.get(interaction.commandName);
      if (!command) return;
      try {
        command.execute(client, interaction);
      } catch (err) {
        logger.logForError(err, 'SLASH');
      }
    } 
    else if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return;
      try {
        button.execute(client, interaction);
      } catch (err) {
        logger.logForError(err, 'BUTTON');
      }
    } else if(interaction.isStringSelectMenu()) {
      const menu = client.menus.get(interaction.customId);
      if(!menu) return;
      try {
        menu.execute(client, interaction);
      } catch (err) {
        logger.logForError(err, 'MENU');
      }
    } else {
      return;
    }
   
  },
};
