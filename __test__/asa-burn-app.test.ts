import {
  describe, test, expect, beforeAll, beforeEach,
} from '@jest/globals';
import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { ASABurnAppClient } from '../contracts/clients/ASABurnAppClient';

const fixture = algorandFixture();

let appClient: ASABurnAppClient;

describe('ASABurnApp', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount } = fixture.context;

    appClient = new ASABurnAppClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod,
    );

    await appClient.create.bare();
  });

  // TODO
});
