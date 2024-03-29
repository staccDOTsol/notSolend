import { Connection, PublicKey } from '@solana/web3.js';
import { RouteInfo, TransactionFeeInfo } from './routes';
import { TokenRouteSegments } from './types';
export declare function fetchAccountInfos(connection: Connection, routes: TokenRouteSegments): Promise<void>;
interface GetQuotesParams {
    inputRouteSegment: TokenRouteSegments;
    amount: number;
    inputMint: PublicKey;
    outputMint: PublicKey;
    platformFeeBps: number;
    slippage: number;
    filterTopNResult?: number;
    onlyDirectRoutes?: boolean;
    getDepositAndFeeForRoute: (params: {
        marketInfos: RouteInfo['marketInfos'];
    }) => Promise<TransactionFeeInfo | undefined>;
}
export declare function processInputRouteSegmentToRoutesInfos({ inputRouteSegment, inputMint, outputMint, amount, getDepositAndFeeForRoute, platformFeeBps, slippage, filterTopNResult, onlyDirectRoutes, }: GetQuotesParams): RouteInfo[];
export {};
