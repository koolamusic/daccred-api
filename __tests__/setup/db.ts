// https://github.com/nodkz/mongodb-memory-server#simple-jest-test-example

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoMemoryServerOptsT } from 'mongodb-memory-server-core/lib/MongoMemoryServer';
import { ConnectDbInterface, TCallbackFunction } from '../../src/app/shared/definitions';
import config from '../../src/infra/config';
import logger from '../../src/infra/logger';

/* ------------------------------------------------------------ */
/* ----------------- remote db server configuration ----------- */
/* ------------------------------------------------------------ */
async function connectRemoteDb() {
  await mongoose
    .connect(config.mongoUri, {
      useNewUrlParser: true,
      dbName: 'testdb_auth_service',
      useUnifiedTopology: true,
      useCreateIndex: true,
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

  constructor(__opts__?: MongoMemoryServerOptsT) {
    this.mongoServer = new MongoMemoryServer({
      binary: {
        version: 'latest',
        // downloadDir: '.mongo-ms',
      },
      ...__opts__,
    });
  }

  // async connect() {
  //   const mongoUri = await this.mongoServer.getUri();

  //   /* Establish DB connection to mongo memory server */
  //   return await mongoose
  //     .connect(mongoUri, {
  //       reconnectTries: Number.MAX_VALUE,
  //       reconnectInterval: 1000,
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     })
  //     .then(() => console.log('Mongo Test Database connected'))
  //     .catch((err) => console.log(err))
  // }

  async connect() {
    this.mongoose.Promise = Promise;
    this.mongoServer.getUri().then((mongoUri) => {
      const mongooseOpts = {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      this.mongoose.connect(mongoUri, mongooseOpts);

      this.mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          console.log(e);
          this.mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log(e);
      });

      this.mongoose.connection.once('open', () => {
        console.log(`MongoDB Memory Server successfully connected to ${mongoUri}`);
      });
    });
  }

  async disconnect(doneCallback: TCallbackFunction) {
    await this.mongoose.connection.close();
    await this.mongoose.disconnect();

    await this.mongoServer.stop();
    const instanceInfo = this.mongoServer.getInstanceInfo();
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
