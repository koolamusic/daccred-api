import _ from 'lodash';
import { Ability, AbilityClass, AbilityTuple, MongoQuery, SubjectRawRule, SubjectType } from '@casl/ability';
import { CRUD, IAMPolicyRuleDefinition, PolicyTemplateArgs } from '../definitions';
import { AnyObject, ExtractSubjectType, Subject } from '@casl/ability/dist/types/types';

export type AppAbility = Ability<AbilityTuple<CRUD>>;
const AppAbility = Ability as AbilityClass<AppAbility>;
type Tsuperadmin = SubjectRawRule<CRUD, SubjectType, MongoQuery<AnyObject>>[];

/* ----------------------------------------------------------------------------
    Generate Authorization grants to use on application or 
    service layer including MongoDB models. 
    generates "policy.forbid" or "policy.allow" helper methods
* -----------------------------------------------------------------------------*/
export function generateGrantsFor(
  policy: SubjectRawRule<CRUD, ExtractSubjectType<Subject>, MongoQuery<AnyObject>>[] | undefined
) {
  return new AppAbility(policy);
}

/* ----------------------------------------------------------------------------
Interpolate rules to populate template strings with user relevant
credentials for conditions in policy. used with JWT de-serialization
* -----------------------------------------------------------------------------*/
// This hook should execute on user signup.
//  Define roles for SignedUp User >> interpolate default policies and persist on database

export function interpolateRulesFor<T extends Partial<PolicyTemplateArgs>>(
  policy: IAMPolicyRuleDefinition<unknown>[] | Tsuperadmin,
  args: T
) {
  // Use custom template delimiters for lodash templates
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  /* init policy template compiler */
  const policyTemplate = JSON.stringify(policy);
  const compiler = _.template(policyTemplate);

  return compiler({ ...args });
}
