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
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.CREDENTIAL);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.POLICY);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.LIST);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.USER);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.TEAM);

  return rules;
}

/* Export the JSON Rules generated for superadmin */
const rules: SubjectRawRule<CRUD, SubjectType, MongoQuery<AnyObject>>[] = defineRulesForSuperAdmin();

/* Export default policy rules with placeholder ID */
export default { id: '2272d9f1', rules };
