import bcrypt from 'bcrypt';
import { customRandom, random } from 'nanoid';
import { PackRule, packRules, unpackRules } from '@casl/ability/extra';
import { IAMPolicyRuleDefinition } from '../definitions';
import { uniqueNamesGenerator, Config, animals, countries, starWars, names } from 'unique-names-generator';

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
 * @dev Generate Random names to use for lists and docs
 * uses the unique-names-generator node library
 */

const uniqueNameConfig: Config = {
  dictionaries: [animals, countries, names],
  separator: ' ',
  style: 'lowerCase',
  length: 2,
};
export const generateUniqueName = () => uniqueNamesGenerator(uniqueNameConfig);

/**
 * @dev No Look Alike custom alphabet implementation
 * Used with NANO ID for short url friendly ID
 */
export const noll = '3456789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtvwxyz';

/**
 * @dev Generate a short id that can be used for urls and other browser safe tags
 * Short ID Tags etc.
 * @param min - Minimum length of generated id
 */
export const generateUrlSlug = (min = 16) => customRandom(noll, min, random)();

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
