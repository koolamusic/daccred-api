import { getModelForClass, prop, modelOptions, Severity } from '@typegoose/typegoose';
import { UserRoleEnum } from '../shared/definitions';
// import { SubscriberPolicy, SuperAdminPolicy } from '../shared/iam';

/* Declare role model class */
@modelOptions({ options: { allowMixed: Severity.ALLOW, customName: 'role' } })
export class RoleCollection {
  @prop({ default: undefined })
  public subscriberId!: string | null | undefined;

  @prop({ required: true, unique: true })
  public userId!: string;

  @prop({ required: true })
  public username!: string;

  @prop({ required: true })
  public policyId!: string;

  /** @see https://github.com/typegoose/typegoose/issues/282 Adding the Type to prop here due to Babel transpile in development  */
  @prop({ enum: UserRoleEnum, type: String })
  public role!: UserRoleEnum;

  @prop({ required: true, default: null })
  // public permissions!: mongoose.Types.Array<typeof SuperAdminPolicy["rules"] | typeof SubscriberPolicy["rules"]>;
  // public permissions!: typeof SuperAdminPolicy['rules'] | typeof SubscriberPolicy['rules'] | [];
  /* We actually JSON.stringify the permissions payload before persisting to the database, so no need for types */
  public permissions!: string;
}

export const RoleModel = getModelForClass(RoleCollection);
