const databases = require('./database');

module.exports = (app) => {
  app.use('/database', databases);
}
