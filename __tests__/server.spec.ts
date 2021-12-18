import { Request, Response } from 'express';
import req from 'supertest';
import server from './setup/entry.server';
import config from '../src/infra/config';

/* Test Controller routes-- route prefix "./mock/controllers" */
const unprocessableEntityErrorRoute = `${config.TEST_API_PREFIX}/test-controller/unprocessable-entity`;
const conflictErrorRoute = `${config.TEST_API_PREFIX}/test-controller/conflict-error`;

/* ---------- Hooks ----------  */

beforeAll(async (done) => {
  /* Health check route */
  await server.use('/_healthcheck', (_req: Request, res: Response) => {
    res.status(200).json({ uptime: process.uptime() });
  });
  done();
});

/* ---------- Hooks ----------  */

describe('Server is up and functional', () => {
  test('[GET] /_healthcheck', async () => {
    const res = await req(server).get('/_healthcheck');
    expect(typeof res.body.uptime).toBe('number');
  });
});

describe('Global Server Http Request Filters', () => {
  it('Should return any UnprocessableEntity Error with custom message in response body', async () => {
    const res = await req(server).get(unprocessableEntityErrorRoute);

    expect(res.status).toEqual(422);
    expect(res.error).toHaveProperty('status');
    expect(res.body.name).toEqual('Unprocessable Entity');
    expect(res.body.message).toEqual('We cant process your request');
  });

  it('Should return any Conflict Error with default message in response body', async () => {
    const res = await req(server).get(conflictErrorRoute);

    expect(res.status).toEqual(409);
    expect(res.error).toHaveProperty('status');
    expect(res.body.name).toEqual('Conflict Error');
    expect(res.body.message).toEqual('Please check your data.');
  });
});
