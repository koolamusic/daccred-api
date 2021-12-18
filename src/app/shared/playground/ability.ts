/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

// import deepStrictEqual from 'assert';
// import { encode } from '@msgpack/msgpack';
// import { UserCollection } from '../models/user.model'
// import { UserCollection } from '../models/user.model';
// import jwt from 'jsonwebtoken';
// import { AuthSignupRequest } from './contracts/auth.contracts';
import { AbilityBuilder, Ability } from '@casl/ability';
import { packRules, unpackRules } from '@casl/ability/extra';
import { UserCollection } from '../../models/user.model';
import { ResourceModelSubject } from '../constants';
import { IAMPolicyRuleDefinition } from '../definitions';
import subscriberRules from '../iam/subscriber.iam';
import _ from 'lodash';
// import config from '../../../infra/config';
import { UserType } from '../contracts';

const AppAbility = Ability;

function defineRulesFor(user: unknown) {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility);

  const devices = [
    {
      id: '1',
      name: 'rub',
      user,
    },
    {
      id: '2',
      name: 'bub',
      user,
    },
  ];
  const ids = devices.map((device) => device.id);

  can('read', 'Subscriber', { id: { $in: ids } });
  can('update', 'Subscriber', { id: { $in: ids } });
  // can('create', UserCollection, { isVerified: { "$eq": true }, name: { "$in": ids } });
  // can('create', AuthSignupRequest, { email: { "$in": ids } });
  cannot('delete', 'Post', { published: true });
  can('read', 'Article'); // direct rule
  cannot('read', 'Article', { published: false }); // inverted rule
  cannot('create', 'BlogPost').because('You have not paid for monthly subscription');

  return rules;
}

function defineAbilityFor(user: { id: number; name: string }[]) {
  const rules = defineRulesFor(user);
  const packedRules = packRules(defineRulesFor(user));
  const unpackedRules = unpackRules(packedRules);

  // console.log('DEFINED USERS RULES', rules);

  console.log('PACKED USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RULES', packedRules);
  console.log('THIES ARE UNPACKED ========================= USER RULES', unpackedRules);

  return new AppAbility(rules);
}

const ability = defineAbilityFor([
  {
    id: 2,
    name: 'mob',
  },
]);
console.log('THE ABILITIES FOR THE DEFINED USER===========================>', ability);

const ruleTest: IAMPolicyRuleDefinition<UserCollection>[] = [
  {
    action: 'read_all',
    //@ts-ignore
    subject: UserCollection,
  },
  {
    inverted: true,
    action: 'delete',
    subject: ResourceModelSubject.EMPLOYEE,
    conditions: { name: true },
  },
];

console.log(ruleTest);

const abilityFromRule = new AppAbility(ruleTest as any);
console.log(abilityFromRule, 'ABILITY FROM RULE');

// const object = {
//   nil: null,
//   integer: 1,
//   float: Math.PI,
//   string: 'Hello, world!',
//   binary: Uint8Array.from([1, 2, 3]),
//   array: [10, 20, 30],
//   map: { foo: 'bar' },
//   timestampExt: new Date(),
// };

// const encoded = encode(object);
// const encoder = new Encoder();
// const decoded = decode(encoded);
// const fastEncode = encoder.encode(object);

// console.log(encoded);
// console.log(decoded);
// console.log(fastEncode);

// console.log(deepStrictEqual(decoded));

export const interpolateSample = () => {
  // Use the "interpolate" delimiter to create a compiled template.
  let compiled = _.template('hello <%= user %>!');
  compiled({ user: 'fred' });
  // => 'hello fred!'

  // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
  compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
  compiled({ users: ['fred', 'barney'] });
  // => '<li>fred</li><li>barney</li>'

  // Use the internal `print` function in "evaluate" delimiters.
  compiled = _.template('<% print("hello " + user); %>!');
  compiled({ user: 'barney' });
  // => 'hello barney!'

  // Use the ES template literal delimiter as an "interpolate" delimiter.
  // Disable support by replacing the "interpolate" delimiter.
  compiled = _.template('hello ${ user }!');
  compiled({ user: 'pebbles' });
  // => 'hello pebbles!'

  // Use custom template delimiters.
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  compiled = _.template('hello {{ user }}!');
  compiled({ user: 'mustache' });
  // => 'hello mustache!'
};

// Use custom template delimiters.
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
let compiled = _.template(JSON.stringify(subscriberRules.rules));
const perms = compiled({ subscriber_id: '09127123921', user_id: 'user-9012eh8923' });

const rules = subscriberRules.rules;
const packedRules = packRules(rules);
// const binaryRules = encode(rules)

console.log(packedRules);
console.log(perms);

// const claim = {
//   sub: 'userDocument.id',
//   scope: 'customer',
//   rules: rules,
//   access: {
//     payment: 'write',
//     notifications: 'readonly',
//     feedbackloop: 'readonly',
//   },
// };

// const packedClaim = {
//   sub: 'userDocument.id',
//   scope: 'customer',
//   client_id: 'xxx-xxxxx-xxxx',
//   azp: 'business',
//   rules: packedRules,
//   access: {
//     payment: 'write',
//     notifications: 'readonly',
//     feedbackloop: 'readonly',
//   },
// };

// const binaryClaim = {
//   sub: "userDocument.id",
//   scope: "customer",
//   client_id: "xxx-xxxxx-xxxx",
//   azp: "business",
//   rules: binaryRules,
//   access: {
//     payment: 'write',
//     notifications: 'readonly',
//     feedbackloop: 'readonly',
//   },
// };

// const token = jwt.sign(claim, config.SECRET_KEY, {
//   expiresIn: config.TOKEN_EXPIRE,
//   issuer: config.JWT_ISSUER,
//   audience: config.JWT_AUD,
//   algorithm: 'HS256',
// });

// console.log(token, 'UNPACKED TOKEN');

// const packedToken = jwt.sign(packedClaim, config.SECRET_KEY, {
//   expiresIn: config.TOKEN_EXPIRE,
//   issuer: config.JWT_ISSUER,
//   audience: config.JWT_AUD,
//   algorithm: 'HS256',
// });

// console.log(packedToken, '>>>>>>>>>>>> PACKED TOKEN');

// const binToken = jwt.sign(binaryClaim, config.SECRET_KEY, {
//   expiresIn: config.TOKEN_EXPIRE,
//   issuer: config.JWT_ISSUER,
//   audience: config.JWT_AUD,
//   algorithm: 'HS256',
// });

// console.log(binToken, ">>>>>>>>>>>> BINARY >>>>>>>>>  TOKEN")

// const identityScope = data.type === 'customer' ? UserType.CUSTOMER : UserType.BUSINESS;
// let signupHandler;

const data = {
  type: 'business',
};

/* Determine who handles this users signup */
switch (data.type) {
  case UserType.BUSINESS:
    console.log('I AM A BUSINESS');

    break;

  case UserType.CUSTOMER:
    console.log('I AM A CUSTOMER');

    break;

  default:
    break;
}
