/* eslint-disable @typescript-eslint/no-explicit-any */

/// Type Definitions
import { MongoQuery, SubjectType } from '@casl/ability';
// import { PackRule } from '@casl/ability/dist/types/extra';
import { ResourceModelSubject } from './constants';

type PropertyKey = string | number | symbol;
type AnyObject = Record<PropertyKey, unknown>;

/* The type of rules we have amongst user account maping to the type of user accounts created */
export enum UserRoleEnum {
  MEMBER = 'member',
  OWNER = 'owner',
  SUPERADMIN = 'superadmin',
}

/* policy arguments used to interpolate and generate permission rules */
export interface PolicyTemplateArgs {
  user_id: string;
  subscriber_id?: string | null | undefined;
  role: UserRoleEnum;
}

export type CRUD = 'create' | 'read_one' | 'read_all' | 'update' | 'delete' | 'crud';
export interface IAMClaimRule {
  /* The type of action according the HTTP Method */
  action: CRUD | CRUD[];
  /* The API Resource this policy will be applicable to */
  subject: ResourceModelSubject & SubjectType;
}

export interface IAMPolicyCondition<Sub> {
  /** an array of fields to which user has (or not) access */
  fields?: string | string[];
  /** an object of conditions which restricts the rule scope */
  conditions?: MongoQuery<AnyObject | Sub>;
  /** indicates that rule forbids something (i.e., has inverted logic) */
  inverted?: boolean;
  /** explains the reason of why rule does not allow to do something */
  reason?: string;
}

/* IAM Policy Rules Definition for JSON Authorization Rules */
export type IAMPolicyRuleDefinition<Sub> = IAMClaimRule & IAMPolicyCondition<Sub>;

/* Subject Generic for IAM */
export interface SubscriberPolicyInterface {
  subscriberId: string;
  role: UserRoleEnum;
  ownerId: string;
}

/* Subject Generic for IAM */
export interface CredentialPolicyInterface {
  workspaceId: string;
  role: UserRoleEnum;
  ownerId: string;
  userId: string;
}



export interface IJWTClaim {
  sub: 'user_id' | string;
  eth: string;
  fingerprint: string;
  scope: 'personal' | 'team';
}
export interface IJWTClaimConf {
  iat: Date;
  exp: Date;
  aud: 'https://api.daccred.co' | string;
  iss: 'https://api.daccred.co/authorizer' | string;
}

export interface AuthorizerRule {
  action: CRUD;
  subject: string;
  field?: string | undefined;
}
export type AuthDecoratorRule = AuthorizerRule[];

export interface GetAllRequestWithParams {
  sort: string;
  limit: string; // The page size. Set 0 for no limit.
  sortField: string; // The field name to query the range for. The field must be:
  /*
      1. Orderable. We must sort by this value. If duplicate values for paginatedField field
        exist, the results will be secondarily ordered by the _id.
      2. Indexed. For large collections, this should be indexed for query performance.
      3. Immutable. If the value changes between paged queries, it could appear twice.
      4. Complete. A value must exist for all documents.
    The default is to use the Mongo built-in '_id' field, which satisfies the above criteria.
    The only reason to NOT use the Mongo _id field is if you chose to implement your own ids.
  */
  sortAscending: boolean; // True to sort using paginatedField ascending (default is false - descending).
  next: string; // The value to start querying the page.
  previous: string; // The value to start querying previous page.
}

export type DoneCallback = jest.DoneCallback
export type ProvidesCallback = ((cb: DoneCallback) => void | undefined) | (() => Promise<unknown>);
export type ProvidesHookCallback = (() => any) | ProvidesCallback;

/* use for connection classes: e.g. db or pub/sub in tests setup  */
export type TCallbackFunction = () => Promise<any>;
export interface ConnectDbInterface {
  connect: () => void;
  disconnect: DoneCallback;
}
