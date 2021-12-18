import { AuthSignupRequest, UserType } from '../src/app/shared/contracts/auth.contracts';
import req from 'supertest';
import server from './setup/entry.server';
import faker from 'faker/locale/en';
import { signupRoute as route } from './setup/routes';
import { TestDbConnection } from './setup/db';

const db = new TestDbConnection();

const businessMock: AuthSignupRequest = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  password: faker.internet.password(),
  type: UserType.BUSINESS,
  business: {
    address: faker.address.streetAddress(),
    businessName: faker.company.companyName(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    phone: faker.phone.phoneNumber(),
    rootEmail: faker.internet.email(),
  },
};

const customerMock: AuthSignupRequest = {
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

// const employeeMock: AuthSignupRequest = {
//   name: faker.name.firstName(),
//   email: faker.internet.email(),
//   phone: faker.phone.phoneNumber(),
//   password: faker.internet.password(),
//   type: UserType.EMPLOYEE,
//   employee: {
//     inviteStatus: false,
//     subscriberId: faker.datatype.uuid(),
//   },
// };

/* ---------- Hooks ----------  */

beforeAll(async (done) => {
  await db.connect();
  done();
});

afterAll(async (done) => {
  await db.disconnect(done);
});

/* ---------- Hooks ----------  */

describe('User Signup Workflow', () => {
  it('User should be created on signup', async (done) => {
    const res = await req(server).post(route).send(customerMock);
    expect(res.body.scope).toEqual(customerMock.type);
    expect(res.body.nextRoute).toBeTruthy();
    expect(res.body.nextRoute).toBeTruthy();
    done();
  });

  it('return business scope for business signup request', async (done) => {
    const res = await req(server).post(route).send(businessMock);
    expect(res.body.scope).toEqual('business');
    done();
  });

  // it('return business scope for subscribers employee account', async (done) => {
  //   const res = await req(server).post(route).send(employeeMock);

  //   expect(res.body.nextRoute).toBeDefined();
  //   expect(res.body.email).toBeDefined();
  //   expect(res.body.scope).toEqual('business');
  //   done();
  // });

  it('return customer scope for customer signups', async (done) => {
    let payloadBody = { ...customerMock, email: faker.internet.email() };
    const res = await req(server).post(route).send(payloadBody);

    console.log(res.body);

    expect(res.body.scope).toEqual('customer');
    expect(res.body.email).toEqual(payloadBody.email);
    expect(customerMock.type).toEqual(customerMock.type);
    done();
  });

  it('should throw Validation error on duplicate email', async (done) => {
    const res = await req(server).post(route).send(customerMock);
    expect(res.body.message).toContain('duplicate');

    expect(res.status).toEqual(409);
    expect(res.body.status).toEqual(409);
    expect(res.body.name).toBeDefined();
    done();
  });
});
