const logger = require('@util/logger');

module.exports = {
  name: 'connected',
  execute() {
    logger.info('database connected successfully', 'DATABASE');
  },
};
