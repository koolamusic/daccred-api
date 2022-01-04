import { PackRule, packRules, unpackRules } from '@casl/ability/extra';
import { IAMPolicyRuleDefinition } from '../definitions';

export async function useAsyncHandler(callback: unknown) {
  try {
    const data = await callback;
    return [data, null];
  } catch (error) {
    console.error(error, `error log from async handler - ${callback}`);
    return [null, error];
  }
}

export const unpackPermissionRules = (
  rules: PackRule<IAMPolicyRuleDefinition<unknown>>[]
): IAMPolicyRuleDefinition<unknown>[] => {
  return unpackRules(rules);
};

export const packPermissionRules = (rules: string) => {
  const rulesObj = JSON.parse(rules);
  return packRules(rulesObj);
};
