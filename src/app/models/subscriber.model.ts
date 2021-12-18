/**@todo get rid of the alias and virtuals hack and use the default mongo _id  */

import { getModelForClass, prop, modelOptions, Severity } from '@typegoose/typegoose';

/* Declare Subscriber class */
@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'subscriber' } })
export class SubscriberCollection {
  @prop({ required: true, unique: true })
  public subscriberId!: string;

  @prop({ required: true, unique: true })
  public ownerId!: string;

  @prop({ required: true })
  public businessName!: string;

  @prop({ required: true })
  public address!: string;

  @prop({ required: true })
  public city!: string;

  @prop({ required: true })
  public state!: string;

  @prop({ required: true })
  public zip!: string;

  @prop({ required: true })
  public rootEmail!: string;

  @prop({ default: '507f191e810c19729de860ea' })
  public subscriptionId!: string;
}

export const SubscriberModel = getModelForClass(SubscriberCollection);
