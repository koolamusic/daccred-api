import bcrypt from 'bcrypt';
import { customRandom, random } from 'nanoid';
import { PackRule, packRules, unpackRules } from '@casl/ability/extra';
import { IAMPolicyRuleDefinition } from '../definitions';

export const encryptPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
};

export const validPassword = (password: string, encodedPassword: string) => {
  return bcrypt.compareSync(password, encodedPassword);
};

export const generateIdentifier = (length = 24) => {
  const alphabet = '123456789ACDEFGHIJKLNOPQSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customRandom(alphabet, length, random);
  return nanoid();
};

export const packPermissionRules = (rules: string) => {
  const rulesObj = JSON.parse(rules);
  return packRules(rulesObj);
};

export const unpackPermissionRules = (
  rules: PackRule<IAMPolicyRuleDefinition<unknown>>[]
): IAMPolicyRuleDefinition<unknown>[] => {
  return unpackRules(rules);
};
