import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';
import { PackRule, packRules, unpackRules } from '@casl/ability/extra';
import { IAMPolicyRuleDefinition } from '../definitions';

export type ValidateIngressOpt = {
  schema: JSONSchema7;
  json: object;
};
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

/**
 * Validate the json response from the client against the
 * defined schema in a list collection.
 *
 * @param schema - The JSON Schema object from the list
 * @param json - The json retrieved from the client
 * @returns boolean - True or false
 */
export const isValidJSONResponse = ({ schema, json }: ValidateIngressOpt): boolean => {
  const ajv = new Ajv();

  try {
    /* handle validation logic */
    const validInput = ajv.validate(schema, json);

    /* return response */
    if (!validInput) {
      console.error(ajv.errors);
      return false;
    }
    return true;
  } catch (error) {
    console.error(ajv.errors);
    return false;
  }
};

/* @see https://github.com/rjsf-team/react-jsonschema-form/blob/2a92562248461c54ba55fb455dc3c6410dd28211/packages/core/src/validate.js#L12 */
export function createCustomAjvInstance() {
  const ajv = new Ajv({
    allErrors: true,
    multipleOfPrecision: 8,
    schemaId: '$id',
  });

  // add custom formats
  ajv.addFormat('data-url', /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/);
  ajv.addFormat(
    'color',
    /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/
  );
  return ajv;
}
