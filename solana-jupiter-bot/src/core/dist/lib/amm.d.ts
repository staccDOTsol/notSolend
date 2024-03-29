/// <reference types="node" />
import { AccountInfo, Connection, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { PlatformFee, QuoteMintToReferrer, TokenMintAddress } from '..';
import { AccountInfo as TokenAccountInfo } from '@solana/spl-token';
import JSBI from 'jsbi';
export interface QuoteParams {
    sourceMint: PublicKey;
    destinationMint: PublicKey;
    amount: number;
}
export interface Quote {
    notEnoughLiquidity: boolean;
    minInAmount?: number;
    minOutAmount?: number;
    inAmount: number;
    outAmount: number;
    feeAmount: number;
    feeMint: TokenMintAddress;
    feePct: number;
    priceImpactPct: number;
}
export interface SwapParams {
    sourceMint: PublicKey;
    destinationMint: PublicKey;
    userSourceTokenAccount: PublicKey;
    userDestinationTokenAccount: PublicKey;
    userTransferAuthority: PublicKey;
    inAmount: number | null;
    minimumOutAmount: number;
    tokenLedger: PublicKey;
    openOrdersAddress?: PublicKey;
    platformFee?: PlatformFee;
    quoteMintToReferrer?: QuoteMintToReferrer;
}
export declare type AccountInfoMap = Map<string, AccountInfo<Buffer> | null>;
export interface Amm {
    label: string;
    id: string;
    reserveTokenMints: PublicKey[];
    shouldPrefetch: Boolean;
    getAccountsForUpdate(): PublicKey[];
    update(accountInfoMap: AccountInfoMap): void;
    getQuote(quoteParams: QuoteParams): Quote;
    createSwapInstructions(swapParams: SwapParams): TransactionInstruction[];
}
export declare const mapAddressToAccountInfos: (accountInfoMap: AccountInfoMap, addresses: PublicKey[]) => AccountInfo<Buffer>[];
export declare const tokenAccountsToJSBIs: (tokenAccounts: TokenAccountInfo[]) => JSBI[];
export declare const prefetchAmms: (amms: Amm[], connection: Connection) => Promise<void>;
