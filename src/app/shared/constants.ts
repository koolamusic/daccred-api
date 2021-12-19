import { AuthorizerRule } from './definitions';
import config from '../../infra/config';

export const __WHOAMI__ = `

  █████   ██████  ██████ ██████  ███████ ██████  
  ██   ██ ██      ██      ██   ██ ██      ██   ██ 
  ███████ ██      ██      ██████  █████   ██   ██ 
  ██   ██ ██      ██      ██   ██ ██      ██   ██ 
  ██   ██  ██████  ██████ ██   ██ ███████ ██████  
                                              
${config.serviceName}
`;
export const SIGNING_MESSAGE_PREFIX = 'Authorize access to daccred.io with code:';

/*  Constants of all API resources used to map to IAM roles and
 *  permissions Subjects to RESOURCES across the application. This should be shared and constantly
 *  updated across all applications ---> might move to shared.
 *  If there exists an /api endpoint or controller or Model... Then it needs to be mapped here
 *
 *  We're doing this instead of Model classes, because claims cached in JWT tokens used to authenticate
 *  various microservices. and I'm not sure at this time how all model classes can be shared from a single source
 *  of truth (particularly the controller contracts are a solid reference for these)
 */

export enum ResourceModelSubject {
  USER = 'daccred:user',
  CREDENTIAL = 'daccred:credential',
  LIST = 'daccred:recipient_list',
  TEAM = 'daccred:team',
  POLICY = 'daccred:policy',
}

export const CAN_READ_ONE_USER: AuthorizerRule = { action: 'read_one', subject: ResourceModelSubject.USER };
export const CAN_CREATE_USER: AuthorizerRule = { action: 'create', subject: ResourceModelSubject.USER };
export const CAN_READ_ALL_POLICY: AuthorizerRule = { action: 'read_all', subject: ResourceModelSubject.POLICY };

export const CAN_CREATE_CREDENTIAL: AuthorizerRule = {
  action: 'create',
  subject: ResourceModelSubject.CREDENTIAL,
};

export const CAN_READ_CREDENTIAL: AuthorizerRule = {
  action: 'read_one',
  subject: ResourceModelSubject.CREDENTIAL,
};

export const CAN_UPDATE_CREDENTIAL: AuthorizerRule = {
  action: 'update',
  subject: ResourceModelSubject.CREDENTIAL,
};

export const CAN_DELETE_CREDENTIAL: AuthorizerRule = {
  action: 'delete',
  subject: ResourceModelSubject.CREDENTIAL,
};

export const CAN_READ_ALL_CREDENTIALS: AuthorizerRule = {
  action: 'read_all',
  subject: ResourceModelSubject.CREDENTIAL,
};
