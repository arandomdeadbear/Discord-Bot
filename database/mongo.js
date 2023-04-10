const { connect, set } = require('mongoose'),
logger = require('@util/logger');

(async () => {
  await set('strictQuery', true);
  await connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).catch(err => {
    logger.logForError(err, 'DATABASE');
  });
})();