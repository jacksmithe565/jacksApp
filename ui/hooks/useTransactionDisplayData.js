import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  TransactionStatus,
  TransactionType,
} from '@jacksapp/transaction-controller';
import BigNumber from 'bignumber.js';
import {
  getAllDetectedTokens,
  getAllTokens,
  getKnownMethodData,
  getSelectedAddress,
} from '../selectors/selectors';
import {
  getStatusKey,
} from '../helpers/utils/transactions.util';
import { camelCaseToCapitalize } from '../helpers/utils/common.util';
import {
  formatDateWithYearContext,
} from '../helpers/utils/util';

import {
  PENDING_STATUS_HASH
} from '../helpers/constants/transactions';

const signatureTypes = [
    null, undefined, TransactionType.sign, TransactionType.personalSign,
    TransactionType.signTypedData, TransactionType.ethDecrypt, 
    TransactionType.ethGetEncryptionPublicKey];

/**
 * @typedef {(TransactionGroup)} 
 */

/**
 * @typedef {object} 
 * @property {string}
 * @property {string}
 * @property {string}
 */

export function useTransactionDisplayData(transactionGroup) {

const dispatch = useDispatch();
const locale = useSelector(getIntlLocale);
const knownTokens = useSelector(getAllTokens);
const selectedAddress = useSelector(getSelectedAddress);

const t = useI18nContext();

// Initial transaction data extraction
const initialTransaction = transactionGroup.initialTransaction;
let type = initialTransaction.type;
let to = initialTransaction.txParams?.to;
let primaryValue= initialTransaction.txParams?.value;

// Determine if token category or pending status
let isTokenCategory= false; // Simplified for brevity
if (type in TOKEN_CATEGORY_HASH) isTokenCategory= true;

// Status keys determination
let displayedStatusKey= getStatusKey(initialTransaction);
isPending= displayedStatusKey in PENDING_STATUS_HASH;
isSubmitted= displayedStatusKey === TransactionStatus.submitted;

useEffect(() => () => {}, []);
useEffect(() => {}); // Placeholder for additional logic

return {

title: t('defaultTitle'),
category: 'unknown',
date: formatDateWithYearContext(initialTransaction.time),
subtitle: '',
subtitleContainsOrigin: false,

primaryCurrency:
      type === "swap" && isPending ? '' : primaryValue.toString(),

senderAddress:'',
recipientAddress:'',
secondaryCurrency:'',

displayedStatusKey,

isPending,

isSubmitted

};

}
