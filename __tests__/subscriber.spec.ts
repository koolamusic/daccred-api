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
import { SubscriberProfileDTO } from '../src/app/shared/contracts';

/* ---------- Hooks ----------  */
beforeAll(async (done) => {
  await db.connect().then(() => done());
}, 30000);

afterAll(async (done) => {
  await db.disconnect(done);
  done();
});
/* ---------- Hooks ----------  */

const fakeSubscriberRequestPayload = {
  subscriberId: faker.datatype.uuid(),
  ownerId: faker.datatype.uuid(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  rootEmail: faker.internet.email(),
  subscriptionId: faker.datatype.uuid(),
  businessName: faker.company.companyName(),
};

let fakevalidOwnerId: string;

let fakeSubscriberProfileResponse: SubscriberProfileDTO;

const fakeObjectId = '60c35a10043a433bfcc4988f';

/*mmmmmmmmmmmmmmmmmmmmmmmmmmmm*
 *   TESTS ON POST ROUTE
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/
describe('When Creating Subscribers Account', () => {
  it('cannot create subscriber without token', async (done) => {
    const res = await req(server).post(routes.subscriberRoute);

    /* test requirements */
    expect(res.status).toEqual(401);
    expect(res.body.name).toEqual('Unauthorized Error');
    expect(res.body.message).toEqual('Bearer Token must be in authorization header');
    expect(res.body.status).toEqual(401);
    done();
  });
  it('subscriber can create subscriber account', async (done) => {
    const res = await req(server)
      .post(routes.subscriberRoute)
      .set('Authorization', `Bearer ${subscriberToken}`)
      .send({
        ...fakeSubscriberRequestPayload,
      });

    fakevalidOwnerId = res.body.result;

    expect(res.status).toEqual(201);
    expect(res.body.message).toEqual('Successfully Created Subscriber');
    expect(res.body.result).toEqual(fakevalidOwnerId);
    done();
  });
  it('subscriber cannot create multiple subscriber accounts with the same payload', async (done) => {
    const res = await req(server)
      .post(routes.subscriberRoute)
      .set('Authorization', `Bearer ${subscriberToken}`)
      .send({
        ...fakeSubscriberRequestPayload,
      });
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual('Subscriber Already Exist');
    done();
  });
  it('employee cannot subscriber account', async (done) => {
    const res = await req(server)
      .post(routes.subscriberRoute)
      .set('Authorization', `Bearer ${employeeToken}`)
      .send({
        ...fakeSubscriberRequestPayload,
      });
    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual('Access is denied for request on POST /test/subscribers');
    done();
  });
  it('customer cannot subscriber account', async (done) => {
    const res = await req(server)
      .post(routes.subscriberRoute)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        ...fakeSubscriberRequestPayload,
      });
    expect(res.status).toEqual(403);
    expect(res.body.message).toEqual('Access is denied for request on POST /test/subscribers');
    done();
  });
});

/*mmmmmmmmmmmmmmmmmmmmmmmmmmmm*
 *   TESTS ON GET ROUTE
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/
describe('When Reading Merchants Profile', () => {
  it('cannot read without token', async (done) => {
    const res = await req(server).get(`${routes.subscriberRoute}/${fakevalidOwnerId}`);

    expect(res.status).toEqual(401);
    expect(res.body.name).toEqual('Unauthorized Error');
    expect(res.body.message).toEqual('Bearer Token must be in authorization header');
    expect(res.body.status).toEqual(401);

    done();
  });
  it('can read subscriber profile', async (done) => {
    const res = await req(server)
      .get(`${routes.subscriberRoute}/${fakevalidOwnerId}`)
      .set('Authorization', `Bearer ${subscriberToken}`);

    fakeSubscriberProfileResponse = fakeSubscriberRequestPayload;

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('Successfully Returned Subscriber');
    expect(res.body.result).toEqual(fakeSubscriberProfileResponse);
    done();
  });
  it('employee can read subscriber profile', async (done) => {
    const res = await req(server)
      .get(`${routes.subscriberRoute}/${fakevalidOwnerId}`)
      .set('Authorization', `Bearer ${employeeToken}`);

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('Successfully Returned Subscriber');
    expect(res.body.result).toEqual(fakeSubscriberProfileResponse);
    done();
  });

  it('invalid ownerId returns not found', async (done) => {
    const res = await req(server)
      .get(`${routes.subscriberRoute}/${fakeObjectId}`)
      .set('Authorization', `Bearer ${subscriberToken}`);
    expect(res.status).toEqual(404);
    expect(res.body.message).toEqual('Subscriber Does not Exist');
    expect(res.body.name).toEqual('Not Found Error');
    done();
  });

  it('customer cannot read subscriber profile', async (done) => {
    const res = await req(server)
      .get(`${routes.subscriberRoute}/${fakevalidOwnerId}`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(`Access is denied for request on GET /test/subscribers/${fakevalidOwnerId}`);
    done();
  });
});

/*mmmmmmmmmmmmmmmmmmmmmmmmmmmm*
 *   TESTS ON PATCH ROUTE
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/

describe('When Updating Subscriber Profile', () => {
  it('cannot update without token', async (done) => {
    const res = await req(server).patch(`${routes.subscriberRoute}/${fakevalidOwnerId}`);

    expect(res.status).toEqual(401);
    expect(res.body.name).toEqual('Unauthorized Error');
    expect(res.body.message).toEqual('Bearer Token must be in authorization header');
    expect(res.body.status).toEqual(401);

    done();
  });
  it('subscriber can update subscriber profile', async (done) => {
    const res = await req(server)
      .patch(`${routes.subscriberRoute}/${fakevalidOwnerId}`)
      .set('Authorization', `Bearer ${subscriberToken}`)
      .send({ city: 'Evans City' });

    fakeSubscriberProfileResponse = { ...fakeSubscriberRequestPayload, city: 'Evans City' };

    expect(res.status).toEqual(201);
    expect(res.body.message).toEqual('Successfully Updated Subscriber');
    expect(res.body.result).toEqual(fakeSubscriberProfileResponse);
    done();
  });
  it('invalid merchantId returns not found', async (done) => {
    const res = await req(server)
      .patch(`${routes.subscriberRoute}/${fakeObjectId}`)
      .set('Authorization', `Bearer ${subscriberToken}`);
    expect(res.status).toEqual(404);
    expect(res.body.message).toEqual('Subscriber Does not Exist');
    expect(res.body.name).toEqual('Not Found Error');
    done();
  });
  it('employee cannot update subscriber profile', async (done) => {
    const res = await req(server)
      .patch(`${routes.subscriberRoute}/${fakevalidOwnerId}`)
      .set('Authorization', `Bearer ${employeeToken}`);

    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(`Access is denied for request on PATCH /test/subscribers/${fakevalidOwnerId}`);
    done();
  });
  it('customer cannot update subscriber profile', async (done) => {
    const res = await req(server)
      .patch(`${routes.subscriberRoute}/${fakevalidOwnerId}`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(`Access is denied for request on PATCH /test/subscribers/${fakevalidOwnerId}`);
    done();
  });
});
