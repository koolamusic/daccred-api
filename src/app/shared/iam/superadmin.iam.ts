import {
  AbilityBuilder,
  Ability,
  AbilityClass,
  AbilityTuple,
  RawRuleOf,
  SubjectRawRule,
  MongoQuery,
} from '@casl/ability';
import { AnyObject, SubjectType } from '@casl/ability/dist/types/types';
import { ResourceModelSubject } from '../constants';
import { CRUD } from '../definitions';

export type AppAbility = Ability<AbilityTuple<CRUD>>;
const AppAbility = Ability as AbilityClass<AppAbility>;

function defineRulesForSuperAdmin(): RawRuleOf<AppAbility>[] {
  const { can, rules } = new AbilityBuilder(AppAbility);

  /* Define the rules for the Superadmin User */
  can('crud', 'all');
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.EMPLOYEE);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.POLICY);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.SUBSCRIBER);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.PAYMENT_MERCHANT);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.USER);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.ROLE);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.SERVICE);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], 'all');

  return rules;
}

/* Export the JSON Rules generated for superadmin */
const rules: SubjectRawRule<CRUD, SubjectType, MongoQuery<AnyObject>>[] = defineRulesForSuperAdmin();

/* Export default policy rules with placeholder ID */
export default { id: '8372d9ed', rules };
