import { AuthLoginResponse, AuthSignupRequest, UserType } from '../src/app/shared/contracts/auth.contracts';
// import jwt from 'jsonwebtoken';
import req from 'supertest';
import faker from 'faker/locale/en';
import server from './setup/entry.server';
import * as route from './setup/routes';
import { IJWTClaim, IJWTClaimConf } from '../src/app/shared/definitions';
import { TestDbConnection } from './setup/db';

const db = new TestDbConnection();
export type TClaim = IJWTClaim & IJWTClaimConf;

const user = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  password: faker.internet.password(),
  type: UserType.CUSTOMER,
  customer: {
    address: faker.address.streetAddress(),
    state: faker.address.state(),
    phone: faker.phone.phoneNumber(),
    city: faker.address.city(),
    zip: faker.address.zipCode(),
  },
};
const businessAcc = {
  ...user,
  email: faker.internet.email(),
  password: faker.internet.password(),
  type: UserType.BUSINESS,
  business: {
    ...user.customer,
    businessName: faker.company.companyName(),
    rootEmail: faker.internet.email(),
  },
  customer: undefined,
};

/* ---------- Hooks ----------  */
beforeAll(async (done) => {
  // await db connection then exec setup
  db.connect().then(async (stat) => {
    console.log('DB CONNECT STAT', stat);
    /* setup a customer account */
    await req(server)
      .post(route.signupRoute)
      .send(user)
      .then(async (res) => {
        if (!res.body.nextRoute) throw new Error('cant setup customer account');

        /* setup a business account */
        await req(server)
          .post(route.signupRoute)
          .send(businessAcc)
          .then((res) => {
            if (!res.body.nextRoute) throw new Error('cant setup business account');
          });
      });
    done();
  });
}, 30000);

afterAll(async (done) => {
  await db.disconnect(done);
  // done();
});
/* ---------- Hooks ----------  */

describe('User Login Workflow', () => {
  it('should successfully login customer with correct credentials', async (done) => {
    const { email, password } = user;
    const res = await req(server).post(route.loginRoute).send({ email, password });
    const body = res.body as AuthLoginResponse;

    expect(body.accessToken).toBeDefined();
    expect(body.accessToken).toBeTruthy();
    expect(body.scope).toEqual(user.type);
    done();
  });

  it('return user profile in login response', async (done) => {
    const { email, password } = businessAcc;
    const res = await req(server).post(route.loginRoute).send({ email, password });

    expect(res.body.scope).toEqual('business');
    expect(res.body.profile.business).toBeTruthy();
    expect(res.body.profile.subscriber_id).toBeDefined();
    expect(res.body.profile.email).toBeDefined();
    expect(res.body.profile.name).toBeDefined();
    expect(res.body.profile.role).toBeDefined();
    done();
  });

  // it('create permission rules & token with business scopein JWT', async (done) => {
  //   const { email, password } = businessAcc;
  //   const res = await req(server).post(route.loginRoute).send({ email, password });
  //   const token = jwt.decode(res.body.accessToken) as TClaim;

  //   expect(token.scope).toEqual('business');
  //   expect(token.permissions).toBeDefined();
  //   expect(token.profile.business).toBeTruthy();
  //   expect(token.profile.subscriber_id).toBeDefined();
  //   expect(token.aud).toBeDefined();
  //   expect(token.iss).toBeDefined();
  //   done();
  // });

  // it('create permission and access token for customer scopein JWT', async (done) => {
  //   const { email, password } = user;
  //   const res = await req(server).post(route.loginRoute).send({ email, password });
  //   const token = jwt.decode(res.body.accessToken) as TClaim;

  //   expect(token.scope).toEqual('customer');
  //   expect(token.permissions).toBeDefined();
  //   expect(token.profile.business).toBeFalsy();
  //   expect(token.profile.role).toEqual('customer');
  //   expect(token.profile.subscriber_id).toBeNull();
  //   expect(token.aud).toBeDefined();
  //   expect(token.iss).toBeDefined();
  //   done();
  // });

  it('should reject invalid email in credential', async (done) => {
    const { password } = user;
    const res = await req(server).post(route.loginRoute).send({ email: faker.internet.email(), password });

    expect(res.status).toEqual(409);
    expect(res.body.name).toBeDefined();
    expect(res.body.message).toContain('Invalid email or password');
    expect(res.body.status).toEqual(409);
    done();
  });

  it('should reject invalid password in credential', async (done) => {
    const res = await req(server).post(route.loginRoute).send({ email: user.email, password: 'rudimentary' });

    expect(res.status).toEqual(409);
    expect(res.body.name).toBeDefined();
    expect(res.body.message).toContain('Login Credentials are incorrect');
    expect(res.body.status).toEqual(409);
    done();
  });
});
