import create, { GetState, SetState, Mutate, StoreApi } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import produce from 'immer'
import { Market } from '@project-serum/serum'
import {
  IDS,
  Config,
  MangoClient,
  MangoGroup,
  MangoAccount,
  MarketConfig,
  getMarketByBaseSymbolAndKind,
  GroupConfig,
  TokenConfig,
  getTokenAccountsByOwnerWithWrappedSol,
  getTokenByMint,
  TokenAccount,
  nativeToUi,
  MangoCache,
  PerpMarket,
  getAllMarkets,
  getMultipleAccounts,
  PerpMarketLayout,
  msrmMints,
  MangoAccountLayout,
  BlockhashTimes,
  MarketMode,
  I80F48,
  PerpAccount,
  PerpMarketConfig,
} from '@blockworks-foundation/mango-client'
import { AccountInfo, Commitment, Connection, PublicKey } from '@solana/web3.js'
import { EndpointInfo } from '../@types/types'
import { isDefined, zipDict } from '../utils'
import { Notification, notify } from '../utils/notifications'
import {
  DEFAULT_MARKET_KEY,
  initialMarket,
  RPC_URL_KEY,
} from '../components/SettingsModal'
import { MSRM_DECIMALS } from '@project-serum/serum/lib/token-instructions'
import { decodeBook } from '../hooks/useHydrateStore'
import {
  IExecutionLineAdapter,
  IOrderLineAdapter,
} from '../public/charting_library/charting_library'
import { Wallet } from '@solana/wallet-adapter-react'
import { coingeckoIds, fetchNftsFromHolaplexIndexer } from 'utils/tokens'
import bs58 from 'bs58'
import { PerpMarketInfo } from '@blockworks-foundation/mango-client'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

let jconfig = 
{
  "programID": "DLendnZuSiCK4kBRtX126ogq1uRnb1TGGsjW6Tnw1vMJ",
  "assets": [
    {
      "name": "Solana",
      "symbol": "SOL",
      "decimals": 9,
      "mintAddress": "So11111111111111111111111111111111111111112"
    },
    {
      "name": "USDC",
      "symbol": "USDC",
      "decimals": 6,
      "mintAddress": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    },
    {
      "name": "Cope",
      "symbol": "COPE",
      "decimals": 6,
      "mintAddress": "8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh"
    },
    {
      "name": "DAI",
      "symbol": "DAI",
      "decimals": 8,
      "mintAddress": "EjmyN6qEC1Tf1JxiG1ae7UTJhUxSwk1TCWNWqxWV4J6o"
    },
    {
      "name": "USDH",
      "symbol": "USDH",
      "decimals": 6,
      "mintAddress": "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX"
    },
    {
      "name": "PAI",
      "symbol": "PAI",
      "decimals": 6,
      "mintAddress": "Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS"
    },
    {
      "name": "USDT",
      "symbol": "USDT",
      "decimals": 6,
      "mintAddress": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
    },
    {
      "name": "UXD",
      "symbol": "UXD",
      "decimals": 6,
      "mintAddress": "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT"
    },
    {
      "name": "xUSD",
      "symbol": "xUSD",
      "decimals": 6,
      "mintAddress": "83LGLCm7QKpYZbX8q4W2kYWbtt8NJBwbVwEepzkVnJ9y"
    },
    {
      "name": "USH",
      "symbol": "USH",
      "decimals": 9,
      "mintAddress": "9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6"
    },

    {
      "symbol": "mSOL",
      "liquidityToken":{
      "decimals": 9,
      "assetPriceUSD": 30,
      "mint":"mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"},
      "decimals": 9,
      "assetPriceUSD": 30,
      "mint":"mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
      "mintAddress":"mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
      "address": "EK2sfhsJHxiocDFiQjjs3PEeYEfWnKz9aecUNUU5RToK",
      "collateralMintAddress": "kNTu9qaduuVRoMtFjW4WMxUheXdn8CtbuKHSBjH6c1R",
      "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
      "collateralSupplyAddress": "2YRjoZpJ2wJPiBWJTvhuVsMhKEwK4QAdPHiJ4a4JGxgt",
      "liquidityAddress": "J1bWjHAakCBHmJDANw43fvDh54DZij8WAoN2U1uMpZpU",
      "liquidityFeeReceiverAddress": "J1bWjHAakCBHmJDANw43fvDh54DZij8WAoN2U1uMpZpU",
      "userSupplyCap": 2500,
      "reserveSupplyCap": 300000
    },
    {
      "symbol": "stSOL",
      "liquidityToken":{
      "decimals": 9,
      "assetPriceUSD": 30,
      "mint":"7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj"
      },"address": "GHWkPz95iZKuEnPKd65jkoYqS1XuFNcYsUiDFckmtsb6",
      "decimals": 9,
      "assetPriceUSD": 30,
      "mint":"7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
      "mintAddress":"7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
      "collateralMintAddress": "Fw7VM48KVqBQPd3nhHNAzyugJe4NCvGYjtes27rHaEMm",
      "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
      "collateralSupplyAddress": "HEo8ZsRmUk8Pvp1EmrFaDfhQgoS5PM9gRwUwqzPka5GC",
      "liquidityAddress": "BJoj4X68dEZQsovwGZAeWSj2bWwPaviTHPF3vbqjkbdt",
      "liquidityFeeReceiverAddress": "BJoj4X68dEZQsovwGZAeWSj2bWwPaviTHPF3vbqjkbdt",
      "userSupplyCap": 2500,
      "reserveSupplyCap": 300000
    }, {
      "symbol": "UST",              "liquidityToken":{
        "decimals": 6,
        "assetPriceUSD": 30,
        "mint":"9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i"
        },
        "decimals": 6,
        "assetPriceUSD": 30,
        "mint":"9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
        "mintAddress":"9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
      "address": "B4hF3TrvHrQ1yzy8gaCEnB3ijsZAe2dJbNtqbeFHpdpb",
      "collateralMintAddress": "rwu4w4BmRoh9hhpWfEBYh77vSLsAKYdc1PRCaUGAFXw",
      "collateralSupplyAddress": "ZFVnCyRTxoYMraRkfWM32ww5vbgZTZ8JWcGgCrurN2k",
      "liquidityAddress": "DwgeopDtQqsWHSbTXkMgYGDHFcP3QnAVrceqWrcgmkf8",
      "liquidityFeeReceiverAddress": "4oJvRUhGcMRphYgAVtmJho3ZJsK8TB2tncZgyZ1MwcpE",
      "userSupplyCap": 10000,
      "reserveSupplyCap": 1000000
    },
    {
      "symbol": "MNGO",              "liquidityToken":{
        "decimals": 6,
        "assetPriceUSD": 0.005,
        "mint":"MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac"
        },
        "decimals": 6,
        "assetPriceUSD": 0.005,
        "mint":"MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
        "mintAddress":"MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
      "address": "3XLkmrdFQKAt9AXKvfTzc5mdgqTELoEEwEMC4eBFMG4t",
      "collateralMintAddress": "H7mqRRMvCMawBwMqYG2LJQr61BfNvp1z8aRmU712d9s8",
      "collateralSupplyAddress": "4tFeBTUmJ8B8ocQkTMRQ1VTrrgfMHUDzCyf9VWhh8xMP",
      "liquidityAddress": "Byj26aH5SFa8zUsSaKVaR78z6guQx6becBKSihxubN4u",
      "liquidityFeeReceiverAddress": "3C2c4ZkwPgJtgEzavDnxFrSuZ9mVuUMLFQfFMaBG5dnu",
      "userSupplyCap": 2500,
      "reserveSupplyCap": 300000
    }
  ],
  "markets": [
    {  "symbols": ["SOL", "USDC", "COPE", "DAI","USDH","PAI","USDT","UXD","xUSD","USH", "MSOL", "STSOL", "UST", "MNGO"],

      "name": "main",
      "address": "F8dCQofhBuspm1sVsrfr8NReJvGn1JfiR9xARnUBQgo1",
      "authorityAddress": "HECVhRpddhzhkn6n1vdiqhQe1Y65yjXuwb45jKspD1VV",
      "reserves": [
        {
          "asset": "SOL",
          "liquidityToken":{
          "mint": "So11111111111111111111111111111111111111112",
          "decimals": 9,
          "assetPriceUSD": 30},
          "mint": "So11111111111111111111111111111111111111112",
          "decimals": 9,
          "assetPriceUSD": 30,
          "address": "fuSA8HSSku7BwRsVFWotGcVpwH3QrGtnhqWRS4orhXG",
          "collateralMintAddress": "44PeAshzRSmhzQ3Da9z22YXYRN18PfsTHVXZpcQ7p7TH",
          "jareMint": "7yN93TFSCZqseppJyxXjnAnps7wH1wRtvgemFXksc25t",
          "collateralSupplyAddress": "A8aUS1MBosuSLXwfP16iYL3VgJvPKhLGwGzvpuieRTvJ",
          "liquidityAddress": "CBH6VFEhBatZ265jrfKDMey5NQgMZhedk7piu5BCDYfW",
          "liquidityFeeReceiverAddress": "wwQZH2vvWqiqwudoQYQ5RydW2CkgD5FApgD6f92KqHb",
          "userSupplyCap": 4,
          "reserveSupplyCap": 40000
        },
        {
          "asset": "USDC",
          "liquidityToken":{
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          "address": "5guv5xt2we2FpPXkSPN8oaz6C876NjiV62Np5RxghDnb",
          "collateralMintAddress": "CnwtgyFcTyuQMKDSU1KCXVS4jPksjJUVQaMkgZ2WU3ny",
          "jareMint": "2DvSLHu3HDTDEdWnYETdTtuywTvenmVQpsvn5ybEbKpA",
          "collateralSupplyAddress": "HxL7nx79BLBwjGKAmnSYPhxdbPCpzHqj7UVb1ni3iUFC",
          "liquidityAddress": "Ho9gUv6Y5KKZzxat5pbnf2skppcVpniss6zrabhWwi1n",
          "liquidityFeeReceiverAddress": "8c5tAQAobrRyHgtLZJyaprLjv4yyL5YPEqS2S4wqD9UR",
          "userSupplyCap": 10000,
          "reserveSupplyCap": 1000000
        },
        {
          "asset": "COPE",
          "liquidityToken":{
          "decimals": 6,
          "assetPriceUSD": 0.05,
          "mint":"8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh"},
          "decimals": 6,
          "assetPriceUSD": 0.05,
          "mint":"8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh",
          "address": "CoQgPXDKkBo84K14uFbGqkNmXHjKLYXt6d4BvLY6LWpu",
          "collateralMintAddress": "EHSug7WuXkoPDaeF2Cog4mcZ6SKZ5iJ1rkXFoczrXWqL",
          "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
          "collateralSupplyAddress": "4RjkXaYqrKX8pd5t9RvPt4UmhyzuXjKT25ysXWQD2V56",
          "liquidityAddress": "6q7eZ2XBkgrwRpWnaVct6aRTKV9zmiGgXYuCQs4BQsjh",
          "liquidityFeeReceiverAddress": "47AV9KQgT8MxFrBnQC5uGK56NLQRMZPgze4G4i4sgGzJ",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        },
        {
          "asset": "DAI",
          "liquidityToken":{
          "decimals": 8,
          "assetPriceUSD": 1,
          "mint":"EjmyN6qEC1Tf1JxiG1ae7UTJhUxSwk1TCWNWqxWV4J6o"},
          "decimals": 8,
          "assetPriceUSD": 1,
          "mint":"EjmyN6qEC1Tf1JxiG1ae7UTJhUxSwk1TCWNWqxWV4J6o",
          "address": "GkwFTuAEqDG1seWeSy1htLpkaSjMdqhuMSEvwWjDB4xX",
          "collateralMintAddress": "J4vUxcsHkoWudqWhooDxzx9aoHrXtZ73qj9DtQSqqwwS",
          "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
          "collateralSupplyAddress": "4dKHbXHDc13XpstSPo9chs3vvXQxjbtYb97ueppgA4JG",
          "liquidityAddress": "5rpiCSbB2eNb9v2JZj8dxKSgE3gQWguB3uigtG6W8cCq",
          "liquidityFeeReceiverAddress": "5rpiCSbB2eNb9v2JZj8dxKSgE3gQWguB3uigtG6W8cCq",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        },
        {
          "asset": "USDH",
          "liquidityToken":{
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX"},
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
          "address": "78w9qRtdCQ6zWNUGnZxk6p36sdzuutHCtMQCJM4bKyAW",
          "collateralMintAddress": "EESxsxPQzzPLw33FcKq5saQAt1y65FDSsKfJA6R4JDyk",
          "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
          "collateralSupplyAddress": "4CTXun1cgPYmb2WigPZB5YBtFGzCnaC4L3CSqqmYD8L8",
          "liquidityAddress": "5D3wK5tHv6j93ptawdYuGYhpxgjtagbLnhBWqrV57DRw",
          "liquidityFeeReceiverAddress": "EbEa9dr2seUxpgYuCCmWdopnkhboMHJ1ubPEen6H23ez",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        },
        {
          "asset": "PAI",
          "liquidityToken":{
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS"},
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
          "address": "DHP6TaqV9kafmg3ooqbvWPwzeMvtwphTzFShnjBNzRsp",
          "collateralMintAddress": "EUiemqKoJEUxTr4wtBZdqkBCWwk8qutKpprUDVSDFbbr",
          "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
          "collateralSupplyAddress": "6uWfWV8kZUPDjLVAxDoAomVXrasykgwgRXZRJhWZBdBH",
          "liquidityAddress": "6X3mfHU9FiimfF1VinUS2g1mX9LBvgywi5fRtLqnno85",
          "liquidityFeeReceiverAddress": "6X3mfHU9FiimfF1VinUS2g1mX9LBvgywi5fRtLqnno85",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        },
        {
          "asset": "USDT",
          "liquidityToken":{
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"},
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          "address": "5EmzXiKYz3skJS3PSzj9BScdbxQ8huH3CfV6f68LUZGk",
          "collateralMintAddress": "4kKNXxKRx2EdDnRU4beS9JBnuD5cMTL1BQ8WK2iZVoeu",
          "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
          "collateralSupplyAddress": "9UfnnuvLd13yw7vvCR5r3EW7Pbgkam1eR87fDkfSQ383",
          "liquidityAddress": "8PckZa5Yz2tR4zK7vyzqBC6pehHzfUipdGPP9ggwQasP",
          "liquidityFeeReceiverAddress": "8PckZa5Yz2tR4zK7vyzqBC6pehHzfUipdGPP9ggwQasP",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        },
        {
          "asset": "UXD",
          "liquidityToken":{
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT"},
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
          "address": "9kB2wr3bKEb5ahMKZNLXPPod5zw3TKYj6BxMPC7SPWpR",
          "collateralMintAddress": "DhjKo3rteKS8W2BxbdwiofRZpaSQynTt7k5zu4jYv8Fo",
          "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
          "collateralSupplyAddress": "2Ent5MByfvbGCKpksQwvXG1ugwJripceDMTAuUWkqmhp",
          "liquidityAddress": "6v4MfzUcNE7U4jWdZigXAyAMpf8kjfLPhpzRAQJHEkFN",
          "liquidityFeeReceiverAddress": "6v4MfzUcNE7U4jWdZigXAyAMpf8kjfLPhpzRAQJHEkFN",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        },
        {
          "asset": "xUSD",
          "liquidityToken":{
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"83LGLCm7QKpYZbX8q4W2kYWbtt8NJBwbVwEepzkVnJ9y"},
          "decimals": 6,
          "assetPriceUSD": 1,
          "mint":"83LGLCm7QKpYZbX8q4W2kYWbtt8NJBwbVwEepzkVnJ9y",
          "address": "BaTPg1VNoxK86wDZCWfMMdohQH1tdMx326sS2eswZNhb",
          "collateralMintAddress": "5UtPVrTGZN2qc5vLeMPXthVxQuEjqkvW15NHSqtPhPX5",
          "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
          "collateralSupplyAddress": "GsChWtokr1uVAESEMozAhMWwG2oMuv1HrfXSS1kTy8YN",
          "liquidityAddress": "53goDCNsdDcKADfy2EQRfiY3C9jewoMz5te3tw2TgfXV",
          "liquidityFeeReceiverAddress": "53goDCNsdDcKADfy2EQRfiY3C9jewoMz5te3tw2TgfXV",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        },
        {
          "asset": "USH",
          "liquidityToken":{
          "decimals": 9,
          "assetPriceUSD": 1,
          "mint":"9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6"
          },"address": "5MRaCd2mVqgT67sTBzRTUZChgCESot51zdApWCpAeb7h",
          "decimals": 9,
          "assetPriceUSD": 1,
          "mint":"9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6",
          "collateralMintAddress": "HYdzX8u6GUE2JrnBxpLocquPRmkZbr5UDAmax2orU65c",
          "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
          "collateralSupplyAddress": "2FFQZiYsqDxHHEZJxu2b7tQa3mgrnftUVaPj97RFpgeq",
          "liquidityAddress": "Ck92WGWDJWWSUZRMxEpvMinF3UG7FfKDDroeSAYkeFfi",
          "liquidityFeeReceiverAddress": "Ck92WGWDJWWSUZRMxEpvMinF3UG7FfKDDroeSAYkeFfi",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        },
  
        {
          "asset": "mSOL",
          "liquidityToken":{
          "decimals": 9,
          "assetPriceUSD": 30,
          "mint":"mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"},
          "decimals": 9,
          "assetPriceUSD": 30,
          "mint":"mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
          "address": "EK2sfhsJHxiocDFiQjjs3PEeYEfWnKz9aecUNUU5RToK",
          "collateralMintAddress": "kNTu9qaduuVRoMtFjW4WMxUheXdn8CtbuKHSBjH6c1R",
          "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
          "collateralSupplyAddress": "2YRjoZpJ2wJPiBWJTvhuVsMhKEwK4QAdPHiJ4a4JGxgt",
          "liquidityAddress": "J1bWjHAakCBHmJDANw43fvDh54DZij8WAoN2U1uMpZpU",
          "liquidityFeeReceiverAddress": "J1bWjHAakCBHmJDANw43fvDh54DZij8WAoN2U1uMpZpU",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        },
        {
          "asset": "stSOL",
          "liquidityToken":{
          "decimals": 9,
          "assetPriceUSD": 30,
          "mint":"7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj"
          },"address": "GHWkPz95iZKuEnPKd65jkoYqS1XuFNcYsUiDFckmtsb6",
          "decimals": 9,
          "assetPriceUSD": 30,
          "mint":"7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
          "collateralMintAddress": "Fw7VM48KVqBQPd3nhHNAzyugJe4NCvGYjtes27rHaEMm",
          "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
          "collateralSupplyAddress": "HEo8ZsRmUk8Pvp1EmrFaDfhQgoS5PM9gRwUwqzPka5GC",
          "liquidityAddress": "BJoj4X68dEZQsovwGZAeWSj2bWwPaviTHPF3vbqjkbdt",
          "liquidityFeeReceiverAddress": "BJoj4X68dEZQsovwGZAeWSj2bWwPaviTHPF3vbqjkbdt",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        }, {
          "asset": "UST",              "liquidityToken":{
            "decimals": 6,
            "assetPriceUSD": 30,
            "mint":"9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i"
            },
            "decimals": 6,
            "assetPriceUSD": 30,
            "mint":"9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
          "address": "B4hF3TrvHrQ1yzy8gaCEnB3ijsZAe2dJbNtqbeFHpdpb",
          "collateralMintAddress": "rwu4w4BmRoh9hhpWfEBYh77vSLsAKYdc1PRCaUGAFXw",
          "collateralSupplyAddress": "ZFVnCyRTxoYMraRkfWM32ww5vbgZTZ8JWcGgCrurN2k",
          "liquidityAddress": "DwgeopDtQqsWHSbTXkMgYGDHFcP3QnAVrceqWrcgmkf8",
          "liquidityFeeReceiverAddress": "4oJvRUhGcMRphYgAVtmJho3ZJsK8TB2tncZgyZ1MwcpE",
          "userSupplyCap": 10000,
          "reserveSupplyCap": 1000000
        },
        {
          "asset": "MNGO",              "liquidityToken":{
            "decimals": 6,
            "assetPriceUSD": 0.005,
            "mint":"MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac"
            },
            "decimals": 6,
            "assetPriceUSD": 0.005,
            "mint":"MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
          "address": "3XLkmrdFQKAt9AXKvfTzc5mdgqTELoEEwEMC4eBFMG4t",
          "collateralMintAddress": "H7mqRRMvCMawBwMqYG2LJQr61BfNvp1z8aRmU712d9s8",
          "collateralSupplyAddress": "4tFeBTUmJ8B8ocQkTMRQ1VTrrgfMHUDzCyf9VWhh8xMP",
          "liquidityAddress": "Byj26aH5SFa8zUsSaKVaR78z6guQx6becBKSihxubN4u",
          "liquidityFeeReceiverAddress": "3C2c4ZkwPgJtgEzavDnxFrSuZ9mVuUMLFQfFMaBG5dnu",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        }
      ]
    }
  ],
  "oracles": {
    "pythProgramID": "gSbePebfvPy7tRqimPoVecS2UsBvYv46ynrzWocc92s",
    "switchboardProgramID": "7azgmy1pFXHikv36q1zZASvFq5vFa39TT9NweVugKKTU",
    "assets": [
      {
        "asset": "SOL",
        "oracleAddress": "8GWTTbNiXdmyZREXbjsZBmCRuzdPrW55dnZGDkTRjWvb",
        "priceAddress": "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        "switchboardFeedAddress": "AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL"
      },
      {
        "asset": "USDC",
        "oracleAddress": "EMkxjGC1CQ7JLiutDbfYb7UKb3zm9SJcUmr1YicBsdpZ",
        "priceAddress": "JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB",
        "switchboardFeedAddress": "CZx29wKMUxaJDq6aLVQTdViPL754tTR64NAgQBUGxxHb"
      },
      {
        "asset": "SRM",
        "oracleAddress": "2nBBaJ2WozeqyDGaVXAqm3d5YqCjeDhoqpfTjyLNykxe",
        "priceAddress": "9xYBiDWYsh2fHzpsz3aaCnNHCKWBNtfEDLtU6kS4aFD9",
        "switchboardFeedAddress": "BAoygKcKN7wk8yKzLD6sxzUQUqLvhBV1rjMA4UJqfZuH"
      }
    ]
  }
}
export const ENDPOINTS: EndpointInfo[] = [
  {
    name: 'mainnet',
    url: process.env.NEXT_PUBLIC_ENDPOINT || 'https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr',
    websocket: process.env.NEXT_PUBLIC_ENDPOINT || 'https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr',
    custom: false,
  },
  {
    name: 'devnet',
    // url: 'https://mango.devnet.rpcpool.com',
    // websocket: 'https://mango.devnet.rpcpool.com',
    url: 'https://api.devnet.solana.com',
    websocket: 'https://api.devnet.solana.com',
    custom: false,
  },
  {
    name: 'testnet',
    url: 'https://api.testnet.solana.com',
    websocket: 'https://api.testnet.solana.com',
    custom: false,
  },
]

type ClusterType = 'mainnet' | 'devnet' | 'testnet'
const DEFAULT_MANGO_GROUP_NAME = process.env.NEXT_PUBLIC_GROUP || 'mainnet.1'
export const CLUSTER = DEFAULT_MANGO_GROUP_NAME.split('.')[0] as ClusterType
const ENDPOINT = ENDPOINTS.find((e) => e.name === CLUSTER) as EndpointInfo

export const WEBSOCKET_CONNECTION = new Connection(
  ENDPOINT.websocket,
  'processed' as Commitment
)

export const DEFAULT_MANGO_GROUP_CONFIG = Config.ids().getGroup(
  CLUSTER,
  DEFAULT_MANGO_GROUP_NAME
) as GroupConfig
const defaultMangoGroupIds = IDS['groups'].find(
  (group) => group.name === DEFAULT_MANGO_GROUP_NAME
)
export const MNGO_INDEX = defaultMangoGroupIds!.oracles.findIndex(
  (t) => t.symbol === 'MNGO'
)

export const programId = new PublicKey(defaultMangoGroupIds!.mangoProgramId)
export const serumProgramId = new PublicKey(
  defaultMangoGroupIds!.serumProgramId
)
const mangoGroupPk = new PublicKey(defaultMangoGroupIds!.publicKey)

export const SECONDS = 1000
export const CLIENT_TX_TIMEOUT = 90000

export const LAST_ACCOUNT_KEY = 'lastAccountViewed-3.0'

// Used to retry loading the MangoGroup and MangoAccount if an rpc node error occurs
let mangoGroupRetryAttempt = 0
let mangoAccountRetryAttempt = 0

const initMangoClient = (connection: Connection): MangoClient => {
  return new MangoClient(connection, programId, {
    timeout: CLIENT_TX_TIMEOUT,
    prioritizationFee: 5000,
    postSendTxCallback: ({ txid }: { txid: string }) => {
      notify({
        title: 'Transaction sent',
        description: 'Waiting for confirmation',
        type: 'confirm',
        txid: txid,
      })
    },
    blockhashCommitment: 'confirmed',
  })
}

// an object with keys of Solana account addresses that we are
// subscribing to with connection.onAccountChange() in the
// useHydrateStore hook
interface AccountInfoList {
  [key: string]: AccountInfo<Buffer>
}

export interface WalletToken {
  account: TokenAccount
  config: TokenConfig
  uiBalance: number
}

export interface Orderbook {
  bids: number[][]
  asks: number[][]
}

export interface Alert {
  acc: PublicKey
  alertProvider: 'mail'
  health: number
  _id: string
  open: boolean
  timestamp: number
  triggeredTimestamp: number | undefined
}

export interface AlertRequest {
  alertProvider: 'mail'
  health: number
  mangoGroupPk: string
  mangoAccountPk: string
  email: string | undefined
}

interface NFTFiles {
  type: string
  uri: string
}
interface NFTProperties {
  category: string
  files: NFTFiles[]
}

interface NFTData {
  image: string
  name: string
  description: string
  properties: NFTProperties
  collection: {
    family: string
    name: string
  }
}

interface NFTWithMint {
  val: NFTData
  mint: string
  tokenAddress: string
}

interface ProfileDetails {
  profile_image_url?: string
  profile_name: string
  trader_category: string
  wallet_pk: string
}

export interface SpotBalance {
  market: null
  key: string
  symbol: string
  deposits: I80F48
  borrows: I80F48
  orders: number
  unsettled: number
  net: I80F48
  value: I80F48
  depositRate: I80F48
  borrowRate: I80F48
  decimals: number
}

export interface PerpPosition {
  perpMarketInfo: PerpMarketInfo
  marketConfig: PerpMarketConfig
  perpMarket: PerpMarket
  perpAccount: PerpAccount
  basePosition: number
  indexPrice: number
  avgEntryPrice: number
  breakEvenPrice: number
  notionalSize: number
  unrealizedPnl: number
  unsettledPnl: number
}

export type MangoStore = {
  notificationIdCounter: number
  notifications: Array<Notification>
  accountInfos: AccountInfoList
  connection: {
    cluster: ClusterType
    current: Connection
    websocket: Connection
    endpoint: string
    client: MangoClient
    slot: number
    blockhashTimes: BlockhashTimes[]
  }
  selectedMarket: {
    config: MarketConfig
    current: Market | PerpMarket | null
    markPrice: number
    kind: string
    orderBook: Orderbook
    fills: any[]
  }
  mangoGroups: Array<MangoGroup>
  selectedMangoGroup: {
    config: GroupConfig
    name: string
    current: MangoGroup | null
    markets: {
      [address: string]: Market | PerpMarket | undefined
    }
    cache: MangoCache | null
  }
  mangoAccounts: MangoAccount[]
  referrals: {
    total: number
    history: any[]
  }
  referrerPk: PublicKey | null
  selectedMangoAccount: {
    current: MangoAccount | null
    initialLoad: boolean
    lastUpdatedAt: string
    lastSlot: number
    loading: boolean
    openOrders: any[]
    totalOpenOrders: number
    spotBalances: SpotBalance[]
    perpPositions: (PerpPosition | undefined)[]
    openPerpPositions: PerpPosition[]
    unsettledPerpPositions: PerpPosition[]
    totalOpenPerpPositions: number
  }
  tradeForm: {
    side: 'buy' | 'sell'
    price: number | ''
    baseSize: number | ''
    quoteSize: number | ''
    tradeType:
      | 'Market'
      | 'Limit'
      | 'Stop Loss'
      | 'Take Profit'
      | 'Stop Limit'
      | 'Take Profit Limit'
    triggerPrice: number | ''
    triggerCondition: 'above' | 'below'
  }
  wallet: {
    tokens: WalletToken[] | any[]
    nfts: {
      data: NFTWithMint[] | []
      loading: boolean
    }
  }
  settings: {
    uiLocked: boolean
  }
  tradeHistory: {
    initialLoad: boolean
    spot: any[]
    perp: any[]
    parsed: any[]
  }
  profile: {
    loadProfileFollowing: boolean
    loadFollowers: boolean
    loadDetails: boolean
    details: ProfileDetails
    following: any[]
  }
  set: (x: (x: MangoStore) => void) => void
  actions: {
    fetchWalletTokens: (wallet: Wallet) => void
    fetchNfts: (walletPk: PublicKey | null) => void
    fetchAllMangoAccounts: (wallet: Wallet) => Promise<void>
    fetchMangoGroup: () => Promise<void>
    fetchTradeHistory: () => void
    reloadMangoAccount: () => Promise<void>
    reloadOrders: () => void
    updateOpenOrders: () => void
    loadMarketFills: () => Promise<void | null>
    loadReferralData: () => void
    fetchMangoGroupCache: () => void
    updateConnection: (url: string) => void
    createAlert: (alert: AlertRequest) => void
    deleteAlert: (id: string) => void
    loadAlerts: (pk: PublicKey) => void
    fetchMarketsInfo: () => void
    fetchCoingeckoPrices: () => void
    fetchProfileDetails: (pk: string) => void
    fetchProfileFollowing: (pk: string) => void
    followAccount: (
      mangoAccountPk: string,
      publicKey: PublicKey,
      signMessage: any
    ) => void
    unfollowAccount: (
      mangoAccountPk: string,
      publicKey: PublicKey,
      signMessage: any
    ) => void
  }
  alerts: {
    activeAlerts: Array<Alert>
    triggeredAlerts: Array<Alert>
    loading: boolean
    error: string
    submitting: boolean
    success: string
  }
  marketsInfo: any[]
  tradingView: {
    orderLines: Map<string, IOrderLineAdapter>
    tradeExecutions: Map<string, IExecutionLineAdapter>
  }
  coingeckoPrices: { data: any[]; loading: boolean }
}

const useMangoStore = create<
  MangoStore,
  SetState<MangoStore>,
  GetState<MangoStore>,
  Mutate<StoreApi<MangoStore>, [['zustand/subscribeWithSelector', never]]>
>(
  subscribeWithSelector((set, get) => {
    let rpcUrl = ENDPOINT?.url
    if (typeof window !== 'undefined' && CLUSTER === 'mainnet') {
      const urlFromLocalStorage = localStorage.getItem(RPC_URL_KEY)
      rpcUrl = urlFromLocalStorage
        ? JSON.parse(urlFromLocalStorage)
        : ENDPOINT?.url
    }

    let defaultMarket = initialMarket
    if (typeof window !== 'undefined') {
      const marketFromLocalStorage = localStorage.getItem(DEFAULT_MARKET_KEY)
      defaultMarket = marketFromLocalStorage
        ? JSON.parse(marketFromLocalStorage)
        : initialMarket
    }
    const connection = new Connection(rpcUrl, 'processed' as Commitment)
    const client = initMangoClient(connection)
    return {
      marketsInfo: [],
      notificationIdCounter: 0,
      notifications: [],
      accountInfos: {},
      connection: {
        cluster: CLUSTER,
        current: connection,
        websocket: WEBSOCKET_CONNECTION,
        client,
        endpoint: ENDPOINT.url,
        slot: 0,
        blockhashTimes: [],
      },
      selectedMangoGroup: {
        config: DEFAULT_MANGO_GROUP_CONFIG,
        name: DEFAULT_MANGO_GROUP_NAME,
        current: null,
        markets: {},
        rootBanks: [],
        cache: null,
      },
      selectedMarket: {
        config: getMarketByBaseSymbolAndKind(
          DEFAULT_MANGO_GROUP_CONFIG,
          defaultMarket.base,
          defaultMarket.kind
        ) as MarketConfig,
        kind: defaultMarket.kind,
        current: null,
        markPrice: 0,
        orderBook: { bids: [], asks: [] },
        fills: [],
      },
      mangoGroups: [],
      mangoAccounts: [],
      referrals: {
        total: 0,
        history: [],
      },
      referrerPk: null,
      selectedMangoAccount: {
        current: null,
        initialLoad: true,
        lastUpdatedAt: '0',
        lastSlot: 0,
        loading: false,
        openOrders: [],
        totalOpenOrders: 0,
        spotBalances: [],
        perpPositions: [],
        openPerpPositions: [],
        totalOpenPerpPositions: 0,
        unsettledPerpPositions: [],
      },
      tradeForm: {
        side: 'buy',
        baseSize: '',
        quoteSize: '',
        tradeType: 'Limit',
        price: '',
        triggerPrice: '',
        triggerCondition: 'above',
      },
      wallet: {
        tokens: [],
        nfts: {
          data: [],
          loading: false,
        },
      },
      settings: {
        uiLocked: true,
      },
      alerts: {
        activeAlerts: [],
        triggeredAlerts: [],
        loading: false,
        error: '',
        submitting: false,
        success: '',
      },
      tradeHistory: {
        initialLoad: false,
        spot: [],
        perp: [],
        parsed: [],
      },
      tradingView: {
        orderLines: new Map(),
        tradeExecutions: new Map(),
      },
      coingeckoPrices: { data: [], loading: false },
      profile: {
        loadProfileFollowing: false,
        loadFollowers: false,
        loadDetails: false,
        details: { profile_name: '', trader_category: '', wallet_pk: '' },
        following: [],
      },
      set: (fn) => set(produce(fn)),
      actions: {
        async fetchWalletTokens(wallet: Wallet) {
          const groupConfig = get().selectedMangoGroup.config
          const connected = wallet?.adapter?.connected
          const connection = get().connection.current
          const cluster = get().connection.cluster
          const set = get().set

          if (wallet?.adapter?.publicKey && connected) {
            let ownedTokenAccounts =
              (await connection.getParsedTokenAccountsByOwner(
                wallet.adapter.publicKey,
                {programId: TOKEN_PROGRAM_ID}
              )).value
            const tokens: any = []
            let mints: any = [] 
            let configs: any = {}
                for (var res of jconfig.markets[0].reserves){
                  mints.push(res.liquidityToken.mint)
                  configs[res.liquidityToken.mint] = (res.liquidityToken)
                  // @ts-ignore
                  configs[res.liquidityToken.mint].mintKey = new PublicKey(res.liquidityToken.mint)
                  // @ts-ignore
                  configs[res.liquidityToken.mint].symbol = res.asset
                }
                ownedTokenAccounts = ownedTokenAccounts.filter((tas) => mints.includes( tas.account.data.parsed.info.mint))
                console.log(ownedTokenAccounts)
            ownedTokenAccounts?.forEach((account) => {
              const config = getTokenByMint(groupConfig, account.account.data.parsed.info.mint)
              if (config) {
                const uiBalance = (account.account.data.parsed.info.tokenAmount.uiAmount)
                tokens.push({ account, config, uiBalance })
              } 
              else {

                const uiBalance = (account.account.data.parsed.info.tokenAmount.uiAmount)

                tokens.push({ account, config:configs[account.account.data.parsed.info.mint], uiBalance })
              }
            })

            set((state) => {
              state.wallet.tokens = tokens
            })
          } else {
            set((state) => {
              state.wallet.tokens = []
            })
          }
        },
        async fetchNfts(ownerPk: PublicKey) {
          const set = get().set
          set((state) => {
            state.wallet.nfts.loading = true
          })
          try {
            const data = await fetchNftsFromHolaplexIndexer(ownerPk)
            set((state) => {
              state.wallet.nfts.data = data.nfts
              state.wallet.nfts.loading = false
            })
          } catch (error) {
            notify({
              type: 'error',
              title: 'Unable to fetch nfts',
            })
          }
          return []
        },
        async fetchAllMangoAccounts(wallet) {
          const set = get().set
          const mangoGroup = get().selectedMangoGroup.current
          const mangoClient = get().connection.client
          const actions = get().actions

          if (!wallet?.adapter?.publicKey || !mangoGroup) return

          const delegateFilter = [
            {
              memcmp: {
                offset: MangoAccountLayout.offsetOf('delegate'),
                bytes: wallet.adapter.publicKey?.toBase58(),
              },
            },
          ]
          const accountSorter = (a, b) =>
            a.publicKey.toBase58() > b.publicKey.toBase58() ? 1 : -1

          return Promise.all([
            mangoClient.getMangoAccountsForOwner(
              mangoGroup,
              wallet.adapter.publicKey,
              true
            ),
            mangoClient.getAllMangoAccounts(mangoGroup, delegateFilter, false),
          ])
            .then((values) => {
              const [mangoAccounts, delegatedAccounts] = values
              if (mangoAccounts.length + delegatedAccounts.length > 0) {
                const sortedAccounts = mangoAccounts
                  .slice()
                  .sort(accountSorter)
                  .concat(delegatedAccounts.sort(accountSorter))

                set((state) => {
                  state.selectedMangoAccount.initialLoad = false
                  state.mangoAccounts = sortedAccounts
                  if (!state.selectedMangoAccount.current) {
                    const lastAccount = localStorage.getItem(LAST_ACCOUNT_KEY)
                    let currentAcct = sortedAccounts[0]
                    if (lastAccount) {
                      currentAcct =
                        mangoAccounts.find(
                          (ma) =>
                            ma.publicKey.toString() === JSON.parse(lastAccount)
                        ) || sortedAccounts[0]
                    }

                    state.selectedMangoAccount.current = currentAcct
                  }
                })
              } else {
                set((state) => {
                  state.selectedMangoAccount.initialLoad = false
                })
              }
            })
            .catch((err) => {
              if (mangoAccountRetryAttempt < 2) {
                actions.fetchAllMangoAccounts(wallet)
                mangoAccountRetryAttempt++
              } else {
                notify({
                  type: 'error',
                  title: 'Unable to load mango account',
                  description: err.message,
                })
                console.log('Could not get margin accounts for wallet', err)
              }
            })
        },
        async fetchMangoGroup() {
          const set = get().set
          const mangoGroupConfig = get().selectedMangoGroup.config
          const selectedMarketConfig = get().selectedMarket.config
          const mangoClient = get().connection.client
          const connection = get().connection.current
          const actions = get().actions

          return mangoClient
            .getMangoGroup(mangoGroupPk)
            .then(async (mangoGroup) => {
              mangoGroup.loadCache(connection).then((mangoCache) => {
                set((state) => {
                  state.selectedMangoGroup.cache = mangoCache
                })
              })
              mangoGroup.loadRootBanks(connection).then(() => {
                set((state) => {
                  state.selectedMangoGroup.current = mangoGroup
                })
              })

              const allMarketConfigs = getAllMarkets(mangoGroupConfig)
              const allMarketPks = allMarketConfigs.map((m) => m.publicKey)
              const allBidsAndAsksPks = allMarketConfigs
                .map((m) => [m.bidsKey, m.asksKey])
                .flat()

              let allMarketAccountInfos, allBidsAndAsksAccountInfos
              try {
                const resp = await Promise.all([
                  getMultipleAccounts(connection, allMarketPks),
                  getMultipleAccounts(connection, allBidsAndAsksPks),
                ])
                allMarketAccountInfos = resp[0]
                allBidsAndAsksAccountInfos = resp[1]
              } catch {
                notify({
                  type: 'error',
                  title: 'Failed to load the mango group. Please refresh.',
                })
              }

              const allMarketAccounts = allMarketConfigs.map((config, i) => {
                if (config.kind == 'spot') {
                  const decoded = Market.getLayout(programId).decode(
                    allMarketAccountInfos[i].accountInfo.data
                  )
                  return new Market(
                    decoded,
                    config.baseDecimals,
                    config.quoteDecimals,
                    undefined,
                    mangoGroupConfig.serumProgramId
                  )
                }
                if (config.kind == 'perp') {
                  const decoded = PerpMarketLayout.decode(
                    allMarketAccountInfos[i].accountInfo.data
                  )
                  return new PerpMarket(
                    config.publicKey,
                    config.baseDecimals,
                    config.quoteDecimals,
                    decoded
                  )
                }
              })

              const allMarkets = zipDict(
                allMarketPks.map((pk) => pk.toBase58()),
                allMarketAccounts
              )

              const currentSelectedMarket = allMarketAccounts.find((mkt) =>
                mkt?.publicKey.equals(selectedMarketConfig.publicKey)
              )

              set((state) => {
                state.selectedMangoGroup.markets = allMarkets
                state.selectedMarket.current = currentSelectedMarket
                  ? currentSelectedMarket
                  : null

                allBidsAndAsksAccountInfos.forEach(
                  ({ publicKey, context, accountInfo }) => {
                    if (context.slot >= state.connection.slot) {
                      state.connection.slot = context.slot
                      const perpMarket = allMarketAccounts.find((mkt) => {
                        if (mkt instanceof PerpMarket) {
                          return (
                            mkt.bids.equals(publicKey) ||
                            mkt.asks.equals(publicKey)
                          )
                        }
                      })
                      if (perpMarket) {
                        accountInfo['parsed'] = decodeBook(
                          perpMarket,
                          accountInfo
                        )
                      }
                      state.accountInfos[publicKey.toBase58()] = accountInfo
                    }
                  }
                )
              })
            })
            .catch((err) => {
              if (mangoGroupRetryAttempt < 2) {
                actions.fetchMangoGroup()
                mangoGroupRetryAttempt++
              } else {
                notify({
                  title: 'Failed to load mango group. Please refresh',
                  description: `${err}`,
                  type: 'error',
                })
                console.log('Could not get mango group: ', err)
              }
            })
        },
        async fetchTradeHistory() {
            const selectedMangoAccount = get().selectedMangoAccount.current
          const set = get().set

          return
          fetch(
            // @ts-ignore
            `https://trade-history-api-v3.onrender.com/perp_trades/${selectedMangoAccount.publicKey.toString()}`
          )
            .then((response) => response.json())
            .then((jsonPerpHistory) => {
              const perpHistory = jsonPerpHistory?.data || []
              if (perpHistory.length === 5000) {
                fetch(
                  // @ts-ignore
                  `https://trade-history-api-v3.onrender.com/perp_trades/${selectedMangoAccount.publicKey.toString()}?page=2`
                )
                  .then((response) => response.json())
                  .then((jsonPerpHistory) => {
                    const perpHistory2 = jsonPerpHistory?.data || []
                    set((state) => {
                      state.tradeHistory.perp = perpHistory.concat(perpHistory2)
                    })
                  })
                  .catch((e) => {
                    console.error('Error fetching trade history', e)
                  })
              } else {
                set((state) => {
                  state.tradeHistory.perp = perpHistory
                })
              }
            })
            .catch((e) => {
              console.error('Error fetching trade history', e)
            })

                                      // @ts-ignore
          if (selectedMangoAccount.spotOpenOrdersAccounts.length) {
            const openOrdersAccounts =
            // @ts-ignore
              selectedMangoAccount.spotOpenOrdersAccounts.filter(isDefined)
            const publicKeys = openOrdersAccounts.map((act) =>
              act.publicKey.toString()
            )
            Promise.all(
              publicKeys.map(async (pk) => {
                const response = await fetch(
                  `https://trade-history-api-v3.onrender.com/trades/open_orders/${pk.toString()}`
                )
                const parsedResponse = await response.json()
                return parsedResponse?.data ? parsedResponse.data : []
              })
            )
              .then((serumTradeHistory) => {
                set((state) => {
                  state.tradeHistory.spot = serumTradeHistory
                })
              })
              .catch((e) => {
                console.error('Error fetching trade history', e)
              })
          }
          set((state) => {
            state.tradeHistory.initialLoad = true
          })
        },
        async reloadMangoAccount() {
          const set = get().set
          const mangoAccount = get().selectedMangoAccount.current
          const connection = get().connection.current
          const mangoClient = get().connection.client

          if (!mangoAccount) return

          set((state) => {
            state.selectedMangoAccount.loading = true
          })

          const [reloadedMangoAccount, lastSlot] =
            await mangoAccount?.reloadFromSlot(connection, mangoClient.lastSlot)
          const lastSeenSlot = get().selectedMangoAccount.lastSlot

          set((state) => {
            state.selectedMangoAccount.loading = false
          })

          if (lastSlot > lastSeenSlot) {
            set((state) => {
              state.selectedMangoAccount.current = reloadedMangoAccount
              state.selectedMangoAccount.lastUpdatedAt =
                new Date().toISOString()
              state.selectedMangoAccount.lastSlot = lastSlot
            })
          }
        },
        async reloadOrders() {
          const set = get().set
          const mangoAccount = get().selectedMangoAccount.current
          const connection = get().connection.current
          if (mangoAccount) {
            const [spotOpenOrdersAccounts, advancedOrders] = await Promise.all([
              mangoAccount?.loadOpenOrders(
                connection,
                new PublicKey(serumProgramId)
              ),
              mangoAccount?.loadAdvancedOrders(connection),
            ])
            mangoAccount.spotOpenOrdersAccounts = spotOpenOrdersAccounts
            mangoAccount.advancedOrders = advancedOrders
            set((state) => {
              state.selectedMangoAccount.current = mangoAccount
              state.selectedMangoAccount.lastUpdatedAt =
                new Date().toISOString()
            })
          }
        },
        async updateOpenOrders() {
          const set = get().set
          const connection = get().connection.current
          const bidAskAccounts = Object.keys(get().accountInfos).map(
            (pk) => new PublicKey(pk)
          )
          const markets = Object.values(
            useMangoStore.getState().selectedMangoGroup.markets
          )
          const allBidsAndAsksAccountInfos = await getMultipleAccounts(
            connection,
            bidAskAccounts
          )

          set((state) => {
            allBidsAndAsksAccountInfos.forEach(
              ({ publicKey, context, accountInfo }) => {
                state.connection.slot = context.slot

                const perpMarket = markets.find((mkt) => {
                  if (mkt instanceof PerpMarket) {
                    return (
                      mkt.bids.equals(publicKey) || mkt.asks.equals(publicKey)
                    )
                  }
                })
                if (perpMarket) {
                  accountInfo['parsed'] = decodeBook(perpMarket, accountInfo)
                }
                state.accountInfos[publicKey.toBase58()] = accountInfo
              }
            )
          })
        },
        async loadMarketFills() {
          const set = get().set
          const selectedMarket = get().selectedMarket.current
          const connection = get().connection.current
          if (!selectedMarket) {
            return null
          }
          try {
            const loadedFills = await selectedMarket.loadFills(
              connection,
              10000
            )
            set((state) => {
              state.selectedMarket.fills = loadedFills
            })
          } catch (err) {
            console.log('Error fetching fills:', err)
          }
        },
        async loadReferralData() {
          return
          const set = get().set
          const mangoAccount = get().selectedMangoAccount.current
          const pk = mangoAccount?.publicKey.toString()
          if (!pk) {
            return
          }

          const getData = async (type: 'history' | 'total') => {
            const res = await fetch(
              `https://mango-transaction-log.herokuapp.ca/v3/stats/referral-fees-${type}?referrer-account=${pk}`
            )
            const data =
              type === 'history' ? await res.json() : await res.text()
            return data
          }

          const data = await getData('history')
          const totalBalance = await getData('total')

          set((state) => {
            state.referrals.total = parseFloat(totalBalance)
            state.referrals.history = data
          })
        },
        async fetchMangoGroupCache() {
          const set = get().set
          const mangoGroup = get().selectedMangoGroup.current
          const connection = get().connection.current
          if (mangoGroup) {
            try {
              const mangoCache = await mangoGroup.loadCache(connection)

              set((state) => {
                state.selectedMangoGroup.cache = mangoCache
              })
            } catch (e) {
              console.warn('Error fetching mango group cache:', e)
            }
          }
        },
        updateConnection(endpointUrl) {
          const set = get().set

          const newConnection = new Connection(endpointUrl, 'processed')

          const newClient = initMangoClient(newConnection)

          set((state) => {
            state.connection.endpoint = endpointUrl
            state.connection.current = newConnection
            state.connection.client = newClient
          })
        },
        async createAlert(req: AlertRequest) {
          return
          const set = get().set
          const alert = {
            acc: new PublicKey(req.mangoAccountPk),
            alertProvider: req.alertProvider,
            health: req.health,
            open: true,
            timestamp: Date.now(),
          }

          set((state) => {
            state.alerts.submitting = true
            state.alerts.error = ''
            state.alerts.success = ''
          })

          const mangoAccount = get().selectedMangoAccount.current
          const mangoGroup = get().selectedMangoGroup.current
          const mangoCache = get().selectedMangoGroup.cache
          if (!mangoGroup || !mangoAccount || !mangoCache) return
          // @ts-ignore
          const currentAccHealth = await mangoAccount?.getHealthRatio(
            // @ts-ignore
            mangoGroup,
            mangoCache,
            'Maint'
          )
          // @ts-ignore

          if (currentAccHealth && currentAccHealth.toNumber() <= req.health) {
            set((state) => {
              state.alerts.submitting = false
              state.alerts.error = `Current account health is already below ${req.health}%`
            })
            return false
          }

          const fetchUrl = `https://mango-alerts-v3.herokuapp.ca/alerts`
          const headers = { 'Content-Type': 'application/json' }

          const response = await fetch(fetchUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(req),
          })

          if (response.ok) {
            const alerts = get().alerts.activeAlerts

            set((state) => {
              state.alerts.activeAlerts = [alert as Alert].concat(alerts)
              state.alerts.submitting = false
              state.alerts.success = 'Alert saved'
            })
            notify({
              title: 'Alert saved',
              type: 'success',
            })
            return true
          } else {
            set((state) => {
              state.alerts.error = 'Something went wrong'
              state.alerts.submitting = false
            })
            notify({
              title: 'Something went wrong',
              type: 'error',
            })
            return false
          }
        },
        async deleteAlert(id: string) {
          return
          const set = get().set

          set((state) => {
            state.alerts.submitting = true
            state.alerts.error = ''
            state.alerts.success = ''
          })

          const fetchUrl = `https://mango-alerts-v3.herokuapp.ca/delete-alert`
          const headers = { 'Content-Type': 'application/json' }

          const response = await fetch(fetchUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ id }),
          })

          if (response.ok) {
            const alerts = get().alerts.activeAlerts
            set((state) => {
              state.alerts.activeAlerts = alerts.filter(
                (alert) => alert._id !== id
              )
              state.alerts.submitting = false
              state.alerts.success = 'Alert deleted'
            })
            notify({
              title: 'Alert deleted',
              type: 'success',
            })
          } else {
            set((state) => {
              state.alerts.error = 'Something went wrong'
              state.alerts.submitting = false
            })
            notify({
              title: 'Something went wrong',
              type: 'error',
            })
          }
        },
        async loadAlerts(mangoAccountPk: PublicKey) {
          return
          const set = get().set

          set((state) => {
            state.alerts.error = ''
            state.alerts.loading = true
          })

          const headers = { 'Content-Type': 'application/json' }
          const response = await fetch(
            `https://mango-alerts-v3.herokuapp.ca/alerts/${mangoAccountPk}`,
            {
              method: 'GET',
              headers: headers,
            }
          )

          if (response.ok) {
            const parsedResponse = await response.json()
            // sort active by latest creation time first
            const activeAlerts = parsedResponse.alerts
              .filter((alert) => alert.open)
              .sort((a, b) => {
                return b.timestamp - a.timestamp
              })

            // sort triggered by latest trigger time first
            const triggeredAlerts = parsedResponse.alerts
              .filter((alert) => !alert.open)
              .sort((a, b) => {
                return b.triggeredTimestamp - a.triggeredTimestamp
              })

            set((state) => {
              state.alerts.activeAlerts = activeAlerts
              state.alerts.triggeredAlerts = triggeredAlerts
              state.alerts.loading = false
            })
          } else {
            set((state) => {
              state.alerts.error = 'Error loading alerts'
              state.alerts.loading = false
            })
          }
        },
        async fetchMarketsInfo() {
          const set = get().set
          const groupConfig = get().selectedMangoGroup.config
          const mangoGroup = get().selectedMangoGroup.current

          try {
            const data = await fetch(
              `https://all-market-stats-api.onrender.com/markets/`
            )

            if (data?.status === 200) {
              const parsedMarketsInfo = (await data.json()).filter((market) => {
                const marketKind = market.name.includes('PERP')
                  ? 'perp'
                  : 'spot'

                const marketConfig = getMarketByBaseSymbolAndKind(
                  groupConfig,
                  market.baseSymbol,
                  marketKind
                )
                if (!marketConfig || !marketConfig.publicKey) return false

                const marketMode: MarketMode =
                  mangoGroup?.tokens[marketConfig.marketIndex][
                    marketKind + 'MarketMode'
                  ]
                const isInactive =
                  marketMode == MarketMode.ForceCloseOnly ||
                  marketMode == MarketMode.Inactive

                return !isInactive
              })

              set((state) => {
                state.marketsInfo = parsedMarketsInfo
              })
            }
          } catch (e) {
            console.log('ERORR: Unable to load all market info')
          }
        },
        async fetchCoingeckoPrices() {
          const set = get().set
          set((state) => {
            state.coingeckoPrices.loading = true
          })
          try {
            const promises: any = []
            for (const asset of coingeckoIds) {
              promises.push(
                fetch(
                  `https://api.coingecko.com/api/v3/coins/${asset.id}/market_chart?vs_currency=usd&days=1`
                ).then((res) => res.json())
              )
            }

            const data = await Promise.all(promises)
            for (let i = 0; i < data.length; i++) {
              data[i].symbol = coingeckoIds[i].symbol
            }
            set((state) => {
              state.coingeckoPrices.data = data
              state.coingeckoPrices.loading = false
            })
          } catch (e) {
            console.log('ERORR: Unable to load Coingecko prices')
            set((state) => {
              state.coingeckoPrices.loading = false
            })
          }
        },
        async fetchProfileDetails(walletPk: string) {
          return
          const set = get().set
          set((state) => {
            state.profile.loadDetails = true
          })
          try {
            const response = await fetch(
              `https://mango-transaction-log.herokuapp.ca/v3/user-data/profile-details?wallet-pk=${walletPk}`
            )
            const data = await response.json()
            set((state) => {
              state.profile.details = data
              state.profile.loadDetails = false
            })
          } catch (e) {
            // notify({ type: 'error', title: t('profile:profile-fetch-fail') })
            console.log(e)
            set((state) => {
              state.profile.loadDetails = false
            })
          }
        },
        async fetchProfileFollowing(pk: string) {
          return
          const set = get().set
          if (!pk) return
          set((state) => {
            state.profile.loadProfileFollowing = true
          })
          try {
            const followingRes = await fetch(
              `https://mango-transaction-log.herokuapp.ca/v3/user-data/following?wallet-pk=${pk}`
            )
            const parsedResponse = await followingRes.json()
            if (Array.isArray(parsedResponse)) {
              set((state) => {
                state.profile.following = parsedResponse
              })
            } else {
              set((state) => {
                state.profile.following = []
              })
            }
            set((state) => {
              state.profile.loadProfileFollowing = false
            })
          } catch {
            notify({
              type: 'error',
              title: 'Unable to load following',
            })
            set((state) => {
              state.profile.loadProfileFollowing = false
            })
          }
        },
        async followAccount(
          mangoAccountPk: string,
          publicKey: PublicKey,
          signMessage: (x) => Uint8Array
        ) {
          return
          const actions = get().actions
          try {
            if (!publicKey) throw new Error('Wallet not connected!')
            if (!signMessage)
              throw new Error('Wallet does not support message signing!')

            const messageString = JSON.stringify({
              mango_account: mangoAccountPk,
              action: 'insert',
            })
            const message = new TextEncoder().encode(messageString)
            const signature = await signMessage(message)

            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                wallet_pk: publicKey.toString(),
                message: messageString,
                signature: bs58.encode(signature),
              }),
            }
            const response = await fetch(
              'https://mango-transaction-log.herokuapp.ca/v3/user-data/following',
              requestOptions
            )
            if (response.status === 200) {
              await actions.fetchProfileFollowing(publicKey.toString())
              notify({ type: 'success', title: 'Account followed' })
            }
          } catch (error: any) {
            notify({ type: 'error', title: 'Failed to follow account' })
          }
        },
        async unfollowAccount(
          mangoAccountPk: string,
          publicKey: PublicKey,
          signMessage: (x) => Uint8Array
        ) {
          const actions = get().actions
          try {
            if (!publicKey) throw new Error('Wallet not connected!')
            if (!signMessage)
              throw new Error('Wallet does not support message signing!')

            const messageString = JSON.stringify({
              mango_account: mangoAccountPk,
              action: 'delete',
            })
            const message = new TextEncoder().encode(messageString)
            const signature = await signMessage(message)

            const requestOptions = {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                wallet_pk: publicKey.toString(),
                message: messageString,
                signature: bs58.encode(signature),
              }),
            }
            const response = await fetch(
              'https://mango-transaction-log.herokuapp.ca/v3/user-data/following',
              requestOptions
            )
            if (response.status === 200) {
              await actions.fetchProfileFollowing(publicKey.toString())
              notify({ type: 'success', title: 'Account unfollowed' })
            }
          } catch (error: any) {
            notify({ type: 'error', title: 'Failed to unfollow account' })
          }
        },
      },
    }
  })
)

export default useMangoStore
