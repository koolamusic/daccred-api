/* Mongo database setup */
import { TestDbConnection } from './setup/db';
const db = new TestDbConnection();

/* Requirements */
import req from 'supertest';
import server from './setup/entry.server';
// import faker from 'faker/locale/en';
import config from '../src/infra/config';
import * as routes from './setup/routes';
import { customerToken, employeeToken, subscriberToken, superadminToken } from './setup/claims.mock';

/* ---------- Hooks ----------  */
beforeAll(async (done) => {
  await db.connect().then(() => done());
}, 30000);

afterAll(async (done) => {
  await db.disconnect(done);
  done();
});
/* ---------- Hooks ----------  */

/*--------------------------------------------------------------*
 *   Default Authentication Guard with no rules attached
 --------------------------------------------------------------*/

describe('Authentication Guard', () => {
  it('cannot access guarded endpoint', async (done) => {
    const res = await req(server).post(routes.guardRoute).send({});

    /* test requirements */
    expect(res.status).toEqual(401);
    expect(res.body.name).toEqual('Unauthorized Error');
    expect(res.body.message).toContain('Bearer Token must be in authorization header');
    expect(res.body.status).toEqual(401);
    done();
  });

  it('employee can access guarded endpoint', async (done) => {
    const res = await req(server).post(routes.guardRoute).send({}).set('Authorization', `Bearer ${employeeToken}`);

    /* test requirements */
    expect(res.status).toEqual(201);
    done();
  });

  it('customer can access guarded endpoint', async (done) => {
    const res = await req(server).post(routes.guardRoute).send({}).set('Authorization', `Bearer ${customerToken}`);

    /* test requirements */
    expect(res.status).toEqual(201);
    done();
  });

  it('can access the profile of current user when authenticated', async (done) => {
    const res = await req(server).post(routes.guardRoute).send({}).set('Authorization', `Bearer ${subscriberToken}`);

    /* test requirements */
    expect(res.status).toEqual(201);
    expect(res.body.sub).toBeDefined();
    expect(res.body.scope).toEqual('business');
    expect(res.body.profile.email).toBeDefined();
    expect(res.body.profile.business).toBeTruthy();
    expect(res.body.profile.user_id).toEqual(res.body.sub);
    done();
  });

  it('can authorize super-admin when token headers set', async (done) => {
    const res = await req(server)
      .post(routes.guardRoute)
      .send({})
      .set('Authorization', `Bearer ${superadminToken}`)
      .set('x-titan-admin', config.SUPERADMIN_TOKEN);

    /* test requirements */
    expect(res.status).toEqual(201);
    expect(res.body.scope).toEqual('titan');
    expect(res.body.profile.email).toBeDefined();
    expect(res.body.profile.business).toBeFalsy();
    expect(res.body.profile.user_id).toEqual(res.body.sub);
    done();
  });

  it('will forbid super-admin when token headers is invalid or false', async (done) => {
    const res = await req(server)
      .post(routes.guardRoute)
      .send({})
      .set('Authorization', `Bearer ${superadminToken}`)
      .set('x-titan-admin', '');

    /* test requirements */
    expect(res.status).toEqual(401);
    expect(res.body.name).toEqual('AuthorizationRequiredError');
    expect(res.body.message).toContain('Authorization is required');
    done();
  });
});

/*--------------------------------------------------------------*
 *  Test Authentication Guard with rules across IAM Policies
 --------------------------------------------------------------*/

describe('Authorization Guard with rules', () => {
  /*----------------------------------------------------------------------------*
   *  Here we mock controllers to test that an employee is 
   *  is authorized to able to perform certain actions on the API
   ----------------------------------------------------------------------------*/
  describe('Authorized Employee', () => {
    it('is authorized to perform task within employee policy', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/employee`)
        .set('Authorization', `Bearer ${employeeToken}`);

      /* test requirements */
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual('success');
      expect(res.body.data).toEqual('you are authorized to access employee scope');
      done();
    });

    it('is not authorized beyond policy like scope_create_employee', async (done) => {
      const res = await req(server)
        .post(`${routes.guardRoute}/subscriber`)
        .send({})
        .set('Authorization', `Bearer ${employeeToken}`);

      /* test requirements */
      expect(res.status).toEqual(403);
      expect(res.body.name).toEqual('AccessDeniedError');
      expect(res.body.message).toEqual('Access is denied for request on POST /test/guard/subscriber');
      done();
    });

    it('is not authorized to perform task within customer policy', async (done) => {
      const res = await req(server)
        .post(`${routes.guardRoute}/customer`)
        .send({})
        .set('Authorization', `Bearer ${employeeToken}`);

      /* test requirements */
      expect(res.status).toEqual(403);
      expect(res.body.name).toEqual('AccessDeniedError');
      expect(res.body.message).toEqual('Access is denied for request on POST /test/guard/customer');
      done();
    });

    it('is not authorized to perform task within subscriber policy', async (done) => {
      const res = await req(server)
        .post(`${routes.guardRoute}/subscriber`)
        .send({})
        .set('Authorization', `Bearer ${employeeToken}`);

      /* test requirements */
      expect(res.status).toEqual(403);
      expect(res.body.name).toEqual('AccessDeniedError');
      expect(res.body.message).toEqual('Access is denied for request on POST /test/guard/subscriber');
      done();
    });

    /*----------------------------------------------------------------------------------*
     *  Clustered rules. @Authorized() uses array.every that all rules must be TRUE
     ----------------------------------------------------------------------------------*/

    it('is authorized to perform shared policy in clustered rule', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/fair-cluster`)
        .set('Authorization', `Bearer ${employeeToken}`);

      /* test requirements */
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual('success');
      expect(res.body.data).toEqual('the clustered# rules here match your authorized scope');
      done();
    });

    it('is not authorized to perform shared policy in clustered rule', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/unfair-cluster`)
        .send({})
        .set('Authorization', `Bearer ${employeeToken}`);

      /* test requirements */
      expect(res.status).toEqual(403);
      expect(res.body.name).toEqual('AccessDeniedError');
      expect(res.body.message).toEqual('Access is denied for request on GET /test/guard/unfair-cluster');
      done();
    });
  });

  /*----------------------------------------------------------------------------*
   *  Here we mock controllers to test that a subscriber is 
   *  is authorized to able to perform certain actions on the API
   ----------------------------------------------------------------------------*/
  describe('Authorized Subscriber', () => {
    it('is authorized to perform task within subscriber policy', async (done) => {
      const res = await req(server)
        .post(`${routes.guardRoute}/subscriber`)
        .send({})
        .set('Authorization', `Bearer ${subscriberToken}`);

      /* test requirements */
      expect(res.status).toEqual(201);
      expect(res.body.message).toEqual('success');
      expect(res.body.data).toEqual('you are authorized to access subscriber scope');
      done();
    });

    it('is not authorized beyond policy like scope_iam_policies', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/superadmin`)
        .set('Authorization', `Bearer ${subscriberToken}`);

      /* test requirements */
      expect(res.status).toEqual(403);
      expect(res.body.name).toEqual('AccessDeniedError');
      expect(res.body.message).toEqual('Access is denied for request on GET /test/guard/superadmin');
      done();
    });

    it('is not authorized to perform task within customer policy', async (done) => {
      const res = await req(server)
        .post(`${routes.guardRoute}/customer`)
        .send({})
        .set('Authorization', `Bearer ${subscriberToken}`);

      /* test requirements */
      expect(res.status).toEqual(403);
      expect(res.body.name).toEqual('AccessDeniedError');
      expect(res.body.message).toEqual('Access is denied for request on POST /test/guard/customer');
      done();
    });
    it('is not authorized to perform task within superadmin policy', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/superadmin`)
        .set('Authorization', `Bearer ${subscriberToken}`);

      /* test requirements */
      expect(res.status).toEqual(403);
      expect(res.body.name).toEqual('AccessDeniedError');
      expect(res.body.message).toEqual('Access is denied for request on GET /test/guard/superadmin');
      done();
    });

    /*----------------------------------------------------------------------------------*
     *  There is a double check here where we cluster rules constants in a controller
     ----------------------------------------------------------------------------------*/
    it('is authorized to perform shared policy in clustered rule', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/fair-cluster`)
        .set('Authorization', `Bearer ${subscriberToken}`);

      /* test requirements */
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual('success');
      expect(res.body.data).toEqual('the clustered# rules here match your authorized scope');
      done();
    });

    it('is not authorized to perform shared policy in clustered rule', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/unfair-cluster`)
        .send({})
        .set('Authorization', `Bearer ${subscriberToken}`);

      /* test requirements */
      expect(res.status).toEqual(403);
      expect(res.body.name).toEqual('AccessDeniedError');
      expect(res.body.message).toEqual('Access is denied for request on GET /test/guard/unfair-cluster');
      done();
    });
  });

  /*----------------------------------------------------------------------------*
   *  Here we mock controllers to test that a customer is 
   *  is authorized to able to perform certain actions on the API
   -----------------------------------------------------------------------------*/
  describe('Authorized Customer', () => {
    it('is authorized to perform task within customer policy', async (done) => {
      const res = await req(server)
        .post(`${routes.guardRoute}/customer`)
        .send({})
        .set('Authorization', `Bearer ${customerToken}`);

      /* test requirements */
      expect(res.status).toEqual(201);
      expect(res.body.message).toEqual('success');
      expect(res.body.data).toEqual('you are authorized to access customer scope');
      done();
    });

    it('is not authorized to perform task within subscriber policy', async (done) => {
      const res = await req(server)
        .post(`${routes.guardRoute}/subscriber`)
        .send({})
        .set('Authorization', `Bearer ${customerToken}`);

      /* test requirements */
      expect(res.status).toEqual(403);
      expect(res.body.name).toEqual('AccessDeniedError');
      expect(res.body.message).toEqual('Access is denied for request on POST /test/guard/subscriber');
      done();
    });

    it('is not authorized to perform task within employee policy', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/employee`)
        .set('Authorization', `Bearer ${customerToken}`);

      /* test requirements */
      expect(res.status).toEqual(403);
      expect(res.body.name).toEqual('AccessDeniedError');
      expect(res.body.message).toEqual('Access is denied for request on GET /test/guard/employee');
      done();
    });

    it('is not authorized to perform task within superadmin policy', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/superadmin`)
        .set('Authorization', `Bearer ${customerToken}`);

      /* test requirements */
      expect(res.status).toEqual(403);
      expect(res.body.name).toEqual('AccessDeniedError');
      expect(res.body.message).toEqual('Access is denied for request on GET /test/guard/superadmin');
      done();
    });
  });

  /*----------------------------------------------------------------------------*
   *  Here we mock controllers to test that a superadmin can perform all actions
   * Notice how we also must add the `x-titan-admin` key to headers
   ----------------------------------------------------------------------------*/

  describe('Authorized Superadmin', () => {
    it('is authorized to perform task within superadmin policy', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/superadmin`)
        .set('x-titan-admin', config.SUPERADMIN_TOKEN)
        .set('Authorization', `Bearer ${superadminToken}`);

      /* test requirements */
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual('success');
      expect(res.body.data).toEqual('you are authorized to access superadmin# scope');
      done();
    });
    it('is authorized to perform task within employee policy', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/employee`)
        .set('x-titan-admin', config.SUPERADMIN_TOKEN)
        .set('Authorization', `Bearer ${superadminToken}`);

      /* test requirements */
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual('success');
      expect(res.body.data).toEqual('you are authorized to access employee scope');
      done();
    });
    it('is authorized to perform task within customer policy', async (done) => {
      const res = await req(server)
        .post(`${routes.guardRoute}/customer`)
        .send({})
        .set('x-titan-admin', config.SUPERADMIN_TOKEN)
        .set('Authorization', `Bearer ${superadminToken}`);

      /* test requirements */
      expect(res.status).toEqual(201);
      expect(res.body.message).toEqual('success');
      expect(res.body.data).toEqual('you are authorized to access customer scope');
      done();
    });
    it('is authorized to perform task within subscriber policy', async (done) => {
      const res = await req(server)
        .post(`${routes.guardRoute}/subscriber`)
        .send({})
        .set('x-titan-admin', config.SUPERADMIN_TOKEN)
        .set('Authorization', `Bearer ${superadminToken}`);

      /* test requirements */
      expect(res.status).toEqual(201);
      expect(res.body.message).toEqual('success');
      expect(res.body.data).toEqual('you are authorized to access subscriber scope');
      done();
    });

    it('is authorized to perform shared policy in unfair clustered rule', async (done) => {
      const res = await req(server)
        .get(`${routes.guardRoute}/unfair-cluster`)
        .send({})
        .set('x-titan-admin', config.SUPERADMIN_TOKEN)
        .set('Authorization', `Bearer ${superadminToken}`);

      /* test requirements */
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual('success');
      expect(res.body.data).toEqual('the clustered# rules here match your authorized scope');
      done();
    });
  });
});
