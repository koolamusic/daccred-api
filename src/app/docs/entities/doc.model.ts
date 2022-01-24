import { HydratedDocument, Schema, model, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { DocumentStatus } from '../../shared/definitions';

export interface AccredDocProp {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  slug: string;
  status: DocumentStatus;
  editorSchema: object;
  contractAddress: string;
  deployerAddress: string;
  transactionHash: string;
  networkName: string;
  networkId: string; // '0x0' = Ethereum
  publishDate: Date;
  waitlist: {
    id: Schema.Types.ObjectId;
    slug: string;
  };
  owner: string;
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
      index: true,
      unique: true,
    },
    /**
     * @property status
     * Status is the one that defines whether this document can be updated
     * Once a document is published, it's metadata can never be changed again.
     */
    status: {
      type: String,
      default: DocumentStatus.DRAFT,
      index: true,
      enum: [DocumentStatus.DRAFT, DocumentStatus.ARCHIVED, DocumentStatus.PUBLISHED],
    },
    contractAddress: {
      type: String,
      index: true,
    },
    /**
     * @property deployerAddress
     * sometimes the deployer address is different from the account owner (Metamask Address Switch)
     */
    deployerAddress: String,
    transactionHash: String,
    networkName: {
      type: String,
      index: true,
    },
    networkId: {
      type: String,
      index: true,
    },
    publishDate: Date,
    editorSchema: Object,
    /**
     * @description a lists of all the recipient lists that we make eligible for this certificate
     */
    waitlist: {
      id: Schema.Types.ObjectId,
      slug: String,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  {
    ...mongooseSchemaOpts,
  }
);

/**
 * @see database.ts for global pagination configurations
 * Integrate pagination plugin into model before model setup
 */
schema.plugin(mongoosePaginate);

/* Create the Mongoose Model for Certificate Claims / Broadcast List */
export const AccredModel = model<AccredDocProp, PaginateModel<AccredDocProp>>('accred_doc', schema);

/**
 * @see HydratedDocument<T> represents a hydrated Mongoose document,
 * with methods, virtuals, and other Mongoose-specific features.
 *
 * https://mongoosejs.com/docs/typescript.html
 */
export type AccredDocument = HydratedDocument<AccredDocProp>;
