// /**
//  * @name superadmin.spec.ts unit test for superadmin.iam.ts
//  * @desc Test suite for SUPER ADMIN IAM Policy
//  */

// import { PackRule, unpackRules } from '@casl/ability/extra';
// import { IAMPolicyRuleDefinition } from '../../../src/app/shared/definitions';
// import * as iam from '../../../src/app/shared/iam';
// import { superadminClaim as user } from '../../setup/claims.mock';
// import { User, Role, Employee, Subscriber, PaymentMerchant } from '../../setup/resource.class';

// /* init values */
// const ability = iam.generateGrantsFor(unpackRules(user.permissions as PackRule<IAMPolicyRuleDefinition<unknown>>[]));

// describe('Superadmin Permission Rules', () => {
//   describe('when accessing the Users API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new User(user.profile);

//     it('can read_one user account', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('can update user account', () => {
//       expect(ability.can('update', resource)).toBeTruthy();
//     });
//     it('can only delete any user account', () => {
//       expect(ability.can('delete', resource)).toBeTruthy();
//     });
//     it('can create a user account', () => {
//       expect(ability.can('create', resource)).toBeTruthy();
//     });
//   });

//   describe('when accessing the Roles API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new Role(user.profile);

//     it('can read_one role definition', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('can read_all business role definition', () => {
//       expect(ability.can('read_all', resource)).toBeTruthy();
//     });
//     it('can update business role definition', () => {
//       expect(ability.can('update', resource)).toBeTruthy();
//     });
//     it('cannot create business role definition', () => {
//       expect(ability.can('create', resource)).toBeTruthy();
//     });
//     it('can delete business role definition where user_id condition meets', () => {
//       expect(ability.can('delete', resource)).toBeTruthy();
//     });
//   });

//   describe('when accessing the Subscriber API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new Subscriber(user.profile);

//     it('can read_one subscriber definition', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('can not read_all subscriber definition', () => {
//       expect(ability.can('read_all', resource)).toBeTruthy();
//     });
//     it('can update subscriber definition', () => {
//       expect(ability.can('update', resource)).toBeTruthy();
//     });
//     it('can create subscriber definition', () => {
//       expect(ability.can('create', resource)).toBeTruthy();
//     });
//     it('can delete subscriber definition where owner condition matches', () => {
//       expect(ability.can('delete', resource)).toBeTruthy();
//     });
//   });

//   describe('when accessing the Employee API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new Employee(user.profile);

//     it('can read_one employee definition', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('can not read_all employee definition', () => {
//       expect(ability.can('read_all', resource)).toBeTruthy();
//     });
//     it('can update any employee definition', () => {
//       expect(ability.can('update', resource)).toBeTruthy();
//     });
//     it('can create any employee definition', () => {
//       expect(ability.can('create', resource)).toBeTruthy();
//     });
//     it('can delete any employee definition', () => {
//       expect(ability.can('delete', resource)).toBeTruthy();
//     });
//   });

//   describe('when accessing the Payment Merchant API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new PaymentMerchant(user.profile);

//     it('can read any merchant definition', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('can read_all merchant definition', () => {
//       expect(ability.can('read_all', resource)).toBeTruthy();
//     });
//     it('can update any merchant definition', () => {
//       expect(ability.can('update', resource)).toBeTruthy();
//     });
//     it('can create any merchant definition', () => {
//       expect(ability.can('create', resource)).toBeTruthy();
//     });
//     it('can delete any merchant definition', () => {
//       expect(ability.can('delete', resource)).toBeTruthy();
//     });
//   });
// });
