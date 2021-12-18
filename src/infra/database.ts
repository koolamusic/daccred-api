import mongoose from 'mongoose';
import config from './config';
import logger from './logger';

mongoose.connect(config.mongoUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: 'authenticator',
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  logger.debug('connected to titan database');
});

export default db;
