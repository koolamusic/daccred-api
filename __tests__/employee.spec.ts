/* Mongo database setup */
import { TestDbConnection } from './setup/db';
const db = new TestDbConnection();

/* Requirements */
import req from 'supertest';
import server from './setup/entry.server';
import faker from 'faker/locale/en';
import * as routes from './setup/routes';
import { customerToken, employeeToken, subscriberToken, subscriberClaim } from './setup/claims.mock';
import { CreateEmployeeRequest, EmployeeInviteStatus, UpdateEmployeeRequest } from '../src/app/shared/contracts';

const {
  profile: { subscriber_id },
} = subscriberClaim;

/* ---------- Hooks ----------  */
beforeAll(async (done) => {
  // await db connection then exec setup
  db.connect().then(async () => {
    done();
  });
}, 3000);

afterAll(async (done) => {
  await db.disconnect(done);
  done();
});
/* ---------- Hooks ----------  */

const fakeEmployeeRequestPayload: CreateEmployeeRequest = {
  email: faker.internet.email(),
  name: faker.name.firstName(),
  phone: faker.phone.phoneNumber(),
};

const updateEmployeePayload: UpdateEmployeeRequest = {
  inviteStatus: EmployeeInviteStatus.ACCEPTED,
  invitedBy: faker.datatype.uuid(),
};

const fakeObjectId = '60c35a10043a433bfcc4988f';

/*mmmmmmmmmmmmmmmmmmmmmmmmmmmm*
 *   TESTS ON POST ROUTE
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/

describe("When Creating Employee's Account", () => {
  it('cannot create employee account without token', async (done) => {
    const res = await req(server).post(routes.employeeRoute);

    /* test requirements */
    expect(res.status).toEqual(401);
    expect(res.body.name).toEqual('Unauthorized Error');
    expect(res.body.message).toEqual('Bearer Token must be in authorization header');
    expect(res.body.status).toEqual(401);
    done();
  });
  it('Employee payload is required to create employee account', async (done) => {
    const res = await req(server).post(routes.employeeRoute).set('Authorization', `Bearer ${subscriberToken}`);

    expect(res.status).toEqual(400);
    expect(res.body.name).toEqual('BadRequestError');
    expect(res.body.message).toEqual("Invalid body, check 'errors' property for more info.");
    done();
  });
  it('subscriber can create employee account', async (done) => {
    const res = await req(server)
      .post(routes.employeeRoute)
      .set('Authorization', `Bearer ${subscriberToken}`)
      .send({
        ...fakeEmployeeRequestPayload,
      });

    expect(res.status).toEqual(201);
    expect(res.body.message).toEqual('Successfully Created Employee');
    expect(res.body.result.name).toEqual(fakeEmployeeRequestPayload.name);
    expect(res.body.result.email).toEqual(fakeEmployeeRequestPayload.email);
    expect(res.body.result.activationToken).toBeDefined();
    done();
  });
  it('cannot create dupicate employee account with the same payload', async (done) => {
    const res = await req(server)
      .post(routes.employeeRoute)
      .set('Authorization', `Bearer ${subscriberToken}`)
      .send({
        ...fakeEmployeeRequestPayload,
      });

    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual('User already registered as an employee of an organization');
    expect(res.body.name).toEqual('Error');
    done();
  });

  it('employees cannot create their account', async (done) => {
    const res = await req(server).post(routes.employeeRoute).set('Authorization', `Bearer ${employeeToken}`);

    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(`Access is denied for request on POST ${routes.employeeRoute}`);
    done();
  });
  it("customer cannot create subscriber's employee account", async (done) => {
    const res = await req(server).post(routes.employeeRoute).set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(`Access is denied for request on POST ${routes.employeeRoute}`);
    done();
  });
});

/*mmmmmmmmmmmmmmmmmmmmmmmmmmmm*
 *   TESTS ON GET ALL ROUTE
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/

describe('When Reading All Subscriber Employeess Accounts', () => {
  it('cannot read all subscriber employees without token', async (done) => {
    const res = await req(server).get(`${routes.employeeRoute}/${subscriber_id}`);

    /* test requirements */
    expect(res.status).toEqual(401);
    expect(res.body.name).toEqual('Unauthorized Error');
    expect(res.body.message).toEqual('Bearer Token must be in authorization header');
    expect(res.body.status).toEqual(401);
    done();
  });
  it('cannot read all subscriber employees without limit param', async (done) => {
    const res = await req(server)
      .get(`${routes.employeeRoute}/${subscriber_id}`)
      .set('Authorization', `Bearer ${subscriberToken}`);

    /* test requirements */
    expect(res.status).toEqual(400);
    expect(res.body.name).toEqual('BadRequestError');
    expect(res.body.message).toContain("Invalid queries, check 'errors' property for more info.");
    expect(res.body.status).toEqual(400);
    done();
  });
  it('subscribers can read all thier employees profiles', async (done) => {
    const res = await req(server)
      .get(`${routes.employeeRoute}/${subscriber_id}?limit=3`)
      .set('Authorization', `Bearer ${subscriberToken}`);

    /* test requirements */
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('Successfully returned all Employees');
    expect(res.body.total).toBeDefined();
    expect(res.body.hasPrevious).toBeDefined();
    expect(res.body.hasNext).toBeDefined();
    expect(res.body.result).toBeDefined();
    expect(res.body.result[0]).toHaveProperty('profile');
    expect(res.body.result[0]).toHaveProperty('invitedBy');
    expect(res.body.result[0]).toHaveProperty('activationToken');
    done();
  });

  it('employees cannot read all subscriber employees ', async (done) => {
    const res = await req(server)
      .get(`${routes.employeeRoute}/${subscriber_id}?limit=3`)
      .set('Authorization', `Bearer ${employeeToken}`);

    /* test requirements */
    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(
      `Access is denied for request on GET ${routes.employeeRoute}/${subscriber_id}?limit=3`
    );
    done();
    done();
  });

  it('customers cannot read all subscriber employees ', async (done) => {
    const res = await req(server)
      .get(`${routes.employeeRoute}/${subscriber_id}?limit=3`)
      .set('Authorization', `Bearer ${customerToken}`);

    /* test requirements */
    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(
      `Access is denied for request on GET ${routes.employeeRoute}/${subscriber_id}?limit=3`
    );
    done();
    done();
  });
});

/*mmmmmmmmmmmmmmmmmmmmmmmmmmmm*
 *   TESTS ON GET  ROUTE
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/

describe('When Reading Employee profile of a Subscriber', () => {
  it("cannot read subscriber's employee profile without token ", async (done) => {
    const res = await req(server).get(`${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`);
    expect(res.status).toEqual(401);
    expect(res.body.name).toEqual('Unauthorized Error');
    expect(res.body.message).toEqual('Bearer Token must be in authorization header');
    expect(res.body.status).toEqual(401);

    done();
  });
  it("subscribers can update thier employee's profile ", async (done) => {
    // Create a user just in case it didn't get created already
    await req(server)
      .patch(routes.employeeRoute)
      .set('Authorization', `Bearer ${subscriberToken}`)
      .send(updateEmployeePayload)
      .then(async () => {
        // get the user detail of the just created employee from the all route
        const data = await req(server)
          .get(`${routes.employeeRoute}/${subscriber_id}?limit=1`)
          .set('Authorization', `Bearer ${subscriberToken}`);

        // Extract the first employee's Id from the request
        const employeeId = data.body.result[0].id;

        const res = await req(server)
          .get(`${routes.employeeRoute}/${subscriber_id}/${employeeId}`)
          .set('Authorization', `Bearer ${subscriberToken}`);

        /* test requirements */
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Successfully returned Employee');
        expect(res.body.result).toBeDefined();
        expect(res.body.result.profile).toBeDefined();
      });

    done();
  });

  it('employees can read thier profile ', async (done) => {
    // Create a user just in case it didn't get created already
    await req(server)
      .patch(routes.employeeRoute)
      .set('Authorization', `Bearer ${subscriberToken}`)
      .send(updateEmployeePayload)
      .then(async () => {
        // get the user detail of the just created employee from the all route
        const data = await req(server)
          .get(`${routes.employeeRoute}/${subscriber_id}?limit=1`)
          .set('Authorization', `Bearer ${subscriberToken}`);

        // Extract the first employee's Id from the request
        const employeeId = data.body.result[0].id;

        const res = await req(server)
          .get(`${routes.employeeRoute}/${subscriber_id}/${employeeId}`)
          .set('Authorization', `Bearer ${employeeToken}`);

        /* test requirements */
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Successfully returned Employee');
        expect(res.body.result).toBeDefined();
        expect(res.body.result.profile).toBeDefined();
      });

    done();
  });

  it('invalid employee Id returns not found ', async (done) => {
    const res = await req(server)
      .get(`${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`)
      .set('Authorization', `Bearer ${subscriberToken}`);

    expect(res.status).toEqual(404);
    expect(res.body.name).toEqual('Not Found Error');
    expect(res.body.message).toEqual('Employee Does not Exist');
    expect(res.body.status).toEqual(404);

    done();
  });
  it("customers cannot read subscriber's employee account", async (done) => {
    const res = await req(server)
      .get(`${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(
      `Access is denied for request on GET ${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`
    );
    expect(res.body.status).toEqual(403);
    done();
  });
});

/*mmmmmmmmmmmmmmmmmmmmmmmmmmmm*
 *   TESTS ON PATCH  ROUTE
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/

describe("When Updating Subscriber's Employee Profile", () => {
  it("cannot update subscriber's employee profile without token ", async (done) => {
    const res = await req(server).patch(`${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`);
    expect(res.status).toEqual(401);
    expect(res.body.name).toEqual('Unauthorized Error');
    expect(res.body.message).toEqual('Bearer Token must be in authorization header');
    expect(res.body.status).toEqual(401);

    done();
  });
  it("cannot update subscriber's Employee without updatePayload", async (done) => {
    const res = await req(server)
      .patch(`${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`)
      .set('Authorization', `Bearer ${subscriberToken}`);

    /* test requirements */
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("Invalid body, check 'errors' property for more info.");
    expect(res.body.name).toEqual('BadRequestError');
    expect(res.body.errors).toBeDefined();

    done();
  });
  it("subscriber can upadate his/her employee's profile ", async (done) => {
    // Create a user just in case it didn't get created already
    await req(server)
      .post(routes.employeeRoute)
      .set('Authorization', `Bearer ${subscriberToken}`)
      .send({
        ...fakeEmployeeRequestPayload,
      })
      .then(async () => {
        // get the user detail of the just created employee from the all route
        const data = await req(server)
          .get(`${routes.employeeRoute}/${subscriber_id}?limit=1`)
          .set('Authorization', `Bearer ${subscriberToken}`);

        // Extract the first employee's Id from the request
        const employeeId = data.body.result[0].id;

        const res = await req(server)
          .patch(`${routes.employeeRoute}/${subscriber_id}/${employeeId}`)
          .send(updateEmployeePayload)
          .set('Authorization', `Bearer ${subscriberToken}`);

        /* test requirements */
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Successfully Updated Employee');
        expect(res.body.result).toBeDefined();
      });

    done();
  });

  it('employees cannot  update thier employee profile ', async (done) => {
    const res = await req(server)
      .patch(`${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`)
      .send(updateEmployeePayload)
      .set('Authorization', `Bearer ${employeeToken}`);

    /* test requirements */
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("Employees's cannot update employee accounts");
    expect(res.body.name).toEqual('Error');
    expect(res.body.status).toEqual(400);

    done();
  });

  it('invalid employee Id returns not found ', async (done) => {
    const res = await req(server)
      .patch(`${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`)
      .send(updateEmployeePayload)
      .set('Authorization', `Bearer ${subscriberToken}`);

    expect(res.status).toEqual(404);
    expect(res.body.name).toEqual('Not Found Error');
    expect(res.body.message).toEqual('Employee Does not Exist');
    expect(res.body.status).toEqual(404);

    done();
  });
  it("customer cannot update subscriber's employee account", async (done) => {
    const res = await req(server)
      .patch(`${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toEqual(403);
    expect(res.body.name).toEqual('AccessDeniedError');
    expect(res.body.message).toEqual(
      `Access is denied for request on PATCH ${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`
    );
    expect(res.body.status).toEqual(403);
    done();
  });
});

/*mmmmmmmmmmmmmmmmmmmmmmmmmmmm*
 *   TESTS ON DELETE ROUTE
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/

describe("When Deleting Subscriber's Employee Account", () => {
  it("cannot cannot delete subscriber's employee account without token ", async (done) => {
    const res = await req(server).delete(`${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`);

    /* test requirements */
    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual('Bearer Token must be in authorization header');
    expect(res.body.name).toEqual('Unauthorized Error');
    expect(res.body.status).toEqual(401);

    done();
  });

  it("subscriber can delete his/her employee's account ", async (done) => {
    const EmployeeRequestPayload: CreateEmployeeRequest = {
      email: faker.internet.email(),
      name: faker.name.firstName(),
      phone: faker.phone.phoneNumber(),
    };
    // Create a user just in case it didn't get created already
    await req(server)
      .post(routes.employeeRoute)
      .set('Authorization', `Bearer ${subscriberToken}`)
      .send({
        ...EmployeeRequestPayload,
      })
      .then(async () => {
        // get the user detail of the just created employee from the all route
        const data = await req(server)
          .get(`${routes.employeeRoute}/${subscriber_id}?limit=1`)
          .set('Authorization', `Bearer ${subscriberToken}`);

        // Extract the first employee's Id from the request
        const employeeId = data.body.result[0].id;

        // DELETING EMPLOYEE
        const res = await req(server)
          .delete(`${routes.employeeRoute}/${subscriber_id}/${employeeId}`)
          .set('Authorization', `Bearer ${subscriberToken}`);

        /* test requirements */
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Successfully Deleted Employee');
        expect(res.body.result).toEqual(employeeId);
      });
    done();
  });
  it("employee cannot delete his/her employee's account ", async (done) => {
    const res = await req(server)
      .delete(`${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`)
      .set('Authorization', `Bearer ${employeeToken}`);
    /* test requirements */
    expect(res.status).toEqual(403);
    expect(res.body.message).toEqual(
      `Access is denied for request on DELETE ${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`
    );
    expect(res.body.name).toEqual('AccessDeniedError');

    done();
  });
  it("customer cannot delete subscriber employee's account ", async (done) => {
    const res = await req(server)
      .delete(`${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`)
      .set('Authorization', `Bearer ${customerToken}`);
    /* test requirements */
    expect(res.status).toEqual(403);
    expect(res.body.message).toEqual(
      `Access is denied for request on DELETE ${routes.employeeRoute}/${subscriber_id}/${fakeObjectId}`
    );
    expect(res.body.name).toEqual('AccessDeniedError');

    done();
  });
});
