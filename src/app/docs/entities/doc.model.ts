import { HydratedDocument, Schema, model } from 'mongoose';
import { generateUrlSlug } from '../../shared/utils/crypto.utils';

export interface AccredDocProp {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  slug: string;
  editorSchema: object;
  contractAddress: string;
  transactionHash: string;
  networkName: string;
  networkId: string; // '0x0' = Ethereum
  publishDate: Date;
  recipientsListId: Schema.Types.ObjectId[];
  ownerId: Schema.Types.ObjectId;
}

/* Custom config for timestamps, etc */
const mongooseSchemaOpts = {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
};

// Create a Schema corresponding to the document interface.
const schema = new Schema<AccredDocProp>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    slug: {
      type: String,
      default: generateUrlSlug(24),
      index: true,
      unique: true,
    },
    contractAddress: String,
    transactionHash: String,
    networkName: String,
    networkId: String,
    publishDate: Date,
    editorSchema: {
      type: Object,
      required: true,
    },
    /**
     * @description a lists of all the recipient lists that we make eligible for this certificate
     */
    recipientsListId: {
      type: [Schema.Types.ObjectId],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    ...mongooseSchemaOpts,
  }
);

/* Create the Mongoose Model for Certificate Claims / Broadcast List */
export const AccredModel = model<AccredDocProp>('accred_doc', schema);

/**
 * @see HydratedDocument<T> represents a hydrated Mongoose document,
 * with methods, virtuals, and other Mongoose-specific features.
 *
 * https://mongoosejs.com/docs/typescript.html
 */
export type AccredDocument = HydratedDocument<AccredDocProp>;
