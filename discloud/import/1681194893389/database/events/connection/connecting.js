const logger = require('@util/logger');

module.exports = {
  name: 'connecting',
  execute() {
    logger.info('database is trying to connect', 'DATABASE');
  },
};
