import { HydratedDocument, Schema, model } from 'mongoose';
import { generateUrlSlug } from '../../shared/utils/crypto.utils';

export interface ListProp {
  _id: Schema.Types.ObjectId;
  name: string;
  slug: string;
  schema: object;
  documents: Schema.Types.ObjectId[];
  ownerId: Schema.Types.ObjectId;
}

// Create a Schema corresponding to the document interface.
const schema = new Schema<ListProp>({
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
  /**
   * @description a lists of all the documents to be affiliated with this list
   * We could deprecate this sooner in favor of only ownerId, essentially the idea
   * would be for lists to be re-usable across various documents, credentials, badges and certificates
   */
  documents: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

/* Create the Mongoose Model for Certificate Claims / Broadcast List */
export const ListModel = model<ListProp>('recipient_list', schema);

/**
 * @see HydratedDocument<T> represents a hydrated Mongoose document,
 * with methods, virtuals, and other Mongoose-specific features.
 *
 * https://mongoosejs.com/docs/typescript.html
 */
export type ListDocument = HydratedDocument<ListProp>;
