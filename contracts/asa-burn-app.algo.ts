import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class ASABurnApp extends Contract {
  /**
   * Opt the contract into an ASA
   *
   * @param mbrPayment The payment that covers the opt-in MBR for the contract
   * @param asa The ASA to opt in to
   */
  optIntoASA(mbrPayment: PayTxn, asa: Asset): void {
    assert(!globals.currentApplicationAddress.hasAsset(asa));
    assert(asa.clawback === globals.zeroAddress);

    const preMBR = globals.currentApplicationAddress.minBalance;

    sendAssetTransfer({
      assetReceiver: globals.currentApplicationAddress,
      xferAsset: asa,
      assetAmount: 0,
    });

    verifyTxn(mbrPayment, {
      receiver: globals.currentApplicationAddress,
      amount: { greaterThanEqualTo: globals.currentApplicationAddress.minBalance - preMBR },
    });
  }
}
