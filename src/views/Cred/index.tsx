import React from 'react';
import { useRealm } from 'use-realm';
// import localforage from 'localforage';
import { CRED_WIZARD_STEP, WizardStepOpts } from '@/lib/realm';

/* Import Page Components here */
import CreateNewCert from './wizard/CreateNewCert';
import Protocol from './wizard/Protocol';
import RecipientMedium from './wizard/RecipientMedium';
import MediumPreview from './wizard/MediumPreview';
import TemplateSelection from './wizard/TemplateSelection';

interface WizardProps {
  useFormStep?: (...args: unknown[]) => React.Dispatch<React.SetStateAction<string>> | Promise<void>;
}

export default function View(props: WizardProps): JSX.Element {
  const [__step__] = useRealm<WizardStepOpts[]>(CRED_WIZARD_STEP);
  const [isMounted, setMount] = React.useState(false);

  React.useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, [isMounted, __step__]);

  // const _handleStep = async () => {
  //   await _set__step__(['default']);
  // };

  let FormComponent: React.FC<WizardProps> = () => <CreateNewCert />;

  switch (__step__[__step__.length - 1]) {
    case 'default':
      FormComponent = CreateNewCert;
      break;
    case 'protocol':
      FormComponent = Protocol;
      break;
    case 'medium':
      FormComponent = RecipientMedium;
      break;
    case 'medium_preview':
      FormComponent = MediumPreview;
      break;
    case 'templates':
      FormComponent = TemplateSelection;
      break;
    default:
      break;
  }

  if (isMounted) return <FormComponent {...props} />;
  return <div>loading</div>;
}
