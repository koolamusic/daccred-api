import { customRandom, random } from 'nanoid';
import { uniqueNamesGenerator, Config, animals, countries, names } from 'unique-names-generator';
import * as crypto from 'crypto';

/**
 * Generate an Random UUID using the inbuilt crypto module
 * @returns string
 * @example 19f65256-d94b-40e0-8e40-17673c01d6c0
 */
export const uuidGen = () => crypto.randomUUID();

/**
 * Generate a RandomByte Token, HEX Safe using the Crypto Module
 * @returns string(20) - string of length 20
 * @example a928e1fac39b07b64ccced42fe514839d57d5b8a
 */
export const randomByte = (length = 20) => crypto.randomBytes(length).toString('hex');

/**
 * Generate a SHA256 Hash using a randomGenerateString
 * We use SHA256 because it looks almost similar to BIP-Addresses (ETH, BSC etc)
 * as well as Keccak-256 / intention is to use this for the certificate document_id
 *
 * @param length
 * @returns string
 * @example 64298fd6a518013a4c4ea3b91ae9938d2b6051468f4de6fc107af0f2f74db441
 */
export const createSHA256Hash = (uniqueByte?: string) => {
  /**
   * We want to use a unique byte like [documentId + docName]
   * Or any other combination we have to generate the hashToken, else we
   * use the randomBytes if uniqueBytes is undefined or null
   */
  const hashToken = !uniqueByte ? randomByte() : uniqueByte;
  return crypto.createHash('sha256').update(hashToken).digest('hex');
};

/* ----------------------------------------------------------------------------\\\
/ import bcrypt from 'bcrypt';
/ export const encryptPassword = (password: string) => {
/  const salt = bcrypt.genSaltSync(8);
/  return bcrypt.hashSync(password, salt);
/ };
/ 
/ export const validPassword = (password: string, encodedPassword: string) => {
/  return bcrypt.compareSync(password, encodedPassword);
/ };
/ ------------ BCRYPT ---------------------------------------------------------- \ */

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
