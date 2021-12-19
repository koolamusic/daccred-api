import { ResourceModelSubject } from '../../src/app/shared/constants';
import { PolicyTemplateArgs, UserRoleEnum } from '../../src/app/shared/definitions';

/**
 * @name User
 * @description A resource class to infer fields and conditions to the
 * user API Resource subject when handling roles and permissions
 */
export class User {
  public id!: string;
  public subscriberId!: string | null | undefined;
  public role: UserRoleEnum;

  constructor(options: PolicyTemplateArgs) {
    /* Assign variables for rule conditions */
    this.id = options.user_id;
    this.subscriberId = options.subscriber_id;
    this.role = options.role;
  }
  static get modelName() {
    return ResourceModelSubject.USER;
  }
}

/**
 * @name List
 * @description A resource class to infer fields and conditions to roles API
 */
export class List {
  public userId!: string;
  public subscriberId!: string | null | undefined;
  public role: UserRoleEnum;

  constructor(options: PolicyTemplateArgs) {
    /* Assign variables for rule conditions */
    this.userId = options.user_id;
    this.subscriberId = options.subscriber_id;
    this.role = options.role;
  }
  static get modelName() {
    return ResourceModelSubject.LIST;
  }
}

/**
 * @name Credential
 * @description A resource class to infer fields and conditions to Credentials API
 */
export class Credential {
  public ownerId!: string;
  public subscriberId!: string | null | undefined;
  public role: UserRoleEnum;

  constructor(options: PolicyTemplateArgs) {
    /* Assign variables for rule conditions */
    this.ownerId = options.user_id;
    this.subscriberId = options.subscriber_id;
    this.role = options.role;
  }
  static get modelName() {
    return ResourceModelSubject.CREDENTIAL;
  }
}

/**
 * @name Team
 * @description A resource class to infer fields and conditions to Teams API
 */
export class Team {
  public invitedBy!: string;
  public subscriberId!: string | null | undefined;
  public role: UserRoleEnum;
  public userId?: string;

  constructor(options: PolicyTemplateArgs) {
    /* Assign variables for rule conditions */
    this.invitedBy = options.user_id;
    this.subscriberId = options.subscriber_id;
    this.role = options.role;
    this.userId = options.user_id;
  }
  static get modelName() {
    return ResourceModelSubject.TEAM;
  }
}
