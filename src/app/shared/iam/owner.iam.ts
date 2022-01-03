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

export function defineRulesForOwner(): RawRuleOf<AppAbility>[] {
  const { can, rules } = new AbilityBuilder(AppAbility);

  /* Define the rules for the Superadmin User */
  can(['read_one', 'read_all'], ResourceModelSubject.POLICY);
  can(['create', 'update', 'read_one'], ResourceModelSubject.USER);
  can(['create', 'update', 'read_one', 'read_all'], ResourceModelSubject.CREDENTIAL);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.LIST);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.LIST_ENTRY);
  can(['create', 'update', 'read_one', 'read_all', 'delete'], ResourceModelSubject.TEAM);

  return rules;
}

/* Export the JSON Rules generated for superadmin */
const rules: SubjectRawRule<CRUD, SubjectType, MongoQuery<AnyObject>>[] = defineRulesForOwner();

/* Export default policy rules with placeholder ID */
export default { id: '2272d9f1', rules };
