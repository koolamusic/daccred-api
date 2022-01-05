import { JSONSchema7 } from 'json-schema';
import { HydratedDocument, Schema, model } from 'mongoose';
import { DataIngress, ListUniqueIdentifier } from '../../shared/definitions';
import { generateUrlSlug } from '../../shared/utils/crypto.utils';

export interface ListProp {
  _id: Schema.Types.ObjectId;
  name: string;
  slug: string;
  schema: JSONSchema7;
  identifier: ListUniqueIdentifier;
  integrations: DataIngress;
  documents: Schema.Types.ObjectId[];
  owner: Schema.Types.ObjectId;
}

/* Custom config for timestamps, etc */
const mongooseSchemaOpts = {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
};

// Create a Schema corresponding to the document interface.
const schema = new Schema<ListProp>(
  {
    name: {
      type: String, // Should be dynamically generated from document name or using a name package
      required: true,
    },
    slug: {
      type: String,
      default: generateUrlSlug(),
      index: true,
      unique: true,
    },
    schema: {
      type: Object,
      required: true,
    },
    identifier: {
      type: String,
      required: true,
      default: ListUniqueIdentifier.WALLET_ADDRESS,
    },
    integrations: {
      type: String,
      required: true,
      default: DataIngress.FORMS,
      enum: [DataIngress.CSV_EXCEL, DataIngress.FORMS, DataIngress.GOOGLE_CONTACTS_IMPORT],
    },
    /**
     * @description a lists of all the documents to be affiliated with this list
     * We could deprecate this sooner in favor of only owner, essentially the idea
     * would be for lists to be re-usable across various documents, credentials, badges and certificates
     *
     * Also we could do an aggregate find on the credentials/ document and get all documents
     * that has listId as a value in their data ingress properties
     */
    documents: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    ...mongooseSchemaOpts,
  }
);

/* Create the Mongoose Model for Certificate Claims / Broadcast List */
export const ListModel = model<ListProp>('recipient_list', schema);

/**
 * @see HydratedDocument<T> represents a hydrated Mongoose document,
 * with methods, virtuals, and other Mongoose-specific features.
 *
 * https://mongoosejs.com/docs/typescript.html
 */
export type ListDocument = HydratedDocument<ListProp>;
