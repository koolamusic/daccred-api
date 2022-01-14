/* Extend the realm for only managing wizard pages */
import { createRealm } from 'use-realm';

export type WizardStepOpts = 'protocol' | 'default' | 'medium' | 'medium_preview' | 'templates';
export const CRED_WIZARD_STEP = createRealm<WizardStepOpts[]>(['default']);
