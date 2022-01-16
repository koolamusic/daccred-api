import _ from 'lodash';

/**
 * Stub to get along with default template variables
 * Subsequent implementation will retrieve from JSONSchema of
 * Recipient List
 */
interface TemplateVarProps {
  recipient: {
    full_name: string;
    email: string;
    wallet_address: string;
  };
}

export function interpolateVariablesOf<T extends Partial<TemplateVarProps>>(storeJSON: string, args: T) {
  // Use custom template delimiters for lodash templates
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  /* init template compiler */
  const compiler = _.template(storeJSON);

  return compiler({ ...args });
}
