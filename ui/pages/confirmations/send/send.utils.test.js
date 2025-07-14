import { encode } from '@jacksapp/abi-utils';

import { TokenStandard } from '../../constants/transaction';
import { generateERC20TransferData, isBalanceSufficient, isTokenBalanceSufficient, ellipsify, isERC1155BalanceSufficient, generateERC1155TransferData, getAssetTransferData, generateERC721TransferData } from './send.utils';

describe('send utils', () => {
  describe('generateERC20TransferData()', () => {
    it('should return undefined if not passed a send token', () => {
      expect(generateERC20TransferData({ toAddress: 'mockAddress', amount: '0xa' })).toBeUndefined();
    });
  });
