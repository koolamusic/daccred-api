/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* import autopopulate from 'mongoose-autopopulate' */

const autopopulate = require('mongoose-autopopulate');
import { getModelForClass, prop, Ref, plugin, Severity, modelOptions, index, mongoose } from '@typegoose/typegoose';
import paginationPlugin, { PaginateModel } from 'typegoose-pagination-plugin';
import { EmployeeInviteStatus } from '../shared/contracts';
import { UserCollection } from './user.model';

/* Declare Employee class */
@plugin(autopopulate as any)
@plugin(paginationPlugin)
@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'employee' } })
@index({ userId: 1 })
export class EmployeeCollection {
  @prop({
    alias: 'profile',
    type: mongoose.Schema.Types.ObjectId,
    autopopulate: true,
    ref: UserCollection,
    required: true,
    unique: true,
  })
  public user!: Ref<UserCollection>;

  @prop({ required: true })
  public subscriberId!: string;

  @prop({ required: true })
  public activationToken!: string | undefined;

  @prop({ required: true, default: EmployeeInviteStatus.PENDING, type: String })
  public inviteStatus!: EmployeeInviteStatus;

  @prop({ required: true })
  public invitedBy!: string;
}

export const EmployeeModel = getModelForClass(EmployeeCollection, {
  schemaOptions: {
    toJSON: {
      aliases: true,
    },
    toObject: {
      virtuals: true,
      aliases: true,
    },
  },
}) as PaginateModel<EmployeeCollection, typeof EmployeeCollection>;
