// /**
//  * @name subscriber.spec.ts unit test for subsciber.iam.ts
//  * @desc Test suite for Subscriber IAM Policy
//  */

// import { datatype } from 'faker/locale/en';
// import { PackRule, unpackRules } from '@casl/ability/extra';
// import { IAMPolicyRuleDefinition } from '../../../src/app/shared/definitions';
// import * as iam from '../../../src/app/shared/iam';
// import { subscriberClaim } from '../../setup/claims.mock';
// import { User, Role, Employee, Subscriber, PaymentMerchant } from '../../setup/resource.class';

// /* init values */
// const user = subscriberClaim;
// const ability = iam.generateGrantsFor(unpackRules(user.permissions as PackRule<IAMPolicyRuleDefinition<unknown>>[]));

// describe('Subscriber Permission Rules', () => {
//   describe('when accessing the Users API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new User(user.profile);
//     const fakeResource = new User({ ...user.profile, subscriber_id: datatype.uuid(), user_id: datatype.uuid() });

//     it('can read_one user account', () => {
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
//     it('cannot read_one on another user account', () => {
//       expect(ability.cannot('read_one', fakeResource)).toBeTruthy();
//     });
//     it('cannot delete another user account', () => {
//       expect(ability.cannot('delete', fakeResource)).toBeTruthy();
//     });
//     it('cannot read_all user endpoint', () => {
//       expect(ability.cannot('read_all', resource)).toBeTruthy();
//     });
//   });

//   describe('when accessing the Roles API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new Role(user.profile);
//     const fakeResource = new Role({ ...user.profile, subscriber_id: datatype.uuid() });

//     it('can read_one own business user role definition', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('can read_all own business user role definition', () => {
//       expect(ability.can('read_all', resource)).toBeTruthy();
//     });
//     it('can update own business user role definition', () => {
//       expect(ability.can('update', resource)).toBeTruthy();
//     });
//     it('cannot create own business user role definition', () => {
//       expect(ability.can('create', resource)).toBeFalsy();
//     });
//     it('can delete own business user role definition where user_id condition meets', () => {
//       expect(ability.can('delete', resource)).toBeTruthy();
//     });

//     /* Inverted rules test with fake resource */

//     it('cannot read_one another business user role definition', () => {
//       expect(ability.cannot('read_one', fakeResource)).toBeTruthy();
//     });
//     it('cannot read_all another business user role definition', () => {
//       expect(ability.cannot('read_all', fakeResource)).toBeTruthy();
//     });
//     it('cannot update another business user role definition', () => {
//       expect(ability.cannot('update', fakeResource)).toBeTruthy();
//     });

//     it('cannot delete another business user role definition where user_id condition matches', () => {
//       expect(ability.cannot('delete', fakeResource)).toBeTruthy();
//     });
//   });

//   describe('when accessing the Subscriber API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new Subscriber(user.profile);
//     const fakeResource = new Subscriber({ ...user.profile, subscriber_id: datatype.uuid() });

//     it('can read_one own subscriber definition', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('can not read_all subscriber definition', () => {
//       expect(ability.can('read_all', resource)).toBeFalsy();
//     });
//     it('can update own subscriber definition', () => {
//       expect(ability.can('update', resource)).toBeTruthy();
//     });
//     it('can create own subscriber definition', () => {
//       expect(ability.can('create', resource)).toBeTruthy();
//     });
//     it('can delete own subscriber definition where ownerId condition matches', () => {
//       expect(ability.can('delete', resource)).toBeTruthy();
//     });

//     /* Inverted rules test with fake resource */

//     it('cannot read_one on another subscriber definition', () => {
//       expect(ability.cannot('read_one', fakeResource)).toBeTruthy();
//     });
//     it('cannot read_all another subscriber definition', () => {
//       expect(ability.cannot('read_all', fakeResource)).toBeTruthy();
//     });
//     it('cannot update another subscriber definition', () => {
//       expect(ability.cannot('update', fakeResource)).toBeTruthy();
//     });

//     it('cannot delete another subscriber definition where user_id condition meets', () => {
//       expect(ability.cannot('delete', fakeResource)).toBeTruthy();
//     });
//   });

//   describe('when accessing the Employee API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new Employee(user.profile);
//     const fakeResource = new Employee({ ...user.profile, subscriber_id: datatype.uuid() });

//     it('can read_one owned employee definition', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('can not read_all employee definition', () => {
//       expect(ability.can('read_all', resource)).toBeTruthy();
//     });
//     it('can update own employee definition', () => {
//       expect(ability.can('update', resource)).toBeTruthy();
//     });
//     it('can create own employee definition', () => {
//       expect(ability.can('create', resource)).toBeTruthy();
//     });
//     it('can delete own employee definition where ownerId condition matches', () => {
//       expect(ability.can('delete', resource)).toBeTruthy();
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

//     it('cannot delete another employee definition where user_id condition meets', () => {
//       expect(ability.cannot('delete', fakeResource)).toBeTruthy();
//     });
//   });

//   describe('when accessing the Payment Merchant API', () => {
//     /* Initialize the resource class for the API Domain within the service */
//     const resource = new PaymentMerchant(user.profile);
//     const fakeResource = new PaymentMerchant({ ...user.profile, subscriber_id: datatype.uuid() });

//     it('can read_one owned merchant definition', () => {
//       expect(ability.can('read_one', resource)).toBeTruthy();
//     });
//     it('can not read_all merchant definition', () => {
//       expect(ability.can('read_all', resource)).toBeTruthy();
//     });
//     it('can update own merchant definition', () => {
//       expect(ability.can('update', resource)).toBeTruthy();
//     });
//     it('can create own merchant definition', () => {
//       expect(ability.can('create', resource)).toBeTruthy();
//     });
//     it('can delete own merchant definition', () => {
//       expect(ability.can('delete', resource)).toBeTruthy();
//     });

//     /* Inverted rules test with fake resource */

//     it('cannot read_one on another merchant definition', () => {
//       expect(ability.cannot('read_one', fakeResource)).toBeTruthy();
//     });
//     it('cannot read_all another merchant definition', () => {
//       expect(ability.cannot('read_all', fakeResource)).toBeTruthy();
//     });
//     it('cannot update another merchant definition', () => {
//       expect(ability.cannot('update', fakeResource)).toBeTruthy();
//     });

//     it('cannot delete another merchant definition', () => {
//       expect(ability.cannot('delete', fakeResource)).toBeTruthy();
//     });
//   });
// });
