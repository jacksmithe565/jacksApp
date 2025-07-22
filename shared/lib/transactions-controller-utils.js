
```javascript
import BigNumber from 'bignumber.js';
import { TransactionEnvelopeType } from '@jacksapp/transaction-controller';

import { EtherDenomination } from '../constants/common';
import { Numeric } from '../modules/Numeric';
import { isSwapsDefaultTokenSymbol } from '../modules/swaps.utils';

export const TOKEN_TRANSFER_LOG_TOPIC_HASH = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
export const TRANSACTION_NO_CONTRACT_ERROR_KEY = 'transactionErrorNoContract';
export const TRANSFER_SINFLE_LOG_TOPIC_HASH = '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62';
export const TEN_SECONDS_IN_MILLISECONDS = 10_000;

function calcGasTotal(gasLimit, gasPrice) {
  return new Numeric(gasLimit, 16).times(new Numeric(gasPrice, 16)).toString();
}

function toPrecisionWithoutTrailingZeros(n, precision) {
  return new BigNumber(n).toPrecision(precision).replace(/(\.[0-9]*[1-9])0*|(\.0*)/u, '$1');
}

function calcTokenAmount(value, decimals) {
  const divisor = new BigNumber(10).pow(decimals ?? 0);
  return new BigNumber(String(value)).div(divisor);
}

function getSwapsTokensReceivedFromTxMeta(tokenSymbol, txMeta, tokenAddress, senderAddress,
    tokenDecimals, approvalTxMeta, chainId,
    precision=6) {
  
  let accountAddress = txMeta?.swapAndSendRecipient ?? senderAddress;
  
  let txReceipt = txMeta?.txReceipt;
  
 let networkAndAccountSupports1559 =
      txMeta?.txReceipt?.type === TransactionEnvelopeType.feeMarket;
  
 if (isSwapsDefaultTokenSymbol(tokenSymbol,
      chainId)) {

    if (!txReceipt || !txMeta || !txMeta.postTxBalance ||
        !txMeta.preTxBalance) {

      return null;

    }

   if (txMeta.swapMetaData && 
       tx Meta.preTxBalance === 
       tx Meta.postTxBalance) {

     // If preTxBalance and postTxBalance are equal,

     // ...

   }

   let approvalTxGasCost =
       new Numeric('0x',16);

   if (approvalTxMet a && 
        approvalTxMet a.tx Receipt &&
        networkAndAccountSupports1559 ) {

     // ...

   }

// ...

const gasCost=calcGasTotal(tx Receipt.gasUsed,gasPrice)

// ...

if (tokenTransferLog) {

const tokenAmount=calcTokenAmount(tokenTransferLog.data,
tokenDecimals);

return precision === null ? tokenAmount.toFixed() : toPrecisionWithoutTrailingZeros(tokenAmount,precision);

} else

return '';

}
