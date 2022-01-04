import query from 'mongoose-paginate-v2';
import mongoose from 'mongoose';
import config from './config';
import logger from './logger';

/* ---------------------------------------- */
/* Mongoose Paginate default options        */
/* ---------------------------------------- */

// adapted from https://www.npmjs.com/package//mongoose-paginate-v2
// const paginateOptionLabels = {
//   totalDocs: 'total',
//   docs: 'result',
//   page: 'current',
//   nextPage: 'next',
//   prevPage: 'prev',
//   totalPages: 'pages',
// };

const options = {
  page: 1,
  limit: 20,
  // customLabels: paginateOptionLabels, Deprecating this because of the Types in PaginateResult<T>
};

/* Set paginate options globally */
query.paginate.options = {
  ...options,
};

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
