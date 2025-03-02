import { LAWALLET_DEFAULT_CONFIG } from '../constants/config';
import type { CreateFederationConfigParams, FederationConfig } from '../types/Federation';

export function createFederationConfig(parameters: CreateFederationConfigParams = {}): FederationConfig {
  return {
    ...LAWALLET_DEFAULT_CONFIG,
    ...parameters,
    endpoints: {
      ...LAWALLET_DEFAULT_CONFIG.endpoints,
      ...parameters.endpoints,
    },
    modulePubkeys: {
      ...LAWALLET_DEFAULT_CONFIG.modulePubkeys,
      ...parameters.modulePubkeys,
    },
    relaysList: parameters.relaysList ?? LAWALLET_DEFAULT_CONFIG.relaysList,
  };
}
