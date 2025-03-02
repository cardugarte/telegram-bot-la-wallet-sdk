import { type NostrEvent } from '@nostr-dev-kit/ndk';

export interface Transaction {
  id: string;
  status: TransactionStatus;
  direction: TransactionDirection;
  type: TransactionType;
  tokens: TokensAmount;
  memo: string;
  errors: string[];
  events: NostrEvent[];
  createdAt: number;
  metadata?: Record<string, string>;
}

export enum TransferTypes {
  INTERNAL = 'INTERNAL',
  LUD16 = 'LUD16',
  INVOICE = 'INVOICE',
  LNURL = 'LNURL',
  LNURLW = 'LNURLW',
  NONE = 'NONE',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  ERROR = 'ERROR',
  REVERTED = 'REVERTED',
}

export enum TransactionDirection {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
}

export enum TransactionType {
  CARD = 'CARD',
  INTERNAL = 'INTERNAL',
  LN = 'LN',
}

export type TokensAmount = {
  [_tokenId: string]: number;
};
