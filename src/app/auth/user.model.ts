import { getModelForClass, prop, DocumentType, pre, modelOptions, Severity } from '@typegoose/typegoose';
import { DateTime } from 'luxon';
import { UserType } from '../shared/contracts/auth.contracts';
import * as crypto from '../shared/utils';

/* Typegoose Hook to hash password and save into db record */
@pre<UserCollection>('save', function () {
  if (this.isModified('password') || this.isNew) {
    this.password = crypto.encryptPassword(this.password);
  }
})
/* Declare user class */
@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'user' } })
export class UserCollection {
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public password!: string;

  /** @see https://github.com/typegoose/typegoose/issues/282 Adding the Type to prop here due to Babel transpile in development */
  @prop({ required: true, enum: UserType, type: String })
  public type!: UserType;

  @prop({ default: null })
  public phone!: string;

  @prop({ default: null })
  public subscriberId?: string;

  @prop({ default: false })
  public isVerified!: boolean;

  @prop({ default: null })
  resetPasswordToken?: string | null;

  @prop()
  resetPasswordTokenExpire?: number | string | DateTime;

  public async validatePassword(this: DocumentType<UserCollection>, inputPassword: string) {
    return crypto.validPassword(inputPassword, this.password);
  }
}

export const UserModel = getModelForClass(UserCollection);
