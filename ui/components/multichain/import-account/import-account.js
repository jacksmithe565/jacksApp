import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorMessage } from '../../../../shared/modules/error';
import {
  MetaMetricsEventAccountImportType,
  MetaMetricsEventAccountType,
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
import { Box, ButtonLink, Label, Text } from '../../component-library';
import Dropdown from '../../ui/dropdown';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import {
  BlockSize,
  FontWeight,
  JustifyContent,
  Size,
  TextVariant,
} from '../../../helpers/constants/design-system';
import ZENDESK_URLS from '../../../helpers/constants/zendesk-url';
import { useI18nContext } from '../../../hooks/useI18nContext';
import * as actions from '../../../store/actions';
import { getHDEntropyIndex } from '../../../selectors/selectors';

import JsonImportView from './json';
import PrivateKeyImportView from './private-key';

export const ImportAccount = ({ onActionComplete }) => {
  const t = useI18nContext();
  const dispatch = useDispatch();
  const trackEvent = useContext(MetaMetricsContext);
  const hdEntropyIndex = useSelector(getHDEntropyIndex);

  const menuItems = [t('privateKey'), t('jsonFile')];
  
  const [type, setType] = useState(menuItems[0]);

  async function importAccount(strategy, importArgs) {
    try {
      const loadingMessage =
        strategy.toLowerCase() === 'json' ? (
          <>
            <Text width={BlockSize.ThreeFourths} fontWeight={FontWeight.Bold}>
              {t('importAccountJsonLoading1')}
            </Text>
            <Text width={BlockSize.ThreeFourths} fontWeight={FontWeight.Bold}>
              {t('importAccountJsonLoading2')}
            </Text>
          </>
        ) : (
          ''
        );
      const { selectedAddress } = await dispatch(
        actions.importNewAccount(strategy, importArgs, loadingMessage),
      );
      if (selectedAddress) {
        trackImportEvent(strategy === menuItems[0] ? 'Private Key' : 'JSON', true);
        dispatch(actions.hideWarning());
        onActionComplete(true);
      } else {
        dispatch(actions.displayWarning(t('importAccountError')));
        return false;
      }
    } catch (error) {
      const message = getErrorMessage(error);
      trackImportEvent(strategy === menuItems[0] ? 'Private Key' : 'JSON', message);
      if (message && !message.startsWith('t(')) {
        dispatch(actions.displayWarning(message));
      } else if (message) {
        dispatch(actions.displayWarning(t(message.slice(3, -2))));
      }
      return false;
    }
    return true;
  }

  function trackImportEvent(strategyLabel, wasSuccessful) {
    const accountImportType =
      strategyLabel === 'Private Key'
        ? MetaMetricsEventAccountImportType.PrivateKey
        : MetaMetricsEventAccountImportType.Json;

    trackEvent({
      category: MetaMetricsEventCategory.Accounts,
      event: wasSuccessful
        ? MetaMetricsEventName.AccountAdded
        : MetaMetricsEventName.AccountAddFailed,
      properties: {
        account_type: MetaMetricsEventAccountType.Imported,
       account_import_type: accountImportType,
       hd_entropy_index: hdEntropyIndex || null ,
       is_suggested_name: true,
     },
   });
 }

 return (
   <>
     <Text variant={TextVariant.bodySm} marginTop={2}>
       {t('importAccountMsg')}{' '}
       <ButtonLink
         size={Size.inherit}
         href={ZENDESK_URLS.IMPORTED_ACCOUNTS}
         target="_blank"
         rel="noopener noreferrer"
       >
         {t('here')}
       </ButtonLink>
     </Text>
     <Box paddingTop={4} paddingBottom={8}>
       <Label
         width={BlockSize.Full}
         marginBottom={4}
         justifyContent={JustifyContent.spaceBetween}
       >
         {t('selectType')}
         <Dropdown
           options={[menuItems[0], menuItems[1]].map((text) => ({ value: text }))}
           selectedOption={type}
           onChange={(value) => {
             dispatch(actions.hideWarning());
             setType(value);
           }}
         />
       </Label>
       {(type === menuItems[0]) 
          ? (
            <PrivateKeyImportView importAccountFunc={(args)=> importAccount(menuItems[0], args)} onActionComplete= {onActionComplete}/>
          ) 
          : (
            <JsonImportView importAccountFunc={(args)=> importAccount(menuItems[1], args)} onActionComplete= {onActionComplete}/>
          )
      }
     </Box>
   </>
 );
};

ImportAccount.propTypes ={
 onActionComplete: PropTypes.func.isRequired ,
};
