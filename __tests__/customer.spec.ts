/* Mongo database setup */
import { TestDbConnection } from './setup/db';
const db = new TestDbConnection();

/* Requirements */
import req from 'supertest';
import server from './setup/entry.server';
import faker from 'faker/locale/en';
// import config from '../src/infra/config';
import * as routes from './setup/routes';
import { customerToken, employeeToken, subscriberToken } from './setup/claims.mock';
import { AuthSignupRequest, CustomerProfileDTO, UserType } from '../src/app/shared/contracts';

const fakeUserPayload: AuthSignupRequest = {
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
let fakeValidUserId: string;
/* ---------- Hooks ----------  */
beforeAll(async (done) => {
  // await db connection then exec setup
  db.connect().then(async () => {
    /**
     * CREATE CUSTOMER ACCOUNT FOR TESTS
     */
    await req(server)
      .post(routes.signupRoute)
      .send(fakeUserPayload)
      .then(async (res) => {
        if (!res.body.nextRoute) throw new Error('cant setup customer account');
      });

    /**
     * LOGIN CUSTOMER AND SAVE THE USER_ID
     */
    const { email, password } = fakeUserPayload;
    const res = await req(server).post(routes.loginRoute).send({ email, password });

    fakeValidUserId = res.body.profile.user_id;

    done();
  });
}, 30000);

afterAll(async (done) => {
  await db.disconnect(done);
  done();
});
/* ---------- Hooks ----------  */

/*mmmmmmmmmmmmmmmmmmmmmmmmmmmm*
 *   TESTS ON GET ROUTE
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/
describe('When Reading Customer Profile', () => {
  it('cannot read customer profile without token', async (done) => {
    const res = await req(server).get(`${routes.customerRoute}/${fakeValidUserId}`);

    /* test requirements */
    expect(res.status).toEqual(401);
    expect(res.body.name).toEqual('Unauthorized Error');
    expect(res.body.message).toEqual('Bearer Token must be in authorization header');
    expect(res.body.status).toEqual(401);
    done();
  });
  it('customers can read their profile', async (done) => {
    const res = await req(server)
      .get(`${routes.customerRoute}/${fakeValidUserId}`)
      .set('Authorization', `Bearer ${customerToken}`);

    const expectedResponse = { userId: fakeValidUserId, ...fakeUserPayload.customer } as CustomerProfileDTO;

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('successfully returned customer');
    expect(res.body.result).toEqual(expectedResponse);
    done();
  });
  it('invalid userId returns not found', async (done) => {
    const res = await req(server)
      .get(`${routes.customerRoute}/60c35a10043a433bfcc4988f`)
      .set('Authorization', `Bearer ${customerToken}`);
    expect(res.status).toEqual(404);
    expect(res.body.name).toEqual('Not Found Error');
    expect(res.body.status).toEqual(404);
    done();
  });
  it('employee cannot read customer profile', async (done) => {
    const res = await req(server)
      .get(`${routes.customerRoute}/${fakeValidUserId}`)
      .set('Authorization', `Bearer ${employeeToken}`);

    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(`Access is denied for request on GET /test/customers/${fakeValidUserId}`);
    done();
  });
  it('subscriber cannot read customer profile', async (done) => {
    const res = await req(server)
      .get(`${routes.customerRoute}/${fakeValidUserId}`)
      .set('Authorization', `Bearer ${subscriberToken}`);

    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(`Access is denied for request on GET /test/customers/${fakeValidUserId}`);
    done();
  });
});

/*mmmmmmmmmmmmmmmmmmmmmmmmmmmm*
 *   TESTS ON PATCH ROUTE
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/
describe('When Updating Customer Profile', () => {
  it('cannot update customer profile without token', async (done) => {
    const res = await req(server).patch(`${routes.customerRoute}/${fakeValidUserId}`).send({});

    /* test requirements */
    expect(res.status).toEqual(401);
    expect(res.body.name).toEqual('Unauthorized Error');
    expect(res.body.message).toEqual('Bearer Token must be in authorization header');
    expect(res.body.status).toEqual(401);
    done();
  });
  it('customers can read their profile', async (done) => {
    const res = await req(server)
      .patch(`${routes.customerRoute}/${fakeValidUserId}`)
      .set('Authorization', `Bearer ${customerToken}`);

    const expectedResponse = { userId: fakeValidUserId, ...fakeUserPayload.customer } as CustomerProfileDTO;

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('successfully updated customer');
    expect(res.body.result).toEqual(expectedResponse);
    done();
  });
  it('invalid userId returns not found', async (done) => {
    const res = await req(server)
      .patch(`${routes.customerRoute}/60c35a10043a433bfcc4988f`)
      .set('Authorization', `Bearer ${customerToken}`);
    expect(res.status).toEqual(404);
    expect(res.body.name).toEqual('Not Found Error');
    expect(res.body.status).toEqual(404);
    done();
  });
  it('employee cannot read customer profile', async (done) => {
    const res = await req(server)
      .patch(`${routes.customerRoute}/${fakeValidUserId}`)
      .set('Authorization', `Bearer ${employeeToken}`);

    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(`Access is denied for request on PATCH /test/customers/${fakeValidUserId}`);
    done();
  });
  it('subscriber cannot read customer profile', async (done) => {
    const res = await req(server)
      .patch(`${routes.customerRoute}/${fakeValidUserId}`)
      .set('Authorization', `Bearer ${subscriberToken}`);

    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(`Access is denied for request on PATCH /test/customers/${fakeValidUserId}`);
    done();
  });
});
