import config from '../../src/infra/config';

export const loginRoute = `${config.TEST_API_PREFIX}/auth/login`;
export const signupRoute = `${config.TEST_API_PREFIX}/auth/signup`;
export const guardRoute = `${config.TEST_API_PREFIX}/guard`;
export const forgotPassRoute = `${config.TEST_API_PREFIX}/auth/forgot-password`;
export const resetPassRoute = `${config.TEST_API_PREFIX}/auth/reset-password`;

export const subscriberRoute = `${config.TEST_API_PREFIX}/subscribers`;
export const employeeRoute = `${config.TEST_API_PREFIX}/subscriber-employees`;
export const customerRoute = `${config.TEST_API_PREFIX}/customers`;
export const userRoute = `${config.TEST_API_PREFIX}/users`;
