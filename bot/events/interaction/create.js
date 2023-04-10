const { Events } = require('discord.js'),
logger = require('@util/logger');

module.exports = {
  name: Events.InteractionCreate,
	once: false,
  async execute(client, interaction) {
    if (interaction.isChatInputCommand()) {
      const command = client.slash_commands.get(interaction.commandName);
      if (!command) return;
      try {
        command.execute(client, interaction);
      } catch (err) {
        logger.logForError(err, 'SLASH');
      }
    } else if (interaction.isButton()) {
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
    } else if(interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId);
      if(!modal) return;
      try {
        modal.execute(client, interaction);
      } catch (err) {
        logger.logForError(err, 'MODAL');
      }
    } else if(interaction.isUserContextMenuCommand()) {
      const command = client.user_commands.get(interaction.commandName);
      if(!command) return;
      try {
        command.execute(client, interaction);
      } catch (err) {
        logger.logForError(err, 'USER COMMAND')
      }
    } else if(interaction.isMessageContextMenuCommand()) {
      const command = client.message_commands.get(interaction.commandName);
      if(!command) return;
      try {
        command.execute(client, interaction);
      } catch (err) {
        logger.logForError(err, 'MESSAGE CMD')
      }
    } else {
      return;
    }
  },
};
