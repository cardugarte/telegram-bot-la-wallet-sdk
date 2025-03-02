# @lawallet/sdk

SDK for LaWallet

## Important

This package is under development and is not yet available on npm.

## Installation

```bash
pnpm add @lawallet/sdk @nostr-dev-kit/ndk
```

## Usage examples

```ts
import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { Wallet } from '@lawallet/sdk';

const signer = NDKPrivateKeySigner.generate();
const wallet = new Wallet({ signer });

wallet.fetch().then(({ lnurlpData, nostr }) => {
  // returns lnurlpData -> /.well-known/lnurlp/<user> response
  console.log('lnurlpData: ', lnurlpData);

  // returns nostr profile
  console.log('Nostr Profile: ', nostr);
});

// Returns BTC balance in millisatoshis
wallet.getBalance('BTC').then((bal) => {
  console.log(`Account BTC Balance: ${bal} milisatoshis ~ ${(bal / 100000000).toFixed(8)} BTC`);
});

// Returns all transactions
wallet.getTransactions().then((transactions) => {
  console.log('Total account transactions: ', transactions.length);
});

wallet.getCards().then(async (cards) => {
  if (cards.length) {
    // Get first card
    let firstCard = cards[0];

    // Pause first card
    await firstCard.disable();

    // Add card limit -> 1000 satoshis every 12 hours
    await firstCard.addLimit({
      tokenId: 'BTC',
      limitType: 'hours',
      limitTime: 12,
      limitAmount: 1000000,
    });

    // Set card metadata (name, description)
    await firstCard.setMetadata({ name: 'card name', description: 'card description' });

    // Prepare the event to transfer the card
    const transferEvent = await firstCard.createTransferEvent();
  }
});

wallet.generateInvoice({ milisatoshis: 1000 }).then((invoice) => {
  // Generate payment request of this wallet
  console.log(invoice.pr);
});

wallet.createZap({ milisatoshis: 1000, receiverPubkey: '...' }).then((invoice) => {
  // Generate zap request -> returns payment request of zap request
  console.log(invoice.pr);
});
```

## To - do

- [x] Project startup (Linters, Typescript, Dependencies)
- [x] Federation
- [x] Identity
  - [x] Pubkey info
  - [x] Lightning Info
  - [x] Nostr Profile
- [x] Card
  - [x] info (design, name, description)
  - [x] limits
  - [x] enable/disable
  - [x] setMetadata
  - [x] addLimit
  - [x] restartLimits
  - [x] replaceLimits
  - [x] createTransferEvent
- [ ] Wallet
  - [x] Signer + Identity
  - [x] Wallet Information
    - [x] getBalance
    - [x] getTransactions
    - [x] getCards
  - [x] signEvent
  - [x] createZap
  - [x] createInvoice
  - [ ] prepareTransaction (external / internal)
  - [ ] sendTransaction
    - [ ] onSuccess()
    - [ ] onError()
  - [ ] payInvoice
  - [ ] registerHandle (request + payment + claim)
  - [ ] addCard / activateCard
  - [ ] claimCard
- [ ] Client
  - [ ] Multiples accounts
    - [ ] accounts
    - [ ] addAccount
    - [ ] removeAccount
  - [ ] Watch transactions
  - [ ] Create event filter
  - [ ] get Transaction (txId)
