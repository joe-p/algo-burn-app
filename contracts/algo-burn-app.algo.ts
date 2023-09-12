import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class AlgoBurnApp extends Contract {
  /**
   * Opt the contract into an ASA
   *
   * @param asa The ASA to opt in to
   */
  optIntoASA(asa: Asset): void {
    assert(!globals.currentApplicationAddress.hasAsset(asa));
    sendAssetTransfer({
      assetReceiver: globals.currentApplicationAddress,
      xferAsset: asa,
      assetAmount: 0,
    });
  }
}
