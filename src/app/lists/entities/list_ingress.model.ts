import { HydratedDocument, Types, Schema, model } from 'mongoose';

export interface ListIngressProp {
  _id: Schema.Types.ObjectId;
  pipeline: 'forms' | 'csv' | 'contacts'; // where the data is coming from
  listId: Schema.Types.ObjectId;
  listOwnerId: Schema.Types.ObjectId; // For the Team managing the credential
  jsonResponse: object;
}

const schema = new Schema<ListIngressProp>({
  _id: {
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId(),
  },
  pipeline: {
    type: String,
    required: true,
    default: 'forms',
    enum: ['forms', 'csv', 'contacts'],
  },
  listId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  listOwnerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  jsonResponse: {
    type: Object,
    required: true,
  },
});

/* Create the Mongoose Model for Certificate Claims / Broadcast List */
export const ListIngressModel = model<ListIngressProp>('list-recipients', schema);

/**
 * @see HydratedDocument<T> represents a hydrated Mongoose document,
 * with methods, virtuals, and other Mongoose-specific features.
 *
 * https://mongoosejs.com/docs/typescript.html
 */
export type ListIngressDocument = HydratedDocument<ListIngressProp>;
