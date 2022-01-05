import { HydratedDocument, Schema, model } from 'mongoose';

// 1. Create an interface representind this mongoose document
export interface User {
  publicAddress: string;
  nonce: string;
  locked: boolean;
  scope: 'personal' | 'team';
  previousNonce?: string;
  email?: string;
  moralisUserId?: string;
}

/* Custom config for timestamps, etc */
const mongooseSchemaOpts = {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
};

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>(
  {
    email: String,
    /**
     * @property publicAddress
     * This is the address from the user wallet (metamask, portic etc)
     * We also use this as the reference to this account in `owner` of other collections
     */
    publicAddress: {
      type: String,
      required: true,
      unique: true,
    },
    scope: {
      type: String,
      default: 'personal',
    },
    locked: Boolean,
    previousNonce: String,
    moralisUserId: String,

    /**
     * @property nonce
     * for convenience we derive this nonce from the user session-id
     * So in most cases, the previous_nonce can be the active x-session-id
     *
     * or we use nanoid() for most mediums,
     * or Moralis Auth Signature or sessionToken in some cases
     */
    nonce: {
      type: String,
      required: true,
    },
  },
  {
    ...mongooseSchemaOpts,
  }
);

/* Create the Mongoose Model */
export const UserModel = model<User>('User', schema);

/**
 * @see HydratedDocument<T> represents a hydrated Mongoose document,
 * with methods, virtuals, and other Mongoose-specific features.
 *
 * https://mongoosejs.com/docs/typescript.html
 */
export type UserDocument = HydratedDocument<User>;
