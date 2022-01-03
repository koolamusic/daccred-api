import { HydratedDocument, Types, Schema, model } from 'mongoose';
import { DataIngress } from '../../definitions';

export interface ListIngressProp {
  _id: Schema.Types.ObjectId;
  pipeline: DataIngress; // where the data is coming from  'forms' | 'csv'
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
    default: DataIngress.FORMS,
    enum: [DataIngress.CSV_EXCEL, DataIngress.FORMS, DataIngress.GOOGLE_CONTACTS_IMPORT],
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

/* Create the Mongoose Model for Certificate Recipients */
export const RecipientModel = model<ListIngressProp>('recipient', schema);

/**
 * @see HydratedDocument<T> represents a hydrated Mongoose document,
 * with methods, virtuals, and other Mongoose-specific features.
 *
 * https://mongoosejs.com/docs/typescript.html
 */
export type RecipientDocument = HydratedDocument<ListIngressProp>;
