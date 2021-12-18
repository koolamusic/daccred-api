/**@todo get rid of the alias and virtuals hack and use the default mongo _id  */

import { getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({ options: { customName: 'customer' } })
export class CustomerCollection {
  @prop({ required: true, unique: true })
  public userId!: string;

  @prop({ required: true })
  public address!: string;

  @prop({ required: true })
  public city!: string;

  @prop({ required: true })
  public state!: string;

  @prop({ required: true })
  public zip!: string;

  @prop({ required: true })
  public phone!: string;
}

export const CustomerModel = getModelForClass(CustomerCollection);
