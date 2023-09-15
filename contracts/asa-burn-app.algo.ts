import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class ASABurnApp extends Contract {
  /**
   * Sends an inner transaction to opt the contract account into an ASA. The fee for
   * the inner transaction must be covered by the sender. Will fail if the contract
   * is already opted in to the asset or if the asset has a clawback address set.
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
