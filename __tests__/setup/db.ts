// https://github.com/nodkz/mongodb-memory-server#simple-jest-test-example

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoMemoryServerOpts } from 'mongodb-memory-server-core/lib/MongoMemoryServer';
import { ConnectDbInterface, TCallbackFunction } from '../../src/app/shared/definitions';
import config from '../../src/infra/config';
import logger from '../../src/infra/logger';

/* ------------------------------------------------------------ */
/* ----------------- remote db server configuration ----------- */
/* ------------------------------------------------------------ */
async function connectRemoteDb() {
  await mongoose
    .connect(config.mongoUri, {
      dbName: 'testdb_rs_daccred',
      autoIndex: true,
    })
    .then(() => console.log('TEST DB CONNECTED'))
    .catch((err) => console.log(err));
}

const disconnectRemoteDb = async (doneCallback: TCallbackFunction) => {
  await mongoose.connection.close();
  await mongoose.disconnect();
  doneCallback();
};

/* ------------------------------------------------------------ */
/* ----------------- in memory server configuration ----------- */
/* ------------------------------------------------------------ */

export class InMemoryDatabase implements ConnectDbInterface {
  public mongoServer: MongoMemoryServer;
  public mongoose = mongoose;

  constructor(__opts__?: MongoMemoryServerOpts) {
    this.mongoServer = new MongoMemoryServer({
      binary: {
        version: 'latest',
      },
      ...__opts__,
    });
  }

  async connect() {
    this.mongoose.Promise = Promise;

    /* Get Mongo Server URI and connect mongoose instance */
    const _uri = this.mongoServer.getUri();
    await this.mongoose.connect(_uri, { dbName: 'testdb_memory_mongo' });

    this.mongoose.connection.on('error', (e) => {
      if (e.message.code === 'ETIMEDOUT') {
        console.log(e);
        this.mongoose.connect(_uri);
      }
      console.log(e);
    });

    this.mongoose.connection.once('open', () => {
      console.log(`MongoDB Memory Server successfully connected to ${_uri}`);
    });
  }

  async disconnect(doneCallback: TCallbackFunction) {
    await this.mongoose.connection.close();
    await this.mongoose.disconnect();

    await this.mongoServer.stop();
    const instanceInfo = this.mongoServer.instanceInfo;
    logger.debug(`getting the status of this instance after exit ${instanceInfo}`);
    return !instanceInfo && doneCallback();
  }
}

/* -------- use config based on execution environment ------------ */
export class TestDbConnection extends InMemoryDatabase {
  constructor() {
    super();
    if (process.env.NODE_ENV === 'test') {
      this.connect = connectRemoteDb;
      this.disconnect = disconnectRemoteDb;
    }
  }
}
