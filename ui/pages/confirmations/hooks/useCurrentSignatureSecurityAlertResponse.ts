import { useSelector } from 'react-redux';
import { SecurityAlertResponse } from '../types/confirm';
import { useConfirmContext } from '../context/confirm';

type SecurityAlertResponsesState = {
  jacksapp: {
    signatureSecurityAlertResponses: Record<string, SecurityAlertResponse>;
  };
};

const useCurrentSignatureSecurityAlertResponse = (): SecurityAlertResponse | undefined => {
  const { currentConfirmation } = useConfirmContext();
  const securityAlertId = currentConfirmation?.securityAlertResponse?.securityAlertId;

  return useSelector(
    (state: SecurityAlertResponsesState) =>
      securityAlertId ? state.jacksapp.signatureSecurityAlertResponses?.[securityAlertId] : undefined,
  );
};

export default useCurrentSignatureSecurityAlertResponse;
