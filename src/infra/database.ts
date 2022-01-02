import mongoose from 'mongoose';
import config from './config';
import logger from './logger';

mongoose.connect(config.mongoUri, {
  dbName: 'daccred',
  autoIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  logger.debug('connected to daccred database');
});

export default db;
