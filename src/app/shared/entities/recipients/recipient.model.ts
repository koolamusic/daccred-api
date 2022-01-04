import { HydratedDocument, Schema, model, PaginateModel } from 'mongoose';
import { DataIngress } from '../../definitions';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface ListIngressProp {
  _id?: Schema.Types.ObjectId | string;
  pipeline: DataIngress; // where the data is coming from  'forms' | 'csv'
  listId: Schema.Types.ObjectId | string;
  listOwnerId: Schema.Types.ObjectId | string; // For the Team managing the credential
  jsonResponse: object;
}

const schema = new Schema<ListIngressProp>({
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

/**
 * @see database.ts for global pagination configurations
 * Integrate pagination plugin into model before model setup
 */
schema.plugin(mongoosePaginate);

/* Create the Mongoose Model for Certificate Recipients */
export const RecipientModel = model<ListIngressProp, PaginateModel<ListIngressProp>>('recipient', schema);

/**
 * @see HydratedDocument<T> represents a hydrated Mongoose document,
 * with methods, virtuals, and other Mongoose-specific features.
 *
 * https://mongoosejs.com/docs/typescript.html
 */
export type RecipientDocument = HydratedDocument<ListIngressProp>;
