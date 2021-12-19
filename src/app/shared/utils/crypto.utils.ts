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

/**
 * @dev No Look Alike custom alphabet implementation
 * Used with NANO ID for short url friendly ID
 */
export const noll = '346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz';

/**
 * @dev Generate a short id that can be used for nonce
 * Short ID Tags etc.
 * @param min - Minimum length of generated id
 */
export const generateRandomId = (min = 12) => customRandom(noll, min, random)();

/* Specifically for generating Nonce */
export const generateRandomNonce = (min = 32) => customRandom(noll, min, random)();

export const packPermissionRules = (rules: string) => {
  const rulesObj = JSON.parse(rules);
  return packRules(rulesObj);
};

export const unpackPermissionRules = (
  rules: PackRule<IAMPolicyRuleDefinition<unknown>>[]
): IAMPolicyRuleDefinition<unknown>[] => {
  return unpackRules(rules);
};
