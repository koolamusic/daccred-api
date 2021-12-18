const mongoose = require('mongoose');
import database from '../../src/infra/database';
import config from '../../src/infra/config';
// const databaseName = 'test';

beforeEach((done) => {
  database.once('open', () => {
    done();
  });
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

// root hook to run before every test (even in other files)
beforeAll(async function () {
  const url = `${config.mongoUri}/test-database`;
  await mongoose.connect(url, { useNewUrlParser: true });
  // mongoose.models = {};
  // mongoose.modelSchemas = {};
  // exec('kill $(lsof -t -i:3000)')
  // doMySetup();
});

// root hook to run after every test (even in other files)
afterAll(function () {
  // console.log("basic setups")
  // doMyTeardown();
});

// beforeAll(async () => {
//   database.useDb('test-signup')
//   const UserSchema = buildSchema(UserCollection);
//   UserModel = mongoose.model("user-test-c", UserSchema);
// })

// afterAll(async () => {
//   await UserModel.db.dropCollection('test-signup')
//   await mongoose.connection.close()
// });
