import {
  // AuthForgotPasswordResponse,
  AuthSignupRequest,
  UserType,
} from '../src/app/shared/contracts/auth.contracts';
import req from 'supertest';
import faker from 'faker/locale/en';
import server from './setup/entry.server';
import * as route from './setup/routes';
import { TestDbConnection } from './setup/db';

const db = new TestDbConnection();

const user: AuthSignupRequest = {
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

/* ---------- Hooks ----------  */

beforeAll(async (done) => {
  // await db connection then exec setup
  db.connect().then(async (stat) => {
    console.log(stat);
    await req(server)
      .post(route.signupRoute)
      .send(user)
      .then((res) => {
        if (!res.body.nextRoute) throw new Error('cant setup user');
      });
    done();
  });
});

afterAll(async (done) => {
  await db.disconnect(done);
});

/* ---------- Hooks ----------  */

describe('User Forgot Password Workflow', () => {
  // it('create user access', async (done) => {
  //   const res = await req(server).post(signupRoute).send(user);
  //   expect(res.body.scope).toEqual(user.type);
  //   expect(res.body.nextRoute).toBeTruthy();
  //   expect(res.body.nextRoute).toBeTruthy();
  //   done();
  // });

  // it('should successfully send password reset notification', async (done) => {
  //   const { email } = user;
  //   const res = await req(server).post(forgotRoute).send({ email });
  //   const body = res.body as AuthForgotPasswordResponse;

  //   expect(body.email).toBeDefined();
  //   expect(body.message).toBeTruthy();
  //   expect(body.message).toEqual('Processing Forgot password request');
  //   expect(body.email).toEqual(user.email);
  //   done();
  // });

  // it('should fail operation if forgot passwor request email is invalid', async (done) => {
  //   const res = await req(server)
  //     .post(forgotRoute)
  //     .send({ email: 'blab' + faker.internet.email() });
  //   expect(res.body.message).toContain('User account not found');
  //   expect(res.body.status).toEqual(409);
  //   done();
  // });

  it('should ensure passwords in request match', async (done) => {
    // const { email } = user as AuthResetPasswordRequest;
    // const res = await req(server).post(forgotRoute).send({ email });
    // const body = res.body as AuthForgotPasswordResponse;

    // expect(body.email).toBeDefined();
    // expect(body.message).toBeTruthy();
    // expect(body.message).toEqual('Processing Forgot password request');
    // expect(body.email).toEqual(user.email);
    done();
  });

  it('should not allow reuse of previous password', async (done) => {
    done();
  });
  it('should ensure reset password token is valid', async (done) => {
    done();
  });
  it('should fail operation once token has been used', async (done) => {
    done();
  });
});
