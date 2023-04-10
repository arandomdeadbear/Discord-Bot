const logger = require('@util/logger');

module.exports = {
  name: 'disconnected',
  execute() {
    logger.error('database was disconnected', 'DATABASE');
  },
};
