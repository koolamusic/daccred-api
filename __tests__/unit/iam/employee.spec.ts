// /**
//  * @name employee.spec.ts unit test for subsciber.iam.ts
//  * @desc Test suite for Employee IAM Policy
//  */

// import { datatype } from 'faker/locale/en';
// import { PackRule, unpackRules } from '@casl/ability/extra';
// import { IAMPolicyRuleDefinition } from '../../../src/app/shared/definitions';
// import * as iam from '../../../src/app/shared/iam';
// import { employeeClaim as user } from '../../setup/claims.mock';
// import { User, Role, Employee, Subscriber, PaymentMerchant } from '../../setup/resource.class';

// /* init values */
// const ability = iam.generateGrantsFor(unpackRules(user.permissions as PackRule<IAMPolicyRuleDefinition<unknown>>[]));

// describe('Employee Permission Rules', () => {
//   describe('when accessing the Users API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new User(user.profile);
//     const fakeResource = new User({ ...user.profile, subscriber_id: datatype.uuid(), user_id: datatype.uuid() });

//     it('can read own user account', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('can update user account', () => {
//       expect(ability.can('update', resource)).toBeTruthy();
//     });
//     it('can only delete its user account', () => {
//       expect(ability.can('delete', resource)).toBeTruthy();
//     });
//     it('cannot create a user account', () => {
//       expect(ability.can('create', resource)).toBeFalsy();
//     });

//     /* Inverted rules test with fake resource */
//     it('cannot another user account', () => {
//       expect(ability.cannot('read_one', fakeResource)).toBeTruthy();
//     });
//     it('cannot delete another user account', () => {
//       expect(ability.cannot('delete', fakeResource)).toBeTruthy();
//     });
//     it('cannot read_all users', () => {
//       expect(ability.cannot('read_all', resource)).toBeTruthy();
//     });
//   });

//   describe('when accessing the Roles API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new Role(user.profile);

//     it('cannot read_one business role definition', () => {
//       expect(ability.can('read_one', resource)).toBeFalsy();
//     });
//     it('cannot read_all business role definition', () => {
//       expect(ability.can('read_all', resource)).toBeFalsy();
//     });
//     it('cannot update business role definition', () => {
//       expect(ability.can('update', resource)).toBeFalsy();
//     });
//     it('cannot create business role definition', () => {
//       expect(ability.can('create', resource)).toBeFalsy();
//     });
//     it('cannot delete business user role definition', () => {
//       expect(ability.can('delete', resource)).toBeFalsy();
//     });
//   });

//   describe('when accessing the Subscriber API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new Subscriber(user.profile);

//     it('cannot read_one subscriber definition', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('cannot read_all subscriber definition', () => {
//       expect(ability.can('read_all', resource)).toBeFalsy();
//     });
//     it('cannot update subscriber definition', () => {
//       expect(ability.can('update', resource)).toBeFalsy();
//     });
//     it('cannot create subscriber definition', () => {
//       expect(ability.can('create', resource)).toBeFalsy();
//     });
//     it('cannot delete subscriber definition', () => {
//       expect(ability.can('delete', resource)).toBeFalsy();
//     });
//   });

//   describe('when accessing the Employee API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new Employee(user.profile);
//     const fakeResource = new Employee({ ...user.profile, subscriber_id: datatype.uuid() });

//     it('can read own employee account where userId belongs to user', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('cannot not read_all employee definition', () => {
//       expect(ability.can('read_all', resource)).toBeFalsy();
//     });
//     it('can update own employee definition', () => {
//       expect(ability.can('update', resource)).toBeTruthy();
//     });
//     it('cannot create own employee definition', () => {
//       expect(ability.can('create', resource)).toBeFalsy();
//     });
//     it('cannot delete own employee definition', () => {
//       expect(ability.can('delete', resource)).toBeFalsy();
//     });

//     /* Inverted rules test with fake resource */

//     it('cannot read_one on another employee definition', () => {
//       expect(ability.cannot('read_one', fakeResource)).toBeTruthy();
//     });
//     it('cannot read_all another employee definition', () => {
//       expect(ability.cannot('read_all', fakeResource)).toBeTruthy();
//     });
//     it('cannot update another employee definition', () => {
//       expect(ability.cannot('update', fakeResource)).toBeTruthy();
//     });
//   });

//   describe('when accessing the Payment Merchant API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new PaymentMerchant(user.profile);

//     it('cannot read_one merchant definition', () => {
//       expect(ability.can('read_one', resource)).toBeFalsy();
//     });
//     it('cannot read_all merchant definition', () => {
//       expect(ability.can('read_all', resource)).toBeFalsy();
//     });
//     it('cannot update a merchant definition', () => {
//       expect(ability.can('update', resource)).toBeFalsy();
//     });
//     it('cannot create a merchant definition', () => {
//       expect(ability.can('create', resource)).toBeFalsy();
//     });
//     it('cannot delete a merchant definition', () => {
//       expect(ability.can('delete', resource)).toBeFalsy();
//     });
//   });
// });
