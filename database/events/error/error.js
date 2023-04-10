const logger = require('@util/logger');

module.exports = {
  name: 'err',
  execute(err) {
    logger.logForError(err, 'DATABASE');
  },
};
