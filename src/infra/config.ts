/* require dotenv and determine whether we output debug logs based on env vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ debug: process.env.DEBUG });
/* ------------------------------------------------------- */

const dev = {
  serviceName: 'Accred Blockchain Credential',
  mongoUri: 'mongodb://localhost:27017',
  PORT: process.env.PORT || 8080,
  HOST: process.env.HOST || 'localhost',
  API_VERSION: '/v1',
  TEST_API_PREFIX: '/test',
  SECRET_KEY: 'H^shD^ModFvck!n9!N!gha',
  JWT_ISSUER: 'chain-credentials-app',
  JWT_AUD: 'https://app.daccred.co',
  JWT_ALGO: 'HS256',
  TOKEN_EXPIRE: 4.32e7,
  SUPERADMIN_TOKEN: 'SVzF3Ykc5NVpXVWlMREFzTVpTeDFjR1JoZEdVc1pHVnNaWFJszVVHRjViV1Z1Z',
};

const prod = {
  ...dev,
  mongoUri: process.env.MONGO_URI as string,
  SECRET_KEY: process.env.SECRET_KEY as string,
  SUPERADMIN_TOKEN: process.env.SUPERADMIN_TOKEN as string,
};

const environment = {
  test: dev,
  local: dev,
  development: dev,
  production: prod,
};

export default environment[process.env.NODE_ENV as 'development' | 'production'];
