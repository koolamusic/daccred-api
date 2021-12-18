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
 * @name Role
 * @description A resource class to infer fields and conditions to roles API
 */
export class Role {
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
    return ResourceModelSubject.ROLE;
  }
}

/**
 * @name Subscriber
 * @description A resource class to infer fields and conditions to Subscribers API
 */
export class Subscriber {
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
    return ResourceModelSubject.SUBSCRIBER;
  }
}

/**
 * @name Employee
 * @description A resource class to infer fields and conditions to Employees API
 */
export class Employee {
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
    return ResourceModelSubject.EMPLOYEE;
  }
}

/**
 * @name PaymentMerchant
 * @description A resource class to infer fields and conditions to PaymentMerchant API
 */
export class PaymentMerchant {
  public subscriberId!: string | null | undefined;
  public role: UserRoleEnum;

  constructor(options: PolicyTemplateArgs) {
    /* Assign variables for rule conditions */
    this.subscriberId = options.subscriber_id;
    this.role = options.role;
  }
  static get modelName() {
    return ResourceModelSubject.PAYMENT_MERCHANT;
  }
}
