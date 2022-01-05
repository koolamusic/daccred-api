import { HydratedDocument, Schema, model } from 'mongoose';
import { generateUrlSlug } from '../../shared/utils/crypto.utils';

export interface ClaimsProp {
  _id: Schema.Types.ObjectId;
  email?: string;
  walletAddress: string;
  walletSignature: object;
  claimed: boolean;
  contractAddress: string;
  claimURI: string;
  IPFSImgUri: string;
  networkName: string;
  networkId: string; // '0x0' = Ethereum
  documentContractAddress: string;
  documentId?: Schema.Types.ObjectId;
}

/* Custom config for timestamps, etc */
const mongooseSchemaOpts = {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
};

// Create a Schema corresponding to the document interface.
const schema = new Schema<ClaimsProp>(
  {
    email: String,
    walletAddress: String,
    walletSignature: String,
    claimed: Boolean,
    contractAddress: String,
    IPFSImgUri: String,
    claimURI: {
      type: String,
      default: generateUrlSlug(24),
      index: true,
      unique: true,
    },
    networkName: String,
    networkId: String,
    documentContractAddress: String,
    documentId: Schema.Types.ObjectId,
  },
  {
    ...mongooseSchemaOpts,
  }
);

/* Create the Mongoose Model for Certificate Claims / Broadcast List */
export const ClaimModel = model<ClaimsProp>('recipient_claim', schema);

/**
 * @see HydratedDocument<T> represents a hydrated Mongoose document,
 * with methods, virtuals, and other Mongoose-specific features.
 *
 * https://mongoosejs.com/docs/typescript.html
 */
export type ClaimDocument = HydratedDocument<ClaimsProp>;
