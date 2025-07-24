import { InternalAccount } from '@jacksapp/keyring-internal-api';
import { isEvmAccountType } from '@jacksapp/keyring-api';
import { RestrictedEthMethods } from '../../../shared/constants/permissions';

export const containsEthPermissionsAndNonEvmAccount = (
  accounts: InternalAccount[],
  permissions: Record<string, string>,
) => {
  const restrictedEthMethods = new Set(Object.keys(RestrictedEthMethods));
  return Object.keys(permissions).some((p) => restrictedEthMethods.has(p)) && accounts.some((a) => !isEvmAccountType(a.type));
};
