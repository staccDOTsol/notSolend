'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splToken = require('@solana/spl-token');
var web3_js = require('@solana/web3.js');
var serum = require('@project-serum/serum');
var stableswapSdk = require('@saberhq/stableswap-sdk');
var JSBI = require('jsbi');
var anchor = require('@project-serum/anchor');
var pubkey = require('@project-serum/anchor/dist/cjs/utils/pubkey');
var BN = require('bn.js');
var bufferLayout = require('@solana/buffer-layout');
var math = require('@jup-ag/math');
var Decimal = require('decimal.js');
var fetch = require('cross-fetch');
var optimist = require('@mercurial-finance/optimist');
var cremaSdk = require('@jup-ag/crema-sdk');
var lifinitySdk = require('@jup-ag/lifinity-sdk');
var whirlpoolSdk = require('@jup-ag/whirlpool-sdk');
var cykuraSdk = require('@jup-ag/cykura-sdk');
var cykuraSdkCore = require('@jup-ag/cykura-sdk-core');
var bytes = require('@project-serum/anchor/dist/cjs/utils/bytes');
require('promise-retry');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return n;
}

var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);
var anchor__namespace = /*#__PURE__*/_interopNamespace(anchor);
var BN__default = /*#__PURE__*/_interopDefaultLegacy(BN);
var Decimal__default = /*#__PURE__*/_interopDefaultLegacy(Decimal);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);

var addDecimalsJson = [
	{
		wrapper: "2B5Qedoo95Pjpv9xVPw82bbmcGDGCNHroKpzQE2CNHRZ",
		underlying: "CASHVDm2wsJXfhj6VWxb7GiMdoLc17Du7paH4bNr5woT",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "3YCGgStAV9H7TdPYdBnRP8yoH4Zqdmyt7xo6KB4Wa8xt",
		mint: "C9xqJe3gMTUDKidZsZ6jJ7tL9zSLimDUKVpgUbLZnNbi",
		decimals: 9
	},
	{
		wrapper: "2ffwMLE4dxSv59eYXhfhfuS81kz6gzf6DZjdBxRHZz9A",
		underlying: "AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "H5tnZcfHCzHueNnfd6foeBBUUW4g7qXKt6rKzT7wg6oP",
		mint: "FTT9rBBrYwcHam4qLvkzzzhrsihYMbZ3k6wJbdoahxAt",
		decimals: 9
	},
	{
		wrapper: "3A85wiQg2REhBVxVS1CjDaS333TBNM2g37BbdNGSMheg",
		underlying: "CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5",
		underlyingDecimals: 8,
		wrapperUnderlyingTokens: "764FaQrrREvNTpaH2yXyrPZgVBaXA7AXM8vyCaevXitD",
		mint: "BtX7AfzEJLnU8KQR1AgHrhGH5s2AHUTbfjhUQP8BhPvi",
		decimals: 10
	},
	{
		wrapper: "7hWjnVC6FNkmmgjq88LEnRycrKvxVB1MsJ6FQcrvxe4n",
		underlying: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "B22gDMgN2tNWmvyzhb5tamJKanWcUUUw2zN3h3qjgQg8",
		mint: "9999j2A8sXUtHtDoQdk528oVzhaKBsXyRGZ67FKGoi7H",
		decimals: 9
	},
	{
		wrapper: "8zooyPZrq2mth917VrHLtNTk6GvAhc2KgdB4DGBXYyke",
		underlying: "AUrMpCDYYcPuHhyNX8gEEqbmDPFUpBpHrNW3vPeCFn5Z",
		underlyingDecimals: 9,
		wrapperUnderlyingTokens: "7ZZyhVde6ZmnVMuFnrg3mRPHhvfBixLdEo7RnwxTtpF7",
		mint: "EY3s4nXTzHDiiysmjvj7zWP6yAX3n4xHmXkJWD1w1tGP",
		decimals: 15
	},
	{
		wrapper: "93qsLbASEG8DmtSB2MEVaa25KvEm2afh5rzbaAJHLi5A",
		underlying: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
		underlyingDecimals: 8,
		wrapperUnderlyingTokens: "4fUL9yLbFZEuG32SaCjWqJXwDTBFNnipteBWxMvvFoC8",
		mint: "KNVfdSJyq1pRQk9AKKv1g5uyGuk6wpm4WG16Bjuwdma",
		decimals: 9
	},
	{
		wrapper: "ACvLVgR3UKdDB3b1QapsbJsPXaUrBPdJGDfiFnMYMXoz",
		underlying: "F6v4wfAdJB8D8p77bMXZgYt8TDKsYxLYxH5AFhUkYx9W",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "AvqMJWHsZscPWTAUcj8dZi2ch6XQEHMpiCMprfFovaU",
		mint: "LUNGEjUXyP48nrC1GYY5o4eTAkwm4RdX8BxFUxWJBLB",
		decimals: 9
	},
	{
		wrapper: "AnKLLfpMcceM6YXtJ9nGxYekVXqfWy8WNsMZXoQTCVQk",
		underlying: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "77XHXCWYQ76E9Q3uCuz1geTaxsqJZf9RfX5ZY7yyLDYt",
		mint: "JEFFSQ3s8T3wKsvp4tnRAsUBW7Cqgnf8ukBZC4C8XBm1",
		decimals: 9
	},
	{
		wrapper: "CGxMr5UrTjApBjU656N9NBAsGby4fWs1KgVtueQ8WKt6",
		underlying: "AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "7dVPR6jx3hKyNfuHPo3WtWdUpH4eh4Up4rfFhLHZqwy3",
		mint: "FTT8cGNp3rfTC6c44uPTuEFLqmsVDhjd2BhH65v2uppr",
		decimals: 8
	},
	{
		wrapper: "D231Uoh24bXtUtWN51ZbFAFSBmGT3zuuEAHZNuCmtRjN",
		underlying: "CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5",
		underlyingDecimals: 8,
		wrapperUnderlyingTokens: "C39Wq6X98TLcrnYCMkcHQhwUurkQMUdibUCpf2fVBDsm",
		mint: "FACTQhZBfRzC7A76antnpAoZtiwYmUfdAN8wz7e8rxC5",
		decimals: 9
	},
	{
		wrapper: "EhQqUmkUXXnxmV7yA6PDrQWvLgSd9HkrwdDKk1B5m6Tc",
		underlying: "CbNYA9n3927uXUukee2Hf4tm3xxkffJPPZvGazc2EAH1",
		underlyingDecimals: 8,
		wrapperUnderlyingTokens: "8YC5eCS99umbK9K9LnHnTMMjnr7EWg1gam5maNB6uf9d",
		mint: "EU9aLffrTckFCs16da6CppHy63fAxMPF9ih1erQTuuRt",
		decimals: 9
	},
	{
		wrapper: "EwWpia5t9Twiwdi8ghK8e8JHaf6ShNU9jmoYpvdZhBwC",
		underlying: "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "9YB1zRL4ETuQFG8ZK1yD4GHBVDmH81EzwuSj75zdnKhK",
		mint: "UST8SCn7jrqsq51odVLqcmvnC658HkqrKrPL3w2hHQ7",
		decimals: 8
	},
	{
		wrapper: "F9TsAsh5RirU3LqyTJECLQEGXnF4RQT7ckvexCP1KNTu",
		underlying: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "BSTjdztBrsptuxfz9JHS31Wc9CknpLeL1wqZjeVs1Ths",
		mint: "AEUT5uFm1D575FVCoQd5Yq891FJEqkncZUbBFoFcAhTV",
		decimals: 9
	},
	{
		wrapper: "FCgoT8RpsopdM5QT6AB98NUfUnDnu7y865MFpRx93JrS",
		underlying: "EzfgjvkSwthhgHaceR3LnKXUoRkP6NUhfghdaHAj1tUv",
		underlyingDecimals: 8,
		wrapperUnderlyingTokens: "5yugfArBAUZJJBUCRWPuiLyi6CWp1f67H9xgg3hcgSkx",
		mint: "FTT9GrHBVHvDeUTgLU8FxVJouGqg9uiWGmmjETdm32Sx",
		decimals: 9
	},
	{
		wrapper: "FDGtFWVhEb1zxnaW2FzogeGDxLoAV7Cu9XdNYPEVwqt",
		underlying: "8wv2KAykQstNAj2oW6AHANGBiFKVFhvMiyyzzjhkmGvE",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "4R6PmC8BJcPDBsEMGpXpLCnFFkUZhEgZy6pMNtc2LqA4",
		mint: "KUANeD8EQvwpT1W7QZDtDqctLEh2FfSTy5pThE9CogT",
		decimals: 9
	},
	{
		wrapper: "FPuYMuodknZuQKHA8Wp4PBbp52Qu8nK2oAuwedp2WfM3",
		underlying: "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "GxpyQZi5VkZDSq5TUycMau11sCkQkVCa8xYhBgiPMsyK",
		mint: "UST98bfV6EASdTFQrRwCBczpehdMFwYCUdLT5tEbhpW",
		decimals: 9
	},
	{
		wrapper: "Ffxi5TSpFV9NeV5KyNDCC7fWnFoFd2bDcL1eViSAE2M2",
		underlying: "CASHVDm2wsJXfhj6VWxb7GiMdoLc17Du7paH4bNr5woT",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "5s2et753hMXV945U3p5uz6RQqMkZGCPEjKjNPdUcCLLF",
		mint: "CASHedBw9NfhsLBXq1WNVfueVznx255j8LLTScto3S6s",
		decimals: 8
	},
	{
		wrapper: "G4gRGymKo7MGzGZup12JS39YVCvy8YMM6KY9AmcKi5iw",
		underlying: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "AQhP39mE4o6BYNwnwYqnz7ZobkPBSLpCg8WvEESq1viZ",
		mint: "88881Hu2jGMfCs9tMu5Rr7Ah7WBNBuXqde4nR5ZmKYYy",
		decimals: 8
	},
	{
		wrapper: "GiLSv94Wwyd6suH57Fu6HjEKsMxhNGfEwKn9vT22me1p",
		underlying: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "3cjAWoyDcco8UVCN17keNUNHoyz37ctgDa7G6zkeb81Y",
		mint: "T8KdT8hDzNhbGx5sjpEUxepnbDB1TZoCa7vtC5JjsMw",
		decimals: 8
	},
	{
		wrapper: "GpkFF2nPfjUcsavgDGscxaUEQ2hYJ563AXXtU8ohiZ7c",
		underlying: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "6hYDFhZ5ddfzoqaAbzRHm8mzG2MQzYQV9295sQHsvNBV",
		mint: "SBTCB6pWqeDo6zGi9WVRMLCsKsN6JiR1RMUqvLtgSRv",
		decimals: 8
	},
	{
		wrapper: "fvSvtHNFuDHrAN82YEyBApRs3U6vUGCLzKGMuPmCaF8",
		underlying: "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
		underlyingDecimals: 6,
		wrapperUnderlyingTokens: "4JWyJ4ZYsQ8uiYue2tTEqcHcFXrDuaQ1rsyjNFfrZm65",
		mint: "SL819j8K9FuFPL84UepVcFkEZqDUUvVzwDmJjCHySYj",
		decimals: 8
	}
];

const IDL = {
  version: '0.1.0',
  name: 'jupiter',
  instructions: [{
    name: 'mercurialExchange',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'swapState',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'poolAuthority',
      isMut: false,
      isSigner: false
    }, {
      name: 'userTransferAuthority',
      isMut: false,
      isSigner: true
    }, {
      name: 'sourceTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'destinationTokenAccount',
      isMut: true,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'saberExchange',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'swap',
      isMut: false,
      isSigner: false
    }, {
      name: 'swapAuthority',
      isMut: false,
      isSigner: false
    }, {
      name: 'userAuthority',
      isMut: false,
      isSigner: false
    }, {
      name: 'clock',
      isMut: false,
      isSigner: false
    }, {
      name: 'inputUserAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'inputTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'outputUserAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'outputTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'feesTokenAccount',
      isMut: true,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'saberSwap',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'swap',
      isMut: false,
      isSigner: false
    }, {
      name: 'swapAuthority',
      isMut: false,
      isSigner: false
    }, {
      name: 'userAuthority',
      isMut: false,
      isSigner: false
    }, {
      name: 'inputUserAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'inputTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'outputUserAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'outputTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'feesTokenAccount',
      isMut: true,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'saberAddDecimalsDeposit',
    accounts: [{
      name: 'addDecimalsProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'wrapper',
      isMut: false,
      isSigner: false
    }, {
      name: 'wrapperMint',
      isMut: true,
      isSigner: false
    }, {
      name: 'wrapperUnderlyingTokens',
      isMut: true,
      isSigner: false
    }, {
      name: 'owner',
      isMut: false,
      isSigner: true
    }, {
      name: 'userUnderlyingTokens',
      isMut: true,
      isSigner: false
    }, {
      name: 'userWrappedTokens',
      isMut: true,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'saberAddDecimalsWithdraw',
    accounts: [{
      name: 'addDecimalsProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'wrapper',
      isMut: false,
      isSigner: false
    }, {
      name: 'wrapperMint',
      isMut: true,
      isSigner: false
    }, {
      name: 'wrapperUnderlyingTokens',
      isMut: true,
      isSigner: false
    }, {
      name: 'owner',
      isMut: false,
      isSigner: true
    }, {
      name: 'userUnderlyingTokens',
      isMut: true,
      isSigner: false
    }, {
      name: 'userWrappedTokens',
      isMut: true,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'senchaExchange',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'swap',
      isMut: true,
      isSigner: false
    }, {
      name: 'userAuthority',
      isMut: false,
      isSigner: false
    }, {
      name: 'inputUserAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'inputTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'inputFeesAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'outputUserAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'outputTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'outputFeesAccount',
      isMut: true,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'serumSwap',
    accounts: [{
      name: 'market',
      accounts: [{
        name: 'market',
        isMut: true,
        isSigner: false
      }, {
        name: 'openOrders',
        isMut: true,
        isSigner: false
      }, {
        name: 'requestQueue',
        isMut: true,
        isSigner: false
      }, {
        name: 'eventQueue',
        isMut: true,
        isSigner: false
      }, {
        name: 'bids',
        isMut: true,
        isSigner: false
      }, {
        name: 'asks',
        isMut: true,
        isSigner: false
      }, {
        name: 'coinVault',
        isMut: true,
        isSigner: false
      }, {
        name: 'pcVault',
        isMut: true,
        isSigner: false
      }, {
        name: 'vaultSigner',
        isMut: false,
        isSigner: false
      }]
    }, {
      name: 'authority',
      isMut: false,
      isSigner: true
    }, {
      name: 'orderPayerTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'coinWallet',
      isMut: true,
      isSigner: false
    }, {
      name: 'pcWallet',
      isMut: true,
      isSigner: false
    }, {
      name: 'dexProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'rent',
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: 'side',
      type: {
        defined: 'Side'
      }
    }, {
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'tokenSwap',
    accounts: [{
      name: 'tokenSwapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'swap',
      isMut: false,
      isSigner: false
    }, {
      name: 'authority',
      isMut: false,
      isSigner: false
    }, {
      name: 'userTransferAuthority',
      isMut: false,
      isSigner: true
    }, {
      name: 'source',
      isMut: true,
      isSigner: false
    }, {
      name: 'swapSource',
      isMut: true,
      isSigner: false
    }, {
      name: 'swapDestination',
      isMut: true,
      isSigner: false
    }, {
      name: 'destination',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolMint',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolFee',
      isMut: true,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'stepTokenSwap',
    accounts: [{
      name: 'tokenSwapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'swap',
      isMut: false,
      isSigner: false
    }, {
      name: 'authority',
      isMut: false,
      isSigner: false
    }, {
      name: 'userTransferAuthority',
      isMut: false,
      isSigner: true
    }, {
      name: 'source',
      isMut: true,
      isSigner: false
    }, {
      name: 'swapSource',
      isMut: true,
      isSigner: false
    }, {
      name: 'swapDestination',
      isMut: true,
      isSigner: false
    }, {
      name: 'destination',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolMint',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolFee',
      isMut: true,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'cropperTokenSwap',
    accounts: [{
      name: 'tokenSwapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'swap',
      isMut: false,
      isSigner: false
    }, {
      name: 'swapState',
      isMut: false,
      isSigner: false
    }, {
      name: 'authority',
      isMut: false,
      isSigner: false
    }, {
      name: 'userTransferAuthority',
      isMut: false,
      isSigner: true
    }, {
      name: 'source',
      isMut: true,
      isSigner: false
    }, {
      name: 'swapSource',
      isMut: true,
      isSigner: false
    }, {
      name: 'swapDestination',
      isMut: true,
      isSigner: false
    }, {
      name: 'destination',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolMint',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolFee',
      isMut: true,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'raydiumSwap',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'ammId',
      isMut: true,
      isSigner: false
    }, {
      name: 'ammAuthority',
      isMut: false,
      isSigner: false
    }, {
      name: 'ammOpenOrders',
      isMut: true,
      isSigner: false
    }, {
      name: 'ammTargetOrders',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolCoinTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolPcTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumProgramId',
      isMut: false,
      isSigner: false
    }, {
      name: 'serumMarket',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumBids',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumAsks',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumEventQueue',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumCoinVaultAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumPcVaultAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumVaultSigner',
      isMut: false,
      isSigner: false
    }, {
      name: 'userSourceTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'userDestinationTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'userSourceOwner',
      isMut: false,
      isSigner: true
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'raydiumSwapV2',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'ammId',
      isMut: true,
      isSigner: false
    }, {
      name: 'ammAuthority',
      isMut: false,
      isSigner: false
    }, {
      name: 'ammOpenOrders',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolCoinTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolPcTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumProgramId',
      isMut: false,
      isSigner: false
    }, {
      name: 'serumMarket',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumBids',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumAsks',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumEventQueue',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumCoinVaultAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumPcVaultAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'serumVaultSigner',
      isMut: false,
      isSigner: false
    }, {
      name: 'userSourceTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'userDestinationTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'userSourceOwner',
      isMut: false,
      isSigner: true
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'aldrinSwap',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'pool',
      isMut: false,
      isSigner: false
    }, {
      name: 'poolSigner',
      isMut: false,
      isSigner: false
    }, {
      name: 'poolMint',
      isMut: true,
      isSigner: false
    }, {
      name: 'baseTokenVault',
      isMut: true,
      isSigner: false
    }, {
      name: 'quoteTokenVault',
      isMut: true,
      isSigner: false
    }, {
      name: 'feePoolTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'walletAuthority',
      isMut: false,
      isSigner: true
    }, {
      name: 'userBaseTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'userQuoteTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'side',
      type: {
        defined: 'Side'
      }
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'aldrinV2Swap',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'pool',
      isMut: false,
      isSigner: false
    }, {
      name: 'poolSigner',
      isMut: false,
      isSigner: false
    }, {
      name: 'poolMint',
      isMut: true,
      isSigner: false
    }, {
      name: 'baseTokenVault',
      isMut: true,
      isSigner: false
    }, {
      name: 'quoteTokenVault',
      isMut: true,
      isSigner: false
    }, {
      name: 'feePoolTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'walletAuthority',
      isMut: false,
      isSigner: true
    }, {
      name: 'userBaseTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'userQuoteTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'curve',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'side',
      type: {
        defined: 'Side'
      }
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'cremaTokenSwap',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'pool',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolSigner',
      isMut: false,
      isSigner: false
    }, {
      name: 'userSourceTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'userDestinationTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolSourceTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolDestinationTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolTicksAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'walletAuthority',
      isMut: false,
      isSigner: true
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'lifinityTokenSwap',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'authority',
      isMut: false,
      isSigner: false
    }, {
      name: 'amm',
      isMut: false,
      isSigner: false
    }, {
      name: 'userTransferAuthority',
      isMut: false,
      isSigner: true
    }, {
      name: 'sourceInfo',
      isMut: true,
      isSigner: false
    }, {
      name: 'destinationInfo',
      isMut: true,
      isSigner: false
    }, {
      name: 'swapSource',
      isMut: true,
      isSigner: false
    }, {
      name: 'swapDestination',
      isMut: true,
      isSigner: false
    }, {
      name: 'poolMint',
      isMut: true,
      isSigner: false
    }, {
      name: 'feeAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'pythAccount',
      isMut: false,
      isSigner: false
    }, {
      name: 'pythPcAccount',
      isMut: false,
      isSigner: false
    }, {
      name: 'configAccount',
      isMut: true,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'cykuraSwap',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'signer',
      isMut: false,
      isSigner: true
    }, {
      name: 'factoryState',
      isMut: false,
      isSigner: false
    }, {
      name: 'poolState',
      isMut: true,
      isSigner: false
    }, {
      name: 'inputTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'outputTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'inputVault',
      isMut: true,
      isSigner: false
    }, {
      name: 'outputVault',
      isMut: true,
      isSigner: false
    }, {
      name: 'lastObservationState',
      isMut: true,
      isSigner: false
    }, {
      name: 'coreProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'whirlpoolSwap',
    accounts: [{
      name: 'swapProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'tokenAuthority',
      isMut: false,
      isSigner: true
    }, {
      name: 'whirlpool',
      isMut: true,
      isSigner: false
    }, {
      name: 'tokenOwnerAccountA',
      isMut: true,
      isSigner: false
    }, {
      name: 'tokenVaultA',
      isMut: true,
      isSigner: false
    }, {
      name: 'tokenOwnerAccountB',
      isMut: true,
      isSigner: false
    }, {
      name: 'tokenVaultB',
      isMut: true,
      isSigner: false
    }, {
      name: 'tickArray0',
      isMut: true,
      isSigner: false
    }, {
      name: 'tickArray1',
      isMut: true,
      isSigner: false
    }, {
      name: 'tickArray2',
      isMut: true,
      isSigner: false
    }, {
      name: 'oracle',
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: 'inAmount',
      type: {
        option: 'u64'
      }
    }, {
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'aToB',
      type: 'bool'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'riskCheckAndFee',
    accounts: [{
      name: 'tokenLedger',
      isMut: true,
      isSigner: false
    }, {
      name: 'userDestinationTokenAccount',
      isMut: true,
      isSigner: false
    }, {
      name: 'userTransferAuthority',
      isMut: false,
      isSigner: true
    }, {
      name: 'tokenProgram',
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: 'minimumOutAmount',
      type: 'u64'
    }, {
      name: 'platformFeeBps',
      type: 'u8'
    }]
  }, {
    name: 'initializeTokenLedger',
    accounts: [{
      name: 'tokenLedger',
      isMut: true,
      isSigner: true
    }, {
      name: 'payer',
      isMut: true,
      isSigner: true
    }, {
      name: 'systemProgram',
      isMut: false,
      isSigner: false
    }],
    args: []
  }, {
    name: 'setTokenLedger',
    accounts: [{
      name: 'tokenLedger',
      isMut: true,
      isSigner: false
    }, {
      name: 'tokenAccount',
      isMut: false,
      isSigner: false
    }],
    args: []
  }, {
    name: 'createOpenOrders',
    accounts: [{
      name: 'openOrders',
      isMut: true,
      isSigner: false
    }, {
      name: 'payer',
      isMut: true,
      isSigner: true
    }, {
      name: 'dexProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'systemProgram',
      isMut: false,
      isSigner: false
    }, {
      name: 'rent',
      isMut: false,
      isSigner: false
    }, {
      name: 'market',
      isMut: false,
      isSigner: false
    }],
    args: []
  }],
  accounts: [{
    name: 'tokenLedger',
    type: {
      kind: 'struct',
      fields: [{
        name: 'tokenAccount',
        type: 'publicKey'
      }, {
        name: 'amount',
        type: 'u64'
      }]
    }
  }],
  types: [{
    name: 'Swap',
    type: {
      kind: 'struct',
      fields: [{
        name: 'tokens',
        type: 'u64'
      }, {
        name: 'minTokens',
        type: 'u64'
      }, {
        name: 'side',
        type: {
          defined: 'Side'
        }
      }]
    }
  }, {
    name: 'Swap',
    type: {
      kind: 'struct',
      fields: [{
        name: 'tokens',
        type: 'u64'
      }, {
        name: 'minTokens',
        type: 'u64'
      }, {
        name: 'side',
        type: {
          defined: 'Side'
        }
      }]
    }
  }, {
    name: 'Swap',
    type: {
      kind: 'struct',
      fields: [{
        name: 'amountIn',
        type: 'u64'
      }, {
        name: 'minimumAmountOut',
        type: 'u64'
      }]
    }
  }, {
    name: 'Swap',
    type: {
      kind: 'struct',
      fields: [{
        name: 'amount',
        type: 'u64'
      }, {
        name: 'otherAmountThreshold',
        type: 'u64'
      }, {
        name: 'sqrtPriceLimit',
        type: 'u128'
      }, {
        name: 'amountSpecifiedIsInput',
        type: 'bool'
      }, {
        name: 'aToB',
        type: 'bool'
      }]
    }
  }, {
    name: 'SwapInstrution',
    type: {
      kind: 'enum',
      variants: [{
        name: 'Swap',
        fields: [{
          defined: 'Swap'
        }]
      }]
    }
  }, {
    name: 'Side',
    type: {
      kind: 'enum',
      variants: [{
        name: 'Bid'
      }, {
        name: 'Ask'
      }]
    }
  }, {
    name: 'Direction',
    type: {
      kind: 'enum',
      variants: [{
        name: 'LeftToRight'
      }, {
        name: 'RightToLeft'
      }]
    }
  }],
  errors: [{
    code: 6000,
    name: 'SlippageToleranceExceeded',
    msg: 'Slippage tolerance exceeded'
  }, {
    code: 6001,
    name: 'InvalidTokenLedger',
    msg: 'Invalid token ledger'
  }, {
    code: 6002,
    name: 'MissingTokenLedger',
    msg: 'Missing token ledger'
  }, {
    code: 6003,
    name: 'MissingMercurialExchangeTokenAccount',
    msg: 'Missing mercurial exchange token account'
  }, {
    code: 6004,
    name: 'LedgerTokenAccountDoesNotMatch',
    msg: 'Ledger token account does not match'
  }, {
    code: 6005,
    name: 'MissingPlatformFeeAccount',
    msg: 'Missing platform fee account'
  }, {
    code: 6006,
    name: 'InvalidCalculation',
    msg: 'Invalid calculation'
  }]
};

const WRAPPED_SOL_MINT = /*#__PURE__*/new web3_js.PublicKey('So11111111111111111111111111111111111111112');
const MAINNET_SERUM_DEX_PROGRAM = /*#__PURE__*/new web3_js.PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin');
const DEVNET_SERUM_DEX_PROGRAM = /*#__PURE__*/new web3_js.PublicKey('DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY');
const MARKETS_URL = {
  devnet: 'https://api.jup.ag/api/markets/cache/devnet',
  'mainnet-beta': 'https://cache.jup.ag/markets?v=3',
  testnet: 'https://api.jup.ag/api/markets/cache/devnet'
};
const TOKEN_LIST_URL = {
  devnet: 'https://api.jup.ag/api/tokens/devnet',
  testnet: 'https://api.jup.ag/api/markets/devnet',
  'mainnet-beta': 'https://cache.jup.ag/tokens'
};
const LAMPORTS_PER_SIGNATURE = 5000;
const RAYDIUM_AMM_V4_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8');
const ALDRIN_SWAP_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('AMM55ShdkoGRB5jVYPjWziwk8m5MpwyDgsMWHaMSQWH6'); // https://github.com/aldrin-exchange/aldrin-sdk/blob/f93fe3f2d847d79d8ddff507d8d4f62fd803421b/src/v2.json

const ALDRIN_SWAP_V2_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('CURVGoZn8zycx6FXwwevgBTB2gVvdbGTEpvMJDbgs2t4');
const SABER_ADD_DECIMALS_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('DecZY86MU5Gj7kppfUCEmd4LbXXuyZH1yHaP2NTqdiZB');
const CROPPER_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('CTMAxxk34HjKWxQ3QLZK1HpaLXmBveao3ESePXbiyfzh');
const SENCHA_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('SCHAtsf8mbjyjiv4LkhLKutTf6JnZAbdJKFkXQNMFHZ');
const LIFINITY_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('EewxydAPCCVuNEyrVN68PuSYdQ7wKn27V9Gjeoi8dy3S');
const CREMA_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('6MLxLqiXaaSUpkgMnWDTuejNZEz3kE7k2woyHGVFw319');
const JUPITER_WALLET = /*#__PURE__*/new web3_js.PublicKey('BUX7s2ef2htTGb2KKoPHWkmzxPj4nTWMWRgs5CSbQxf9');
const MERCURIAL_SWAP_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('MERLuDFBMmsHnsBPZw2sDQZHvXFMwp8EdjudcU2HKky');
const WHIRLPOOL_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc');
const CYKURA_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('cysPXAjehMpVKUapzbMCCnpFxUFFryEWEaLgnb9NrR8');
const CYKURA_FACTORY_STATE_ADDRESS = /*#__PURE__*/new web3_js.PublicKey('DBsMwKfeoUHhxMi9x6wd2AsT12UwUCssjNbUzu1aKgqj');
/** Tokens which are fundamental pivot in certain protocols */

const SWAP_PROTOCOL_TOKENS = ['StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT', 'DubwWZNWiNGMMeeQHPnMATNj77YZPZSAz2WVR5WjLJqz' // CRP
];
const JUPITER_ERRORS = /*#__PURE__*/Object.freeze({
  TransactionNotConfirmed: {
    code: 7000,
    name: 'TransactionNotConfirmed',
    msg: 'Transaction was not confirmed'
  },
  BalancesNotExtractedProperly: {
    code: 7001,
    name: 'BalancesNotExtractedProperly',
    msg: 'Balances cannot be extracted properly'
  },
  ... /*#__PURE__*/IDL.errors.reduce((accErrors, error) => {
    return { ...accErrors,
      [error.name]: error
    };
  }, {})
});
const IS_DEV = "development" === 'development';

class PublicKeyLayout extends bufferLayout.Layout {
  constructor(property) {
    const layout = bufferLayout.blob(32);
    super(layout.span, property);
    this.layout = void 0;
    this.layout = layout;
  }

  getSpan(b, offset) {
    return this.layout.getSpan(b, offset);
  }

  decode(b, offset) {
    return new web3_js.PublicKey(this.layout.decode(b, offset));
  }

  encode(src, b, offset) {
    return this.layout.encode(src.toBuffer(), b, offset);
  }

}
/**
 * Layout for a public key
 */


const publicKey = property => new PublicKeyLayout(property);

class U64Layout extends bufferLayout.Layout {
  constructor(span = 8, property) {
    const layout = bufferLayout.blob(span);
    super(layout.span, property);
    this.layout = void 0;
    this.layout = layout;
  }

  getSpan(b, offset) {
    return this.layout.getSpan(b, offset);
  }

  decode(b, offset) {
    const bn = new splToken.u64(this.layout.decode(b, offset), 10, 'le');
    return bn;
  }

  encode(src, b, offset) {
    return this.layout.encode(src.toArrayLike(Buffer, 'le', this.layout.span), b, offset);
  }

}
/**
 * Layout for a 64bit unsigned value
 */


const uint64 = property => new U64Layout(8, property);
const uint128 = property => new U64Layout(16, property);

const CropperTokenSwapLayout = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8('version'), /*#__PURE__*/bufferLayout.u8('isInitialized'), /*#__PURE__*/bufferLayout.u8('nonce'), /*#__PURE__*/publicKey('ammId'), /*#__PURE__*/publicKey('serumProgramId'), /*#__PURE__*/publicKey('serumMarket'), /*#__PURE__*/publicKey('tokenProgramId'), /*#__PURE__*/publicKey('tokenAAccount'), /*#__PURE__*/publicKey('tokenBAccount'), /*#__PURE__*/publicKey('poolMint'), /*#__PURE__*/publicKey('mintA'), /*#__PURE__*/publicKey('mintB')]);
const CropperStateLayout = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8('isInitialized'), /*#__PURE__*/publicKey('stateOwner'), /*#__PURE__*/publicKey('feeOwner'), /*#__PURE__*/uint64('initialSupply'), /*#__PURE__*/uint64('returnFeeNumerator'), /*#__PURE__*/uint64('fixedFeeNumerator'), /*#__PURE__*/uint64('feeDenominator'), /*#__PURE__*/bufferLayout.u8('curveType'), /*#__PURE__*/bufferLayout.blob(32, 'curveParameters')]); // This seems to be hardcoded.

const CROPPER_STATE_ADDRESS = /*#__PURE__*/new web3_js.PublicKey('3hsU1VgsBgBgz5jWiqdw9RfGU6TpWdCmdah1oi4kF3Tq');
const accountInfoToCropperPoolState = (address, accountInfo) => {
  const programId = accountInfo.owner;
  const decoded = CropperTokenSwapLayout.decode(accountInfo.data);
  const [authority] = pubkey.findProgramAddressSync([address.toBuffer()], programId);
  return {
    programId,
    authority,
    version: decoded.version,
    isInitialized: Boolean(decoded.isInitialized),
    nonce: decoded.nonce,
    ammId: decoded.ammId,
    serumProgramId: decoded.serumProgramId,
    tokenProgramId: decoded.tokenProgramId,
    tokenAAccount: decoded.tokenAAccount,
    tokenBAccount: decoded.tokenBAccount,
    serumMarket: decoded.serumMarket,
    poolMint: decoded.poolMint,
    mintA: decoded.mintA,
    mintB: decoded.mintB
  };
};
const stateAccountInfoToCropperState = accountInfo => {
  const decoded = CropperStateLayout.decode(accountInfo.data);
  return {
    isInitialized: Boolean(decoded.isInitialized),
    stateOwner: decoded.stateOwner,
    feeOwner: decoded.feeOwner,
    initialSupply: decoded.initialSupply,
    returnFeeNumerator: decoded.returnFeeNumerator.toNumber(),
    fixedFeeNumerator: decoded.fixedFeeNumerator.toNumber(),
    feeDenominator: decoded.feeDenominator.toNumber(),
    curveType: decoded.curveType,
    curveParameters: decoded.curveParameters
  };
};

const Side = {
  Bid: {
    bid: {}
  },
  Ask: {
    ask: {}
  }
};
const JUPITER_PROGRAM_ID_PRODUCTION = /*#__PURE__*/new web3_js.PublicKey('JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo');
const JUPITER_PROGRAM_ID = JUPITER_PROGRAM_ID_PRODUCTION; // JUPITER_PROGRAM_ID_PRODUCTION;

const JUPITER_PROGRAM = /*#__PURE__*/new anchor.Program(IDL, JUPITER_PROGRAM_ID, {});
const PRODUCTION_TOKEN_LEDGERS = [/*#__PURE__*/new web3_js.PublicKey('7h51TX1pNvSaNyjg4koKroJqoe7atKB7xWUfir7ZqX81'), /*#__PURE__*/new web3_js.PublicKey('HgeLVK1nJ1kNdWSUNCKj6DfGqfhwgx67dfGPRcBSdE2d'), /*#__PURE__*/new web3_js.PublicKey('8ME9HwwchNknEVrcCSKYAQCa1YAYi3LZrEXJrY4ZNkkg'), /*#__PURE__*/new web3_js.PublicKey('Edg9J3CMky9AVJq2WrSar2JR38jFkg4S7vAW7Xsix8oV'), /*#__PURE__*/new web3_js.PublicKey('B5mW68TkDewnKvWNc2trkmmdSRxcCjZz3Yd9BWxQTSRU'), /*#__PURE__*/new web3_js.PublicKey('7E3TDrnS2zEp8uVri8EtPU8MyQ3qjLTc6cCGJAnAM48p')];
const TOKEN_LEDGER = PRODUCTION_TOKEN_LEDGERS[/*#__PURE__*/Math.floor( /*#__PURE__*/Math.random() * PRODUCTION_TOKEN_LEDGERS.length)];

function stableSwapNPoolIntoMercurialExchange(swayLayout, sourceTokenAccount, destinationTokenAccount, userTransferAuthority) {
  return {
    swapProgram: MERCURIAL_SWAP_PROGRAM_ID,
    swapState: swayLayout.ammId,
    tokenProgram: splToken.TOKEN_PROGRAM_ID,
    poolAuthority: swayLayout.authority,
    userTransferAuthority: userTransferAuthority,
    sourceTokenAccount,
    destinationTokenAccount
  };
}

function raydiumAmmToRaydiumSwap(raydiumAmm, userSourceTokenAccount, userDestinationTokenAccount, userTransferAuthority) {
  const [ammAuthority] = pubkey.findProgramAddressSync([new Uint8Array(Buffer.from('amm authority'.replace('\u00A0', ' '), 'utf-8'))], RAYDIUM_AMM_V4_PROGRAM_ID);

  if (!raydiumAmm.serumMarketKeys) {
    throw new Error('RaydiumAmm is missing serumMarketKeys');
  }

  return {
    swapProgram: RAYDIUM_AMM_V4_PROGRAM_ID,
    tokenProgram: splToken.TOKEN_PROGRAM_ID,
    ammId: raydiumAmm.ammId,
    ammAuthority,
    ammOpenOrders: raydiumAmm.ammOpenOrders,
    poolCoinTokenAccount: raydiumAmm.poolCoinTokenAccount,
    poolPcTokenAccount: raydiumAmm.poolPcTokenAccount,
    serumProgramId: raydiumAmm.serumProgramId,
    serumMarket: raydiumAmm.serumMarket,
    serumBids: raydiumAmm.serumMarketKeys.serumBids,
    serumAsks: raydiumAmm.serumMarketKeys.serumAsks,
    serumEventQueue: raydiumAmm.serumMarketKeys.serumEventQueue,
    serumCoinVaultAccount: raydiumAmm.serumMarketKeys.serumCoinVaultAccount,
    serumPcVaultAccount: raydiumAmm.serumMarketKeys.serumPcVaultAccount,
    serumVaultSigner: raydiumAmm.serumMarketKeys.serumVaultSigner,
    userSourceTokenAccount: userSourceTokenAccount,
    userDestinationTokenAccount: userDestinationTokenAccount,
    userSourceOwner: userTransferAuthority
  };
}

function marketIntoSerumSwap(market, openOrdersAddress, orderPayerTokenAccountAddress, coinWallet, pcWallet, userTransferAuthority) {
  const vaultSigner = pubkey.createProgramAddressSync([market.address.toBuffer(), market.decoded.vaultSignerNonce.toArrayLike(Buffer, 'le', 8)], market.programId);
  return {
    market: {
      market: market.address,
      openOrders: openOrdersAddress,
      requestQueue: market.decoded.requestQueue,
      eventQueue: market.decoded.eventQueue,
      bids: market.bidsAddress,
      asks: market.asksAddress,
      coinVault: market.decoded.baseVault,
      pcVault: market.decoded.quoteVault,
      vaultSigner
    },
    authority: userTransferAuthority,
    orderPayerTokenAccount: orderPayerTokenAccountAddress,
    coinWallet,
    pcWallet,
    // Programs.
    dexProgram: market.programId,
    tokenProgram: splToken.TOKEN_PROGRAM_ID,
    // Sysvars.
    rent: web3_js.SYSVAR_RENT_PUBKEY
  };
}

function createMercurialExchangeInstruction({
  swapLayout,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps;

  const remainingAccounts = [];

  for (const swapTokenAccount of swapLayout.tokenAccounts) {
    remainingAccounts.push({
      pubkey: swapTokenAccount,
      isSigner: false,
      isWritable: true
    });
  }

  remainingAccounts.push(...prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount));
  return JUPITER_PROGRAM.instruction.mercurialExchange(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps !== void 0 ? _platformFee$feeBps : 0, {
    accounts: stableSwapNPoolIntoMercurialExchange(swapLayout, userSourceTokenAccount, userDestinationTokenAccount, userTransferAuthority),
    remainingAccounts
  });
}
function createSerumSwapInstruction({
  market,
  sourceMint,
  openOrdersAddress,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee,
  referrer
}) {
  var _platformFee$feeBps2;

  const {
    side,
    coinWallet,
    pcWallet
  } = sourceMint.equals(market.baseMintAddress) ? {
    side: Side.Ask,
    coinWallet: userSourceTokenAccount,
    pcWallet: userDestinationTokenAccount
  } : {
    side: Side.Bid,
    coinWallet: userDestinationTokenAccount,
    pcWallet: userSourceTokenAccount
  };
  let remainingAccounts = prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount);

  if (referrer) {
    remainingAccounts.push({
      pubkey: referrer,
      isSigner: false,
      isWritable: true
    });
  }

  return JUPITER_PROGRAM.instruction.serumSwap(side, inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps2 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps2 !== void 0 ? _platformFee$feeBps2 : 0, {
    accounts: marketIntoSerumSwap(market, openOrdersAddress, userSourceTokenAccount, coinWallet, pcWallet, userTransferAuthority),
    remainingAccounts
  });
}
function createTokenSwapInstruction({
  tokenSwapState,
  sourceMint,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee,
  isStep
}) {
  var _platformFee$feeBps3;

  const [swapSource, swapDestination] = sourceMint.equals(tokenSwapState.mintA) ? [tokenSwapState.tokenAccountA, tokenSwapState.tokenAccountB] : [tokenSwapState.tokenAccountB, tokenSwapState.tokenAccountA];
  return (isStep ? JUPITER_PROGRAM.instruction.stepTokenSwap : JUPITER_PROGRAM.instruction.tokenSwap)(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps3 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps3 !== void 0 ? _platformFee$feeBps3 : 0, {
    accounts: {
      tokenSwapProgram: tokenSwapState.programId,
      tokenProgram: splToken.TOKEN_PROGRAM_ID,
      swap: tokenSwapState.address,
      authority: tokenSwapState.authority,
      userTransferAuthority: userTransferAuthority,
      source: userSourceTokenAccount,
      swapSource,
      swapDestination,
      destination: userDestinationTokenAccount,
      poolMint: tokenSwapState.poolToken,
      poolFee: tokenSwapState.feeAccount
    },
    remainingAccounts: prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount)
  });
}
function createSenchaSwapInstruction({
  poolState,
  sourceMint,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps4;

  const [swapSource, swapDestination] = sourceMint.equals(poolState.token0Mint) ? [poolState.token0Reserves, poolState.token1Reserves] : [poolState.token1Reserves, poolState.token0Reserves];
  const [feesSource, feesDestination] = sourceMint.equals(poolState.token0Mint) ? [poolState.token0Fees, poolState.token1Fees] : [poolState.token1Fees, poolState.token0Fees];
  return JUPITER_PROGRAM.instruction.senchaExchange(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps4 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps4 !== void 0 ? _platformFee$feeBps4 : 0, {
    accounts: {
      swapProgram: poolState.programId,
      tokenProgram: splToken.TOKEN_PROGRAM_ID,
      swap: poolState.ammId,
      userAuthority: userTransferAuthority,
      inputUserAccount: userSourceTokenAccount,
      inputTokenAccount: swapSource,
      inputFeesAccount: feesSource,
      outputUserAccount: userDestinationTokenAccount,
      outputTokenAccount: swapDestination,
      outputFeesAccount: feesDestination
    },
    remainingAccounts: prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount)
  });
}
function createCropperSwapInstruction({
  poolState,
  feeAccount,
  sourceMint,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps5;

  const [swapSource, swapDestination] = sourceMint.equals(poolState.mintA) ? [poolState.tokenAAccount, poolState.tokenBAccount] : [poolState.tokenBAccount, poolState.tokenAAccount];
  return JUPITER_PROGRAM.instruction.cropperTokenSwap(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps5 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps5 !== void 0 ? _platformFee$feeBps5 : 0, {
    accounts: {
      tokenSwapProgram: poolState.programId,
      tokenProgram: splToken.TOKEN_PROGRAM_ID,
      swap: poolState.ammId,
      swapState: CROPPER_STATE_ADDRESS,
      authority: poolState.authority,
      userTransferAuthority: userTransferAuthority,
      source: userSourceTokenAccount,
      swapSource,
      swapDestination,
      destination: userDestinationTokenAccount,
      poolMint: poolState.poolMint,
      poolFee: feeAccount
    },
    remainingAccounts: prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount)
  });
}
function createRaydiumSwapInstruction({
  raydiumAmm,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps6;

  return JUPITER_PROGRAM.instruction.raydiumSwapV2(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps6 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps6 !== void 0 ? _platformFee$feeBps6 : 0, {
    accounts: raydiumAmmToRaydiumSwap(raydiumAmm, userSourceTokenAccount, userDestinationTokenAccount, userTransferAuthority),
    remainingAccounts: prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount)
  });
}
function createAldrinSwapInstruction({
  poolState,
  sourceMint,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps7;

  const [side, userBaseTokenAccount, userQuoteTokenAccount] = sourceMint.equals(poolState.baseTokenMint) ? [Side.Ask, userSourceTokenAccount, userDestinationTokenAccount] : [Side.Bid, userDestinationTokenAccount, userSourceTokenAccount];
  return JUPITER_PROGRAM.instruction.aldrinSwap(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), side, (_platformFee$feeBps7 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps7 !== void 0 ? _platformFee$feeBps7 : 0, {
    accounts: {
      swapProgram: ALDRIN_SWAP_PROGRAM_ID,
      pool: poolState.address,
      poolSigner: poolState.poolSigner,
      poolMint: poolState.poolMint,
      baseTokenVault: poolState.baseTokenVault,
      quoteTokenVault: poolState.quoteTokenVault,
      feePoolTokenAccount: poolState.feePoolTokenAccount,
      walletAuthority: userTransferAuthority,
      userBaseTokenAccount,
      userQuoteTokenAccount,
      tokenProgram: splToken.TOKEN_PROGRAM_ID
    },
    remainingAccounts: prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount)
  });
}
function createAldrinV2SwapInstruction({
  poolState,
  sourceMint,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  curve,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps8;

  const [side, userBaseTokenAccount, userQuoteTokenAccount] = sourceMint.equals(poolState.baseTokenMint) ? [Side.Ask, userSourceTokenAccount, userDestinationTokenAccount] : [Side.Bid, userDestinationTokenAccount, userSourceTokenAccount];
  return JUPITER_PROGRAM.instruction.aldrinV2Swap(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), side, (_platformFee$feeBps8 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps8 !== void 0 ? _platformFee$feeBps8 : 0, {
    accounts: {
      swapProgram: ALDRIN_SWAP_V2_PROGRAM_ID,
      pool: poolState.address,
      poolSigner: poolState.poolSigner,
      poolMint: poolState.poolMint,
      baseTokenVault: poolState.baseTokenVault,
      quoteTokenVault: poolState.quoteTokenVault,
      feePoolTokenAccount: poolState.feePoolTokenAccount,
      walletAuthority: userTransferAuthority,
      userBaseTokenAccount,
      userQuoteTokenAccount,
      curve,
      tokenProgram: splToken.TOKEN_PROGRAM_ID
    },
    remainingAccounts: prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount)
  });
}
function createCremaSwapInstruction({
  poolState,
  sourceMint,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps9;

  const [swapSource, swapDestination] = sourceMint.equals(poolState.mintA) ? [poolState.tokenAAccount, poolState.tokenBAccount] : [poolState.tokenBAccount, poolState.tokenAAccount];
  return JUPITER_PROGRAM.instruction.cremaTokenSwap(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps9 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps9 !== void 0 ? _platformFee$feeBps9 : 0, {
    accounts: {
      swapProgram: poolState.programId,
      pool: poolState.ammId,
      poolSigner: poolState.authority,
      userSourceTokenAccount: userSourceTokenAccount,
      userDestinationTokenAccount: userDestinationTokenAccount,
      poolSourceTokenAccount: swapSource,
      poolDestinationTokenAccount: swapDestination,
      poolTicksAccount: poolState.ticksKey,
      walletAuthority: userTransferAuthority,
      tokenProgram: splToken.TOKEN_PROGRAM_ID
    },
    remainingAccounts: prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount)
  });
}
function createRiskCheckAndFeeInstruction(userDestinationTokenAccount, userTransferAuthority, minimumOutAmount, tokenLedger, platformFee) {
  var _platformFee$feeBps10;

  const remainingAccounts = [];

  if (platformFee !== null && platformFee !== void 0 && platformFee.feeAccount) {
    remainingAccounts.push({
      pubkey: platformFee.feeAccount,
      isSigner: false,
      isWritable: true
    });
  }

  return JUPITER_PROGRAM.instruction.riskCheckAndFee(new BN.BN(minimumOutAmount), (_platformFee$feeBps10 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps10 !== void 0 ? _platformFee$feeBps10 : 0, {
    accounts: {
      tokenLedger,
      userDestinationTokenAccount,
      userTransferAuthority,
      tokenProgram: splToken.TOKEN_PROGRAM_ID
    },
    remainingAccounts
  });
}
function createSetTokenLedgerInstruction(tokenLedger, tokenAccountAddress) {
  return JUPITER_PROGRAM.instruction.setTokenLedger({
    accounts: {
      tokenLedger,
      tokenAccount: tokenAccountAddress
    }
  });
}
function createInitializeTokenLedgerInstruction(tokenLedger, payer) {
  return JUPITER_PROGRAM.instruction.initializeTokenLedger({
    accounts: {
      tokenLedger,
      payer,
      systemProgram: web3_js.SystemProgram.programId
    }
  });
}
function createOpenOrdersInstruction(market, userTransferAuthority) {
  const [openOrders] = pubkey.findProgramAddressSync([Buffer.from('open_orders'), market.publicKey.toBuffer(), userTransferAuthority.toBuffer()], JUPITER_PROGRAM_ID);
  const ix = JUPITER_PROGRAM.instruction.createOpenOrders({
    accounts: {
      openOrders,
      payer: userTransferAuthority,
      dexProgram: market.programId,
      systemProgram: web3_js.SystemProgram.programId,
      rent: web3_js.SYSVAR_RENT_PUBKEY,
      market: market.publicKey
    }
  });
  return [openOrders, ix];
}

function saberPoolIntoSaberSwap(saberPool, sourceMintAddress, userSourceTokenAccount, userDestinationTokenAccount, userTransferAuthority) {
  const feesTokenAccount = sourceMintAddress.equals(saberPool.state.tokenA.mint) ? saberPool.state.tokenB.adminFeeAccount : saberPool.state.tokenA.adminFeeAccount;
  const [inputTokenAccount, outputTokenAccount] = sourceMintAddress.equals(saberPool.state.tokenA.mint) ? [saberPool.state.tokenA.reserve, saberPool.state.tokenB.reserve] : [saberPool.state.tokenB.reserve, saberPool.state.tokenA.reserve];
  return {
    swapProgram: saberPool.config.swapProgramID,
    tokenProgram: splToken.TOKEN_PROGRAM_ID,
    swap: saberPool.config.swapAccount,
    swapAuthority: saberPool.config.authority,
    userAuthority: userTransferAuthority,
    inputUserAccount: userSourceTokenAccount,
    inputTokenAccount,
    outputUserAccount: userDestinationTokenAccount,
    outputTokenAccount,
    feesTokenAccount
  };
}

function createSaberSwapInstruction({
  stableSwap,
  sourceMint,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps11;

  const remainingAccounts = prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount);
  return JUPITER_PROGRAM.instruction.saberSwap(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps11 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps11 !== void 0 ? _platformFee$feeBps11 : 0, {
    accounts: saberPoolIntoSaberSwap(stableSwap, sourceMint, userSourceTokenAccount, userDestinationTokenAccount, userTransferAuthority),
    remainingAccounts
  });
}
function createSaberAddDecimalsDepositInstruction({
  addDecimals,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps12;

  const remainingAccounts = prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount);
  return JUPITER_PROGRAM.instruction.saberAddDecimalsDeposit(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps12 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps12 !== void 0 ? _platformFee$feeBps12 : 0, {
    accounts: {
      addDecimalsProgram: SABER_ADD_DECIMALS_PROGRAM_ID,
      wrapper: addDecimals.wrapper,
      wrapperMint: addDecimals.mint,
      wrapperUnderlyingTokens: addDecimals.wrapperUnderlyingTokens,
      owner: userTransferAuthority,
      userUnderlyingTokens: userSourceTokenAccount,
      userWrappedTokens: userDestinationTokenAccount,
      tokenProgram: splToken.TOKEN_PROGRAM_ID
    },
    remainingAccounts
  });
}
function createSaberAddDecimalsWithdrawInstruction({
  addDecimals,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps13;

  const remainingAccounts = prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount);
  return JUPITER_PROGRAM.instruction.saberAddDecimalsWithdraw(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps13 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps13 !== void 0 ? _platformFee$feeBps13 : 0, {
    accounts: {
      addDecimalsProgram: SABER_ADD_DECIMALS_PROGRAM_ID,
      wrapper: addDecimals.wrapper,
      wrapperMint: addDecimals.mint,
      wrapperUnderlyingTokens: addDecimals.wrapperUnderlyingTokens,
      owner: userTransferAuthority,
      userUnderlyingTokens: userDestinationTokenAccount,
      userWrappedTokens: userSourceTokenAccount,
      tokenProgram: splToken.TOKEN_PROGRAM_ID
    },
    remainingAccounts
  });
}
function createLifinitySwapInstruction({
  swapState,
  sourceMint,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps14;

  const [swapSource, swapDestination] = sourceMint.equals(swapState.tokenAMint) ? [swapState.poolCoinTokenAccount, swapState.poolPcTokenAccount] : [swapState.poolPcTokenAccount, swapState.poolCoinTokenAccount];
  return JUPITER_PROGRAM.instruction.lifinityTokenSwap(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps14 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps14 !== void 0 ? _platformFee$feeBps14 : 0, {
    accounts: {
      swapProgram: swapState.programId,
      authority: swapState.authority,
      amm: swapState.amm,
      userTransferAuthority: userTransferAuthority,
      sourceInfo: userSourceTokenAccount,
      destinationInfo: userDestinationTokenAccount,
      swapSource,
      swapDestination,
      poolMint: swapState.poolMint,
      feeAccount: swapState.feeAccount,
      tokenProgram: splToken.TOKEN_PROGRAM_ID,
      pythAccount: swapState.pythAccount,
      pythPcAccount: swapState.pythPcAccount,
      configAccount: swapState.configAccount
    },
    remainingAccounts: prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount)
  });
}
function createCykuraSwapInstruction({
  additionalArgs,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps15;

  const remainingAccounts = prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount);
  return JUPITER_PROGRAM.instruction.cykuraSwap(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), (_platformFee$feeBps15 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps15 !== void 0 ? _platformFee$feeBps15 : 0, {
    accounts: {
      swapProgram: CYKURA_PROGRAM_ID,
      signer: userTransferAuthority,
      factoryState: CYKURA_FACTORY_STATE_ADDRESS,
      poolState: additionalArgs.poolAddress,
      inputTokenAccount: userSourceTokenAccount,
      outputTokenAccount: userDestinationTokenAccount,
      inputVault: additionalArgs.inputVault,
      outputVault: additionalArgs.outputVault,
      lastObservationState: additionalArgs.lastObservationState,
      coreProgram: CYKURA_PROGRAM_ID,
      tokenProgram: splToken.TOKEN_PROGRAM_ID
    },
    remainingAccounts: remainingAccounts.concat([...additionalArgs.swapAccountMetas, {
      pubkey: additionalArgs.nextObservationState,
      isSigner: false,
      isWritable: true
    }])
  });
}
function createWhirlpoolSwapInstruction({
  additionalArgs,
  userSourceTokenAccount,
  userDestinationTokenAccount,
  userTransferAuthority,
  inAmount,
  minimumOutAmount,
  tokenLedger,
  platformFee
}) {
  var _platformFee$feeBps16;

  const [tokenOwnerAccountA, tokenOwnerAccountB] = additionalArgs.aToB ? [userSourceTokenAccount, userDestinationTokenAccount] : [userDestinationTokenAccount, userSourceTokenAccount];
  return JUPITER_PROGRAM.instruction.whirlpoolSwap(inAmount ? new BN.BN(inAmount) : inAmount, new BN.BN(minimumOutAmount), additionalArgs.aToB, (_platformFee$feeBps16 = platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) !== null && _platformFee$feeBps16 !== void 0 ? _platformFee$feeBps16 : 0, {
    accounts: {
      swapProgram: WHIRLPOOL_PROGRAM_ID,
      tokenProgram: splToken.TOKEN_PROGRAM_ID,
      tokenAuthority: userTransferAuthority,
      whirlpool: additionalArgs.whirlpool,
      tokenOwnerAccountA,
      tokenVaultA: additionalArgs.tokenVaultA,
      tokenOwnerAccountB,
      tokenVaultB: additionalArgs.tokenVaultB,
      tickArray0: additionalArgs.tickArray0,
      tickArray1: additionalArgs.tickArray1,
      tickArray2: additionalArgs.tickArray2,
      oracle: additionalArgs.oracle
    },
    remainingAccounts: prepareRemainingAccounts(inAmount, tokenLedger, platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeAccount)
  });
}

function prepareRemainingAccounts(inAmount, tokenLedger, feeAccount) {
  const remainingAccounts = [];

  if (inAmount === null) {
    remainingAccounts.push({
      pubkey: tokenLedger,
      isSigner: false,
      isWritable: true
    });
  }

  if (feeAccount) {
    remainingAccounts.push({
      pubkey: feeAccount,
      isSigner: false,
      isWritable: true
    });
  }

  return remainingAccounts;
}

function getSaberWrappedDecimalsAmms() {
  return addDecimalsJson.map(addDecimalJson => {
    const addDecimals = {
      wrapper: new web3_js.PublicKey(addDecimalJson.wrapper),
      underlying: new web3_js.PublicKey(addDecimalJson.underlying),
      underlyingDecimals: addDecimalJson.underlyingDecimals,
      wrapperUnderlyingTokens: new web3_js.PublicKey(addDecimalJson.wrapperUnderlyingTokens),
      mint: new web3_js.PublicKey(addDecimalJson.mint),
      decimals: addDecimalJson.decimals
    };
    return new SaberAddDecimalsAmm(new WrappedToken(addDecimals));
  });
}
class WrappedToken {
  constructor(addDecimals) {
    this.addDecimals = void 0;
    this.addDecimals = addDecimals;
  }

  get multiplier() {
    return 10 ** (this.addDecimals.decimals - this.addDecimals.underlyingDecimals);
  }

  getOutputAmount(inputAmount, inputMint) {
    if (this.addDecimals.mint.equals(inputMint)) {
      // withdraw, so divide
      return this.calculateWithdrawOutputAmount(inputAmount);
    } else if (this.addDecimals.underlying.equals(inputMint)) {
      // deposit, so multiply
      return this.calculateDepositOutputAmount(inputAmount);
    }

    throw new Error(`unknown input token: ${inputMint.toString()}`);
  }

  calculateDepositOutputAmount(inputAmount) {
    return JSBI__default["default"].multiply(JSBI__default["default"].BigInt(inputAmount), JSBI__default["default"].BigInt(this.multiplier));
  }

  calculateWithdrawOutputAmount(inputAmount) {
    return JSBI__default["default"].divide(JSBI__default["default"].BigInt(inputAmount), JSBI__default["default"].BigInt(this.multiplier));
  }

} // This isn't technically an Amm but this the smoothest solution to allow its usage without a major refactor of the abstractions for now

class SaberAddDecimalsAmm {
  constructor(wrappedToken) {
    this.wrappedToken = void 0;
    this.id = void 0;
    this.label = 'Saber (Decimals)';
    this.shouldPrefetch = false;
    this.wrappedToken = wrappedToken;
    this.id = this.wrappedToken.addDecimals.wrapper.toBase58();
  }

  getAccountsForUpdate() {
    return new Array();
  }

  update(_accountInfoMap) {}

  getQuote({
    sourceMint,
    amount
  }) {
    const outAmount = JSBI__default["default"].toNumber(this.wrappedToken.getOutputAmount(amount, sourceMint));
    return {
      notEnoughLiquidity: false,
      inAmount: amount,
      outAmount,
      feeAmount: 0,
      feeMint: sourceMint.toBase58(),
      feePct: 0,
      priceImpactPct: 0
    };
  }

  createSwapInstructions(swapParams) {
    if (this.wrappedToken.addDecimals.underlying.equals(swapParams.sourceMint)) {
      return [createSaberAddDecimalsDepositInstruction({
        addDecimals: this.wrappedToken.addDecimals,
        ...swapParams
      })];
    } else {
      return [createSaberAddDecimalsWithdrawInstruction({
        addDecimals: this.wrappedToken.addDecimals,
        ...swapParams
      })];
    }
  }

  get reserveTokenMints() {
    return [this.wrappedToken.addDecimals.underlying, this.wrappedToken.addDecimals.mint];
  }

}

function getTwoPermutations(array) {
  return array.reduce((acc, item) => {
    array.forEach(otherItem => {
      if (item !== otherItem) {
        acc.push([item, otherItem]);
      }
    });
    return acc;
  }, new Array());
}

function chunks(array, size) {
  return Array.apply(0, new Array(Math.ceil(array.length / size))).map((_, index) => array.slice(index * size, (index + 1) * size));
}

async function chunkedGetMultipleAccountInfos(connection, pks, batchChunkSize = 1000, maxAccountsChunkSize = 100) {
  return (await Promise.all(chunks(pks, batchChunkSize).map(async batchPubkeys => {
    const batch = chunks(batchPubkeys, maxAccountsChunkSize).map(pubkeys => ({
      methodName: 'getMultipleAccounts',
      args: connection._buildArgs([pubkeys], connection.commitment, 'base64')
    }));
    return (// getMultipleAccounts is quite slow, so we use fetch directly
      connection // @ts-ignore
      ._rpcBatchRequest(batch).then(batchResults => {
        const accounts = batchResults.reduce((acc, res) => {
          acc.push(...res.result.value);
          return acc;
        }, []);
        accounts.forEach(item => {
          if (item) {
            const value = item;
            value.data = Buffer.from(item.data[0], item.data[1]);
            value.owner = new web3_js.PublicKey(value.owner);
          }
        });
        return accounts;
      }).catch(e => {
        return batchPubkeys.map(() => null);
      })
    );
  }))).flat();
}

const mapAddressToAccountInfos = (accountInfoMap, addresses) => {
  const accountInfos = addresses.map(address => {
    const accountInfo = accountInfoMap.get(address.toString());

    if (!accountInfo) {
      throw new Error(`Account info ${address.toBase58()} missing`);
    }

    return accountInfo;
  });
  return accountInfos;
};
const tokenAccountsToJSBIs = tokenAccounts => {
  return tokenAccounts.map(tokenAccount => {
    return JSBI__default["default"].BigInt(tokenAccount.amount);
  });
};
const prefetchAmms = async (amms, connection) => {
  const accounts = amms.map(amm => amm.getAccountsForUpdate().map(item => item.toBase58())).flat();
  const accountInfosMap = new Map();
  const accountInfos = await chunkedGetMultipleAccountInfos(connection, accounts);
  accountInfos.forEach((item, index) => {
    const publicKey = accounts[index];

    if (item) {
      accountInfosMap.set(publicKey, item);
    }
  });

  for (let amm of amms) {
    amm.update(accountInfosMap);
  }
};

// Only a few hardcoded pools for now, until we query the whole lot through api
const AMM_INFO_LAYOUT_V4 = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.nu64('status'), /*#__PURE__*/bufferLayout.nu64('nonce'), /*#__PURE__*/bufferLayout.nu64('orderNum'), /*#__PURE__*/bufferLayout.nu64('depth'), /*#__PURE__*/bufferLayout.nu64('coinDecimals'), /*#__PURE__*/bufferLayout.nu64('pcDecimals'), /*#__PURE__*/bufferLayout.nu64('state'), /*#__PURE__*/bufferLayout.nu64('resetFlag'), /*#__PURE__*/bufferLayout.nu64('minSize'), /*#__PURE__*/bufferLayout.nu64('volMaxCutRatio'), /*#__PURE__*/bufferLayout.nu64('amountWaveRatio'), /*#__PURE__*/bufferLayout.nu64('coinLotSize'), /*#__PURE__*/bufferLayout.nu64('pcLotSize'), /*#__PURE__*/bufferLayout.nu64('minPriceMultiplier'), /*#__PURE__*/bufferLayout.nu64('maxPriceMultiplier'), /*#__PURE__*/bufferLayout.nu64('systemDecimalsValue'),
/*#__PURE__*/
// Fees
bufferLayout.nu64('minSeparateNumerator'), /*#__PURE__*/bufferLayout.nu64('minSeparateDenominator'), /*#__PURE__*/bufferLayout.nu64('tradeFeeNumerator'), /*#__PURE__*/bufferLayout.nu64('tradeFeeDenominator'), /*#__PURE__*/bufferLayout.nu64('pnlNumerator'), /*#__PURE__*/bufferLayout.nu64('pnlDenominator'), /*#__PURE__*/bufferLayout.nu64('swapFeeNumerator'), /*#__PURE__*/bufferLayout.nu64('swapFeeDenominator'),
/*#__PURE__*/
// OutPutData
bufferLayout.nu64('needTakePnlCoin'), /*#__PURE__*/bufferLayout.nu64('needTakePnlPc'), /*#__PURE__*/bufferLayout.nu64('totalPnlPc'), /*#__PURE__*/bufferLayout.nu64('totalPnlCoin'), /*#__PURE__*/uint128('poolTotalDepositPc'), /*#__PURE__*/uint128('poolTotalDepositCoin'), /*#__PURE__*/uint128('swapCoinInAmount'), /*#__PURE__*/uint128('swapPcOutAmount'), /*#__PURE__*/bufferLayout.nu64('swapCoin2PcFee'), /*#__PURE__*/uint128('swapPcInAmount'), /*#__PURE__*/uint128('swapCoinOutAmount'), /*#__PURE__*/bufferLayout.nu64('swapPc2CoinFee'), /*#__PURE__*/publicKey('poolCoinTokenAccount'), /*#__PURE__*/publicKey('poolPcTokenAccount'), /*#__PURE__*/publicKey('coinMintAddress'), /*#__PURE__*/publicKey('pcMintAddress'), /*#__PURE__*/publicKey('lpMintAddress'), /*#__PURE__*/publicKey('ammOpenOrders'), /*#__PURE__*/publicKey('serumMarket'), /*#__PURE__*/publicKey('serumProgramId'), /*#__PURE__*/publicKey('ammTargetOrders'), /*#__PURE__*/publicKey('poolWithdrawQueue'), /*#__PURE__*/publicKey('poolTempLpTokenAccount'), /*#__PURE__*/publicKey('ammOwner'), /*#__PURE__*/publicKey('pnlOwner')]);

// https://github.com/raydium-io/raydium-ui/blob/4048286f79fc4b71c3ffbfd9095470ab0c7d3862/src/utils/liquidity.ts#L30-L82
class RaydiumAmm {
  constructor(ammId, ammAccountInfo, params) {
    this.ammId = void 0;
    this.id = void 0;
    this.label = 'Raydium';
    this.shouldPrefetch = false;
    this.coinMint = void 0;
    this.pcMint = void 0;
    this.status = void 0;
    this.serumProgramId = void 0;
    this.serumMarket = void 0;
    this.ammOpenOrders = void 0;
    this.ammTargetOrders = void 0;
    this.poolCoinTokenAccount = void 0;
    this.poolPcTokenAccount = void 0;
    this.serumMarketKeys = void 0;
    this.coinReserve = void 0;
    this.pcReserve = void 0;
    this.feePct = void 0;
    this.calculator = void 0;
    this.ammId = ammId;
    this.id = ammId.toBase58();
    const decoded = AMM_INFO_LAYOUT_V4.decode(ammAccountInfo.data);
    this.status = decoded.status;
    this.coinMint = new web3_js.PublicKey(decoded.coinMintAddress);
    this.pcMint = new web3_js.PublicKey(decoded.pcMintAddress);
    this.poolCoinTokenAccount = new web3_js.PublicKey(decoded.poolCoinTokenAccount);
    this.poolPcTokenAccount = new web3_js.PublicKey(decoded.poolPcTokenAccount);
    this.serumProgramId = new web3_js.PublicKey(decoded.serumProgramId);
    this.serumMarket = new web3_js.PublicKey(decoded.serumMarket);
    this.ammOpenOrders = new web3_js.PublicKey(decoded.ammOpenOrders);
    this.ammTargetOrders = new web3_js.PublicKey(decoded.ammTargetOrders);
    this.serumMarketKeys = Object.keys(params).reduce((acc, item) => {
      const pk = params[item];
      if (!pk) throw new Error(`Could not find ${item} in params`);
      acc[item] = new web3_js.PublicKey(params[item]);
      return acc;
    }, {});
    const swapFeeNumerator = decoded.swapFeeNumerator;
    const swapFeeDenominator = decoded.swapFeeDenominator;
    this.feePct = new Decimal__default["default"](swapFeeNumerator.toString()).div(swapFeeDenominator.toString());
    this.calculator = new math.TokenSwapConstantProduct(new math.Fraction(JSBI__default["default"].BigInt(swapFeeNumerator), JSBI__default["default"].BigInt(swapFeeDenominator)), math.ZERO_FRACTION);
  }

  static decodeSerumMarketKeysString(serumProgramId, serumMarket, serumMarketInfo) {
    const decodedMarket = serum.Market.getLayout(serumProgramId).decode(serumMarketInfo.data);
    const serumVaultSigner = pubkey.createProgramAddressSync([serumMarket.toBuffer(), decodedMarket.vaultSignerNonce.toArrayLike(Buffer, 'le', 8)], serumProgramId);
    return {
      serumBids: decodedMarket.bids.toBase58(),
      serumAsks: decodedMarket.asks.toBase58(),
      serumEventQueue: decodedMarket.eventQueue.toBase58(),
      serumCoinVaultAccount: decodedMarket.baseVault.toBase58(),
      serumPcVaultAccount: decodedMarket.quoteVault.toBase58(),
      serumVaultSigner: serumVaultSigner.toBase58()
    };
  }

  getAccountsForUpdate() {
    return [this.ammId, this.poolCoinTokenAccount, this.poolPcTokenAccount, this.ammOpenOrders];
  }

  update(accountInfoMap) {
    const [ammAccountInfo, poolCoinTokenAccountInfo, poolPcTokenAccountInfo, ammOpenOrdersAccountInfo] = mapAddressToAccountInfos(accountInfoMap, this.getAccountsForUpdate());
    const [coinAmount, pcAmount] = [RaydiumAmm.tokenAmountAccessor(poolCoinTokenAccountInfo), RaydiumAmm.tokenAmountAccessor(poolPcTokenAccountInfo)];
    const openOrders = serum.OpenOrders.fromAccountInfo(this.ammOpenOrders, ammOpenOrdersAccountInfo, ammOpenOrdersAccountInfo.owner);
    const decoded = AMM_INFO_LAYOUT_V4.decode(ammAccountInfo.data);
    this.coinReserve = coinAmount.add(openOrders.baseTokenTotal).sub(new splToken.u64(String(decoded.needTakePnlCoin)));
    this.pcReserve = pcAmount.add(openOrders.quoteTokenTotal).sub(new splToken.u64(String(decoded.needTakePnlPc)));
  }

  static tokenAmountAccessor(tokenAccountInfo) {
    return splToken.u64.fromBuffer(tokenAccountInfo.data.slice(64, 64 + 8));
  }

  getQuote({
    sourceMint,
    amount
  }) {
    const {
      coinReserve,
      pcReserve
    } = this;

    if (!coinReserve || !pcReserve) {
      throw new Error('Pool token accounts balances not refreshed or empty');
    }

    const outputIndex = this.coinMint.equals(sourceMint) ? 1 : 0;
    const result = this.calculator.exchange([JSBI__default["default"].BigInt(coinReserve), JSBI__default["default"].BigInt(pcReserve)], JSBI__default["default"].BigInt(amount), outputIndex);
    return {
      notEnoughLiquidity: false,
      inAmount: amount,
      outAmount: JSBI__default["default"].toNumber(result.expectedOutputAmount),
      feeAmount: JSBI__default["default"].toNumber(result.fees),
      feeMint: sourceMint.toBase58(),
      feePct: this.feePct.toNumber(),
      priceImpactPct: result.priceImpact.toNumber()
    };
  }

  createSwapInstructions(swapParams) {
    return [createRaydiumSwapInstruction({
      raydiumAmm: this,
      ...swapParams
    })];
  }

  get reserveTokenMints() {
    return [this.coinMint, this.pcMint];
  }

}

const TAKER_FEE_PCT = 0.0004;
const STABLE_TAKER_FEE_PCT = 0.0001; // Stable markets are hardcoded in the program

const STABLE_MARKET_ADDRESSES = ['77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS', '5cLrMai1DsLRYc1Nio9qMTicsWtvzjzZfJPXyAoF4t1Z', 'EERNEEnBqdGzBS8dd46wwNY5F2kwnaCQ3vsq2fNKGogZ', '8sFf9TW3KzxLiBXcDcjAxqabEsRroo4EiRr3UG1xbJ9m', '2iDSTGhjJEiRxNaLF27CY6daMYPs5hgYrP2REHd5YD62' // stSOL/SOL
]; // Provides swap like out amount, with slippage and corresponding minimum amount out

function getOutAmountMeta({
  market,
  asks,
  bids,
  fromAmount,
  fromMint,
  toMint
}) {
  const takerFeePct = STABLE_MARKET_ADDRESSES.includes(market.address.toBase58()) ? STABLE_TAKER_FEE_PCT : TAKER_FEE_PCT;

  if (fromMint.equals(market.quoteMintAddress) && toMint.equals(market.baseMintAddress)) {
    // buy
    return forecastBuy(market, asks, fromAmount, takerFeePct);
  } else {
    return forecastSell(market, bids, fromAmount, takerFeePct);
  }
}
function forecastBuy(market, orderbook, pcIn, takerFeePct) {
  let coinOut = JSBI__default["default"].BigInt(0);
  let bestPrice = JSBI__default["default"].BigInt(0);
  let worstPrice = JSBI__default["default"].BigInt(0); // total base price

  let totalCost = JSBI__default["default"].BigInt(0);
  let totalCoins = JSBI__default["default"].BigInt(0); // might be decimal, e.g: 0.001

  const quoteSizeLots = market.quoteSizeLotsToNumber(new BN__default["default"](1)); // Serum buy order take fee in quote tokens

  let availablePc = quoteSizeLots ? JSBI__default["default"].BigInt(Math.floor(pcIn / (1 + takerFeePct) / quoteSizeLots)) : math.ZERO;
  const baseSizeLots = JSBI__default["default"].BigInt(market.baseSizeLotsToNumber(new BN__default["default"](1)).toString());

  for (let [lotPrice, lotQuantity] of getL2(orderbook)) {
    if (JSBI__default["default"].equal(bestPrice, math.ZERO)) {
      bestPrice = lotPrice;
    }

    worstPrice = lotPrice;
    const orderCoinAmount = JSBI__default["default"].multiply(lotQuantity, baseSizeLots);
    const orderPcAmount = JSBI__default["default"].multiply(lotQuantity, lotPrice);
    totalCoins = JSBI__default["default"].add(totalCoins, orderCoinAmount);

    if (JSBI__default["default"].greaterThanOrEqual(orderPcAmount, availablePc)) {
      const numberLotsPurchasable = JSBI__default["default"].divide(availablePc, lotPrice);
      totalCost = JSBI__default["default"].add(totalCost, JSBI__default["default"].multiply(lotPrice, numberLotsPurchasable));
      coinOut = JSBI__default["default"].add(coinOut, JSBI__default["default"].multiply(baseSizeLots, numberLotsPurchasable));
      availablePc = math.ZERO;
      break;
    } else {
      totalCost = JSBI__default["default"].add(totalCost, JSBI__default["default"].multiply(lotPrice, lotQuantity));
      coinOut = JSBI__default["default"].add(coinOut, orderCoinAmount);
      availablePc = JSBI__default["default"].subtract(availablePc, orderPcAmount);
    }
  }

  const bestPriceDecimal = new Decimal__default["default"](bestPrice.toString());
  const worstPriceDecimal = new Decimal__default["default"](worstPrice.toString());
  const priceImpactPct = worstPriceDecimal.sub(bestPriceDecimal).div(bestPriceDecimal).toNumber();
  const bestPriceSizeLots = priceLotsToDecimal(market, new BN__default["default"](bestPrice.toString()));
  const totalCostSizeLots = priceLotsToDecimal(market, new BN__default["default"](totalCost.toString()));
  return {
    side: 'buy',
    notEnoughLiquidity: JSBI__default["default"].lessThanOrEqual(totalCoins, coinOut),
    minimum: {
      in: new Decimal__default["default"](bestPriceSizeLots.toString()).mul(baseSizeLots.toString()).mul(1 + takerFeePct).ceil().toNumber(),
      out: JSBI__default["default"].toNumber(baseSizeLots)
    },
    inAmount: new Decimal__default["default"](totalCostSizeLots.toString()).mul(baseSizeLots.toString()).mul(1 + takerFeePct).ceil().toNumber(),
    outAmount: JSBI__default["default"].toNumber(coinOut),
    feeAmount: new Decimal__default["default"](totalCost.toString()).mul(takerFeePct).toNumber(),
    priceImpactPct,
    feePct: takerFeePct
  };
}
function forecastSell(market, orderbook, coinIn, takerFeePct) {
  let pcOut = JSBI__default["default"].BigInt(0);
  let bestPrice = JSBI__default["default"].BigInt(0);
  let worstPrice = JSBI__default["default"].BigInt(0);
  let totalCoin = JSBI__default["default"].BigInt(0);
  let availableCoin = JSBI__default["default"].BigInt(coinIn);
  let inAmount = JSBI__default["default"].BigInt(0);
  const baseSizeLots = JSBI__default["default"].BigInt(market.baseSizeLotsToNumber(new BN__default["default"](1)));
  const quoteSizeLots = JSBI__default["default"].BigInt(market.quoteSizeLotsToNumber(new BN__default["default"](1)));

  for (const [lotPrice, lotQuantity] of getL2(orderbook)) {
    if (JSBI__default["default"].equal(bestPrice, math.ZERO)) {
      bestPrice = lotPrice;
    }

    worstPrice = lotPrice;
    const orderCoinAmount = JSBI__default["default"].multiply(baseSizeLots, lotQuantity);
    const orderPcAmount = JSBI__default["default"].multiply(lotQuantity, JSBI__default["default"].multiply(lotPrice, quoteSizeLots));
    totalCoin = JSBI__default["default"].add(totalCoin, orderCoinAmount);

    if (JSBI__default["default"].greaterThanOrEqual(orderCoinAmount, availableCoin)) {
      const numberLotsCanSell = JSBI__default["default"].divide(availableCoin, baseSizeLots);
      const totalCoinAmountToSell = JSBI__default["default"].multiply(numberLotsCanSell, lotPrice);
      pcOut = JSBI__default["default"].add(pcOut, JSBI__default["default"].multiply(totalCoinAmountToSell, quoteSizeLots));
      availableCoin = JSBI__default["default"].subtract(availableCoin, totalCoinAmountToSell);
      inAmount = JSBI__default["default"].add(inAmount, JSBI__default["default"].multiply(numberLotsCanSell, baseSizeLots));
      break;
    } else {
      pcOut = JSBI__default["default"].add(pcOut, orderPcAmount);
      availableCoin = JSBI__default["default"].subtract(availableCoin, orderCoinAmount);
      inAmount = JSBI__default["default"].add(inAmount, orderCoinAmount);
    }
  }

  let pcOutInteger = new Decimal__default["default"](pcOut.toString()).mul(1 - takerFeePct).floor().toNumber();
  const bestPriceDecimal = priceLotsToDecimal(market, new BN__default["default"](bestPrice.toString()));
  const worstPriceDecimal = priceLotsToDecimal(market, new BN__default["default"](worstPrice.toString()));
  const priceImpactPct = bestPriceDecimal.minus(worstPriceDecimal).div(bestPriceDecimal).toNumber();
  return {
    side: 'sell',
    notEnoughLiquidity: JSBI__default["default"].greaterThan(JSBI__default["default"].BigInt(coinIn), totalCoin),
    minimum: {
      in: JSBI__default["default"].toNumber(baseSizeLots),
      out: bestPriceDecimal.mul(JSBI__default["default"].toNumber(baseSizeLots)).mul(1 - takerFeePct).floor().toNumber()
    },
    inAmount: JSBI__default["default"].toNumber(inAmount),
    outAmount: pcOutInteger,
    feeAmount: new Decimal__default["default"](JSBI__default["default"].toNumber(pcOut)).mul(takerFeePct).round().toNumber(),
    priceImpactPct,
    feePct: takerFeePct
  };
}
function* getL2(orderbook) {
  const descending = orderbook.isBids;

  for (const {
    key,
    quantity
  } of orderbook.slab.items(descending)) {
    const price = JSBI__default["default"].BigInt(key.ushrn(64).toString());
    yield [price, JSBI__default["default"].BigInt(quantity.toString())];
  }
}

function divideBnToDecimal(numerator, denominator) {
  const quotient = new Decimal__default["default"](numerator.div(denominator).toString());
  const rem = numerator.umod(denominator);
  const gcd = rem.gcd(denominator);
  return quotient.add(new Decimal__default["default"](rem.div(gcd).toString()).div(new Decimal__default["default"](denominator.div(gcd).toString())));
}

function priceLotsToDecimal(market, price) {
  // @ts-expect-error _decoded
  const baseLotSize = market._decoded.baseLotSize;
  if (baseLotSize.isZero()) return new Decimal__default["default"](0);
  return divideBnToDecimal( // @ts-expect-error _decoded _baseSplTokenMultiplier is private
  price.mul(market._decoded.quoteLotSize).mul(market._baseSplTokenMultiplier), // @ts-expect-error _quoteSplTokenMultiplier is private
  baseLotSize.mul(market._quoteSplTokenMultiplier));
}

class SerumAmm {
  constructor(market) {
    this.market = void 0;
    this.id = void 0;
    this.label = 'Serum';
    this.shouldPrefetch = false;
    this._orderbooks = void 0;
    this.market = market;
    this.id = market.address.toBase58();
  }

  get orderbooks() {
    return this._orderbooks;
  }

  getAccountsForUpdate() {
    return [this.market.asksAddress, this.market.bidsAddress];
  }

  update(accountInfoMap) {
    const [asksAccountInfo, bidsAccountInfo] = mapAddressToAccountInfos(accountInfoMap, this.getAccountsForUpdate());
    const asks = serum.Orderbook.decode(this.market, asksAccountInfo.data);
    const bids = serum.Orderbook.decode(this.market, bidsAccountInfo.data);
    this._orderbooks = {
      asks,
      bids
    };
  }

  getQuote({
    sourceMint,
    destinationMint,
    amount
  }) {
    if (!this.orderbooks) {
      throw new Error('Failed to find orderbooks');
    }

    const outAmountMeta = getOutAmountMeta({
      market: this.market,
      asks: this.orderbooks.asks,
      bids: this.orderbooks.bids,
      fromMint: sourceMint,
      toMint: destinationMint,
      fromAmount: amount
    });
    return {
      notEnoughLiquidity: outAmountMeta.notEnoughLiquidity,
      minInAmount: outAmountMeta.minimum.in,
      minOutAmount: outAmountMeta.minimum.out,
      inAmount: outAmountMeta.inAmount,
      outAmount: outAmountMeta.outAmount,
      feeAmount: outAmountMeta.feeAmount,
      feeMint: this.market.quoteMintAddress.toBase58(),
      feePct: outAmountMeta.feePct,
      priceImpactPct: outAmountMeta.priceImpactPct
    };
  }

  createSwapInstructions(swapParams) {
    var _swapParams$quoteMint;

    if (!swapParams.openOrdersAddress) {
      throw new Error('Missing open orders');
    }

    return [createSerumSwapInstruction({
      market: this.market,
      openOrdersAddress: swapParams.openOrdersAddress,
      referrer: swapParams === null || swapParams === void 0 ? void 0 : (_swapParams$quoteMint = swapParams.quoteMintToReferrer) === null || _swapParams$quoteMint === void 0 ? void 0 : _swapParams$quoteMint.get(this.market.quoteMintAddress.toBase58()),
      ...swapParams
    })];
  }

  get reserveTokenMints() {
    return [this.market.baseMintAddress, this.market.quoteMintAddress];
  }

}
SerumAmm.getL2 = getL2;

function isSplitSupported(firstAmm, secondAmm) {
  if (firstAmm instanceof SerumAmm && secondAmm instanceof RaydiumAmm || firstAmm instanceof RaydiumAmm && secondAmm instanceof SerumAmm || firstAmm instanceof SerumAmm && secondAmm instanceof SerumAmm) {
    return false;
  }

  return true;
} // Create an iteration to quote with a stepped split


class SplitTradeAmm {
  constructor(firstAmm, secondAmm, reserveTokenMints) {
    this.firstAmm = void 0;
    this.secondAmm = void 0;
    this.reserveTokenMints = void 0;
    this.market = void 0;
    this.shouldPrefetch = false;
    this.portion1 = 0;
    this.portion2 = 0;
    this.firstAmm = firstAmm;
    this.secondAmm = secondAmm;
    this.reserveTokenMints = reserveTokenMints;
    this.market = firstAmm instanceof SerumAmm ? firstAmm.market : secondAmm instanceof SerumAmm ? secondAmm.market : null;
  }

  static getAmmIdsFromSplitTradeAmmId(id) {
    const ammIds = id.split('-');
    return ammIds.length > 1 ? ammIds : [];
  }

  static create(firstAmm, secondAmm) {
    if (!isSplitSupported(firstAmm, secondAmm)) return;
    const firstAmmTwoPermutations = getTwoPermutations(firstAmm.reserveTokenMints);
    const secondAmmTwoPermutations = getTwoPermutations(secondAmm.reserveTokenMints);

    for (const firstAmmTwoPermutation of firstAmmTwoPermutations) {
      for (const secondAmmTwoPermutation of secondAmmTwoPermutations) {
        if (firstAmmTwoPermutation.every((value, index) => value.equals(secondAmmTwoPermutation[index]))) {
          return new SplitTradeAmm(firstAmm, secondAmm, firstAmmTwoPermutation);
        }
      }
    }
  }

  setPortions(portion1, portion2) {
    if (portion1 + portion2 !== 100) {
      throw new Error('Split trade portions must sum to 100');
    }

    this.portion1 = portion1;
    this.portion2 = portion2;
  }

  get id() {
    return `${this.firstAmm.id}-${this.secondAmm.id}`;
  }

  get label() {
    const labelWithPortions = [{
      label: this.firstAmm.label,
      portion: this.portion1
    }, {
      label: this.secondAmm.label,
      portion: this.portion2
    }].sort((a, b) => b.portion - a.portion);
    return labelWithPortions.map(({
      label,
      portion
    }) => `${label} (${portion}%)`).join(' + ');
  }

  getAccountsForUpdate() {
    return [];
  }

  update(_accountInfoMap) {// Underlying amms are updated
  }

  getQuote(quoteParams) {
    var _firstQuote$minInAmou, _secondQuote$minInAmo, _firstQuote$minOutAmo, _secondQuote$minOutAm;

    const sourceMintString = quoteParams.sourceMint.toBase58();
    const amount = quoteParams.amount; // Portion in % directly to please the UI

    let bestSolution = {
      outAmount: 0,
      portion: 0,
      firstQuote: undefined,
      secondQuote: undefined
    }; // Increase portion until 100

    for (let p = 100; p -= 5; p > 0) {
      const firstAmount = Math.floor(amount * p / 100);
      const secondAmount = amount - firstAmount;
      const firstQuote = this.firstAmm.getQuote({ ...quoteParams,
        amount: firstAmount
      });
      const secondQuote = this.secondAmm.getQuote({ ...quoteParams,
        amount: secondAmount
      });
      const outAmount = firstQuote.outAmount + secondQuote.outAmount;

      if (outAmount < bestSolution.outAmount) {
        break;
      }

      bestSolution = {
        outAmount,
        portion: p,
        firstQuote,
        secondQuote
      };
    }

    if (!bestSolution.firstQuote || !bestSolution.secondQuote) {
      throw new Error('Unreachable: There was no better solution than getting 0 outAmount');
    }

    const {
      outAmount,
      portion,
      firstQuote,
      secondQuote
    } = bestSolution;
    const portion1 = portion;
    const portion2 = 100 - portion1; // For UI display

    this.portion1 = portion1;
    this.portion2 = portion2;
    let firstAmmFee = {
      amount: firstQuote.feeAmount,
      mint: firstQuote.feeMint
    };
    let secondAmmFee = {
      amount: secondQuote.feeAmount,
      mint: secondQuote.feeMint
    };

    if (firstAmmFee.mint !== secondAmmFee.mint) {
      // Then we convert destinationMint fee into a sourceMint, to please the current data structure
      // This will lead to inexact fees but this doesn't affect the user minimum out amount
      if (firstAmmFee.mint !== sourceMintString) {
        firstAmmFee = {
          amount: Math.floor(firstAmmFee.amount * amount * portion1 / 100 / bestSolution.outAmount),
          mint: sourceMintString
        };
      }

      if (secondAmmFee.mint !== sourceMintString) {
        secondAmmFee = {
          amount: Math.floor(secondAmmFee.amount * amount * portion2 / 100 / bestSolution.outAmount),
          mint: sourceMintString
        };
      }
    }

    const feePct = (portion1 * firstQuote.feePct + portion2 * secondQuote.feePct) / 100;
    const priceImpactPct = (portion1 * firstQuote.priceImpactPct + portion2 * secondQuote.priceImpactPct) / 100; // Not sure about the relevance on minInAmount and minOutAmount in this case

    const minInAmount = firstQuote.minInAmount || secondQuote.minInAmount ? ((_firstQuote$minInAmou = firstQuote.minInAmount) !== null && _firstQuote$minInAmou !== void 0 ? _firstQuote$minInAmou : 0) + ((_secondQuote$minInAmo = secondQuote.minInAmount) !== null && _secondQuote$minInAmo !== void 0 ? _secondQuote$minInAmo : 0) : undefined;
    const minOutAmount = firstQuote.minOutAmount || secondQuote.minOutAmount ? ((_firstQuote$minOutAmo = firstQuote.minOutAmount) !== null && _firstQuote$minOutAmo !== void 0 ? _firstQuote$minOutAmo : 0) + ((_secondQuote$minOutAm = secondQuote.minOutAmount) !== null && _secondQuote$minOutAm !== void 0 ? _secondQuote$minOutAm : 0) : undefined;
    return {
      notEnoughLiquidity: false,
      inAmount: quoteParams.amount,
      outAmount: outAmount,
      minInAmount,
      minOutAmount,
      feeAmount: firstAmmFee.amount + secondAmmFee.amount,
      feeMint: firstAmmFee.mint,
      feePct,
      priceImpactPct
    };
  }

  createSwapInstructions(swapParams) {
    const inAmount = swapParams.inAmount;

    if (inAmount === null) {
      throw new Error('Split trade cannot be used with a null inAmount');
    } // We rely on the fact that this.portion1 is set, what if it isn't?


    const firstAmount = Math.floor(inAmount * this.portion1 / 100);
    const secondAmount = inAmount - firstAmount;
    return [...this.firstAmm.createSwapInstructions({ ...swapParams,
      inAmount: firstAmount,
      minimumOutAmount: 0,
      platformFee: undefined
    }), ...this.secondAmm.createSwapInstructions({ ...swapParams,
      inAmount: secondAmount,
      minimumOutAmount: 0,
      platformFee: undefined
    }), createRiskCheckAndFeeInstruction(swapParams.userDestinationTokenAccount, swapParams.userTransferAuthority, swapParams.minimumOutAmount, swapParams.tokenLedger, swapParams.platformFee)];
  }

}

const isValidRoute = (ammA, ammB) => {
  // dont match the same amm together
  if (ammA.id === ammB.id) {
    return false;
  } // don't show decimal as input or output
  else if (ammA instanceof SaberAddDecimalsAmm && ammB instanceof SaberAddDecimalsAmm) {
    return false;
  } else if (ammA instanceof SplitTradeAmm || ammB instanceof SplitTradeAmm) {
    return false;
  }

  return true;
};
function isSerumAndRaydium(marketInfos) {
  if (marketInfos.length < 2) return false;
  const [firstAmm, secondAmm] = marketInfos.map(mi => mi.amm);
  return firstAmm instanceof RaydiumAmm && secondAmm instanceof SerumAmm || firstAmm instanceof SerumAmm && secondAmm instanceof RaydiumAmm;
}

class SaberAmm {
  constructor(stableSwap) {
    this.stableSwap = void 0;
    this.id = void 0;
    this.label = 'Saber';
    this.shouldPrefetch = false;
    this.tokenAccounts = [];
    this.calculator = void 0;
    this.stableSwap = stableSwap;
    this.id = stableSwap.config.swapAccount.toBase58();
    this.calculator = new math.Stable(math.TWO, stableswapSdk.calculateAmpFactor(this.stableSwap.state), [math.ONE, math.ONE], new math.Fraction(this.stableSwap.state.fees.trade.numerator, this.stableSwap.state.fees.trade.denominator));
  }

  getAccountsForUpdate() {
    return [this.stableSwap.state.tokenA.reserve, this.stableSwap.state.tokenB.reserve];
  }

  update(accountInfoMap) {
    let tokenAccountInfos = mapAddressToAccountInfos(accountInfoMap, this.getAccountsForUpdate());
    this.tokenAccounts = tokenAccountInfos.map(info => {
      const tokenAccount = optimist.deserializeAccount(info.data);

      if (!tokenAccount) {
        throw new Error('Invalid token account data');
      }

      return tokenAccount;
    });
  }

  getQuote({
    sourceMint,
    destinationMint,
    amount
  }) {
    if (this.tokenAccounts.length === 0) {
      throw new Error('Unable to fetch accounts for specified tokens.');
    }

    const feePct = new Decimal__default["default"](this.stableSwap.state.fees.trade.asFraction.toFixed(4));
    const [inputIndex, outputIndex] = this.tokenAccounts[0].mint.equals(sourceMint) ? [0, 1] : [1, 0];
    this.calculator.setAmp(stableswapSdk.calculateAmpFactor(this.stableSwap.state));
    const result = this.calculator.exchange(tokenAccountsToJSBIs(this.tokenAccounts), JSBI__default["default"].BigInt(amount), inputIndex, outputIndex);
    return {
      notEnoughLiquidity: false,
      inAmount: amount,
      outAmount: JSBI__default["default"].toNumber(result.expectedOutputAmount),
      feeAmount: JSBI__default["default"].toNumber(result.fees),
      feeMint: destinationMint.toBase58(),
      feePct: feePct.toNumber(),
      priceImpactPct: result.priceImpact.toNumber()
    };
  }

  createSwapInstructions(swapParams) {
    return [createSaberSwapInstruction({
      stableSwap: this.stableSwap,
      ...swapParams
    })];
  }

  get reserveTokenMints() {
    return [this.stableSwap.state.tokenA.mint, this.stableSwap.state.tokenB.mint];
  }

}

const ZERO = /*#__PURE__*/new splToken.u64(0);
class Percentage {
  constructor(numerator, denominator) {
    this.numerator = void 0;
    this.denominator = void 0;

    this.toString = () => {
      return `${this.numerator.toString()}/${this.denominator.toString()}`;
    };

    this.numerator = numerator;
    this.denominator = denominator;
  }

  static fromDecimal(number) {
    return Percentage.fromFraction(number.toDecimalPlaces(1).mul(10).toNumber(), 1000);
  }

  static fromFraction(numerator, denominator) {
    const num = typeof numerator === 'number' ? new splToken.u64(numerator.toString()) : numerator;
    const denom = typeof denominator === 'number' ? new splToken.u64(denominator.toString()) : denominator;
    return new Percentage(num, denom);
  }

  toDecimal() {
    if (this.denominator.eq(ZERO)) {
      return new Decimal__default["default"](0);
    }

    return new Decimal__default["default"](this.numerator.toString()).div(new Decimal__default["default"](this.denominator.toString()));
  }

  add(p2) {
    const denomGcd = this.denominator.gcd(p2.denominator);
    const denomLcm = this.denominator.div(denomGcd).mul(p2.denominator);
    const p1DenomAdjustment = denomLcm.div(this.denominator);
    const p2DenomAdjustment = denomLcm.div(p2.denominator);
    const p1NumeratorAdjusted = this.numerator.mul(p1DenomAdjustment);
    const p2NumeratorAdjusted = p2.numerator.mul(p2DenomAdjustment);
    const newNumerator = p1NumeratorAdjusted.add(p2NumeratorAdjusted);
    return new Percentage(new splToken.u64(newNumerator.toString()), new splToken.u64(denomLcm.toString()));
  }

}

const FEES_LAYOUT = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/uint64('tradeFeeNumerator'), /*#__PURE__*/uint64('tradeFeeDenominator'), /*#__PURE__*/uint64('ownerTradeFeeNumerator'), /*#__PURE__*/uint64('ownerTradeFeeDenominator'), /*#__PURE__*/uint64('ownerWithdrawFeeNumerator'), /*#__PURE__*/uint64('ownerWithdrawFeeDenominator')], 'fees');
const POOL_FIELDS_COMMON = [/*#__PURE__*/bufferLayout.blob(8, 'padding'), /*#__PURE__*/publicKey('lpTokenFreezeVault'), /*#__PURE__*/publicKey('poolMint'), /*#__PURE__*/publicKey('baseTokenVault'), /*#__PURE__*/publicKey('baseTokenMint'), /*#__PURE__*/publicKey('quoteTokenVault'), /*#__PURE__*/publicKey('quoteTokenMint'), /*#__PURE__*/publicKey('poolSigner'), /*#__PURE__*/bufferLayout.u8('poolSignerNonce'), /*#__PURE__*/publicKey('authority'), /*#__PURE__*/publicKey('initializerAccount'), /*#__PURE__*/publicKey('feeBaseAccount'), /*#__PURE__*/publicKey('feeQuoteAccount'), /*#__PURE__*/publicKey('feePoolTokenAccount'), FEES_LAYOUT];
const POOL_LAYOUT = /*#__PURE__*/bufferLayout.struct(POOL_FIELDS_COMMON);
const POOL_V2_LAYOUT = /*#__PURE__*/bufferLayout.struct([...POOL_FIELDS_COMMON, /*#__PURE__*/bufferLayout.u8('curveType'), /*#__PURE__*/publicKey('curve')]);
const STABLE_CURVE_LAYOUT = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.blob(8, 'padding'), /*#__PURE__*/uint64('amp')]);
function accountInfoToAldrinPoolState(address, accountInfo) {
  const isV2 = accountInfo.owner.equals(ALDRIN_SWAP_V2_PROGRAM_ID) ? true : false;
  const decoded = (isV2 ? POOL_V2_LAYOUT : POOL_LAYOUT).decode(accountInfo.data);
  const curveObject = 'curveType' in decoded ? {
    curveType: decoded.curveType,
    curve: decoded.curve
  } : {};
  return {
    isV2,
    address,
    poolMint: decoded.poolMint,
    baseTokenVault: decoded.baseTokenVault,
    baseTokenMint: decoded.baseTokenMint,
    quoteTokenVault: decoded.quoteTokenVault,
    quoteTokenMint: decoded.quoteTokenMint,
    poolSigner: decoded.poolSigner,
    feeBaseAccount: decoded.feeBaseAccount,
    feeQuoteAccount: decoded.feeQuoteAccount,
    feePoolTokenAccount: decoded.feePoolTokenAccount,
    fees: {
      traderFee: Percentage.fromFraction(decoded.fees.tradeFeeNumerator, decoded.fees.tradeFeeDenominator),
      ownerFee: Percentage.fromFraction(decoded.fees.ownerTradeFeeNumerator, decoded.fees.ownerTradeFeeDenominator)
    },
    ...curveObject
  };
}

class AldrinAmm {
  constructor(address, accountInfo, params) {
    this.params = void 0;
    this.id = void 0;
    this.label = 'Aldrin';
    this.shouldPrefetch = false;
    this.poolState = void 0;
    this.tokenAccounts = [];
    this.calculator = void 0;
    this.params = params;
    this.poolState = accountInfoToAldrinPoolState(address, accountInfo);
    this.id = address.toBase58();

    if (this.poolState.curveType === 1) {
      const {
        amp
      } = this.params;

      if (!amp) {
        throw new Error('Amp is required for a stable curve');
      }

      this.calculator = new math.TokenSwapStable(JSBI__default["default"].BigInt(amp), new math.Fraction(JSBI__default["default"].BigInt(this.poolState.fees.traderFee.numerator.toString()), JSBI__default["default"].BigInt(this.poolState.fees.traderFee.denominator.toString())), new math.Fraction(JSBI__default["default"].BigInt(this.poolState.fees.ownerFee.numerator.toString()), JSBI__default["default"].BigInt(this.poolState.fees.ownerFee.denominator.toString())));
    } else {
      this.calculator = new math.TokenSwapConstantProduct(new math.Fraction(JSBI__default["default"].BigInt(this.poolState.fees.traderFee.numerator.toString()), JSBI__default["default"].BigInt(this.poolState.fees.traderFee.denominator.toString())), new math.Fraction(JSBI__default["default"].BigInt(this.poolState.fees.ownerFee.numerator.toString()), JSBI__default["default"].BigInt(this.poolState.fees.ownerFee.denominator.toString())));
    }
  }

  static decodeStableCurveAmp(accountInfo) {
    const {
      amp
    } = STABLE_CURVE_LAYOUT.decode(accountInfo.data);
    return amp.toNumber() * 2; // times two for their AMP, dont ask me why, it is what it is
  }

  getAccountsForUpdate() {
    return [this.poolState.quoteTokenVault, this.poolState.baseTokenVault];
  }

  update(accountInfoMap) {
    const tokenAccountInfos = mapAddressToAccountInfos(accountInfoMap, this.getAccountsForUpdate());
    this.tokenAccounts = tokenAccountInfos.map(info => {
      const tokenAccount = optimist.deserializeAccount(info.data);
      if (!tokenAccount) throw new Error('Invalid token account');
      return tokenAccount;
    });
  }

  getQuote({
    sourceMint,
    amount
  }) {
    if (this.tokenAccounts.length === 0) {
      throw new Error('Unable to fetch accounts for specified tokens.');
    }

    let feePct = new Decimal__default["default"](this.poolState.fees.traderFee.numerator.toString()).div(this.poolState.fees.traderFee.denominator.toString()).add(new Decimal__default["default"](this.poolState.fees.ownerFee.numerator.toString()).div(this.poolState.fees.ownerFee.denominator.toString()));
    const outputIndex = this.tokenAccounts[0].mint.equals(sourceMint) ? 1 : 0;
    let result = this.calculator.exchange(tokenAccountsToJSBIs(this.tokenAccounts), JSBI__default["default"].BigInt(amount), outputIndex);
    return {
      notEnoughLiquidity: false,
      inAmount: amount,
      outAmount: JSBI__default["default"].toNumber(result.expectedOutputAmount),
      feeAmount: JSBI__default["default"].toNumber(result.fees),
      feeMint: sourceMint.toBase58(),
      feePct: feePct.toNumber(),
      priceImpactPct: result.priceImpact.toNumber()
    };
  }

  createSwapInstructions(swapParams) {
    if (this.poolState.isV2) {
      if (!this.poolState.curve) {
        throw new Error('Unable to fetch curve account.');
      }

      const curve = this.poolState.curve;
      return [createAldrinV2SwapInstruction({
        poolState: this.poolState,
        curve,
        ...swapParams
      })];
    }

    return [createAldrinSwapInstruction({
      poolState: this.poolState,
      ...swapParams
    })];
  }

  get reserveTokenMints() {
    return [this.poolState.baseTokenMint, this.poolState.quoteTokenMint];
  }

}
AldrinAmm.accountInfoToAldrinPoolState = accountInfoToAldrinPoolState;

const STEP_TOKEN_SWAP_PROGRAM_ID = /*#__PURE__*/new web3_js.PublicKey('SSwpMgqNDsyV7mAgN9ady4bDVu5ySjmmXejXvy2vLt1');
const PROGRAM_ID_TO_LABEL = /*#__PURE__*/new Map([['9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP', 'Orca'], [/*#__PURE__*/STEP_TOKEN_SWAP_PROGRAM_ID.toBase58(), 'Step'], ['PSwapMdSai8tjrEXcxFeQth87xC4rRsa4VA5mhGhXkP', 'Penguin'], ['SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr', 'Saros']]);

const TokenSwapLayout = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8('version'), /*#__PURE__*/bufferLayout.u8('isInitialized'), /*#__PURE__*/bufferLayout.u8('bumpSeed'), /*#__PURE__*/publicKey('tokenProgramId'), /*#__PURE__*/publicKey('tokenAccountA'), /*#__PURE__*/publicKey('tokenAccountB'), /*#__PURE__*/publicKey('tokenPool'), /*#__PURE__*/publicKey('mintA'), /*#__PURE__*/publicKey('mintB'), /*#__PURE__*/publicKey('feeAccount'), /*#__PURE__*/uint64('tradeFeeNumerator'), /*#__PURE__*/uint64('tradeFeeDenominator'), /*#__PURE__*/uint64('ownerTradeFeeNumerator'), /*#__PURE__*/uint64('ownerTradeFeeDenominator'), /*#__PURE__*/uint64('ownerWithdrawFeeNumerator'), /*#__PURE__*/uint64('ownerWithdrawFeeDenominator'), /*#__PURE__*/uint64('hostFeeNumerator'), /*#__PURE__*/uint64('hostFeeDenominator'), /*#__PURE__*/bufferLayout.u8('curveType'), /*#__PURE__*/bufferLayout.blob(32, 'curveParameters')]);
const StepTokenSwapLayout = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8('version'), /*#__PURE__*/bufferLayout.u8('isInitialized'), /*#__PURE__*/bufferLayout.u8('bumpSeed'), /*#__PURE__*/publicKey('tokenProgramId'), /*#__PURE__*/publicKey('tokenAccountA'), /*#__PURE__*/publicKey('tokenAccountB'), /*#__PURE__*/publicKey('tokenPool'), /*#__PURE__*/publicKey('mintA'), /*#__PURE__*/publicKey('mintB'), /*#__PURE__*/publicKey('feeAccount'), /*#__PURE__*/uint64('tradeFeeNumerator'), /*#__PURE__*/uint64('tradeFeeDenominator'), /*#__PURE__*/uint64('ownerTradeFeeNumerator'), /*#__PURE__*/uint64('ownerTradeFeeDenominator'), /*#__PURE__*/uint64('ownerWithdrawFeeNumerator'), /*#__PURE__*/uint64('ownerWithdrawFeeDenominator'), /*#__PURE__*/bufferLayout.u8('curveType'), /*#__PURE__*/bufferLayout.blob(32, 'curveParameters'), /*#__PURE__*/bufferLayout.u8('poolNonce')]);
function accountInfoToTokenSwapState(address, tokenSwapAccountInfo) {
  const programId = tokenSwapAccountInfo.owner; // The layout difference only affects fields we do not actively use

  const tokenSwapData = programId.equals(STEP_TOKEN_SWAP_PROGRAM_ID) ? StepTokenSwapLayout.decode(tokenSwapAccountInfo.data) : TokenSwapLayout.decode(tokenSwapAccountInfo.data);

  if (!tokenSwapData.isInitialized) {
    throw new Error(`Invalid token swap state`);
  }

  const [authority] = pubkey.findProgramAddressSync([address.toBuffer()], programId);
  const poolToken = new web3_js.PublicKey(tokenSwapData.tokenPool);
  const feeAccount = new web3_js.PublicKey(tokenSwapData.feeAccount);
  const tokenAccountA = new web3_js.PublicKey(tokenSwapData.tokenAccountA);
  const tokenAccountB = new web3_js.PublicKey(tokenSwapData.tokenAccountB);
  const mintA = new web3_js.PublicKey(tokenSwapData.mintA);
  const mintB = new web3_js.PublicKey(tokenSwapData.mintB);
  const tokenProgramId = new web3_js.PublicKey(tokenSwapData.tokenProgramId);
  const tradeFeeNumerator = tokenSwapData.tradeFeeNumerator;
  const tradeFeeDenominator = tokenSwapData.tradeFeeDenominator;
  const ownerTradeFeeNumerator = tokenSwapData.ownerTradeFeeNumerator;
  const ownerTradeFeeDenominator = tokenSwapData.ownerTradeFeeDenominator;
  const ownerWithdrawFeeNumerator = tokenSwapData.ownerWithdrawFeeNumerator;
  const ownerWithdrawFeeDenominator = tokenSwapData.ownerWithdrawFeeDenominator;
  const curveType = tokenSwapData.curveType;
  const curveParameters = tokenSwapData.curveParameters;
  const poolNonce = 'poolNonce' in tokenSwapData ? tokenSwapData.poolNonce : undefined;
  return {
    address,
    programId,
    tokenProgramId,
    poolToken,
    feeAccount,
    authority,
    tokenAccountA,
    tokenAccountB,
    mintA,
    mintB,
    tradeFeeNumerator,
    tradeFeeDenominator,
    ownerTradeFeeNumerator,
    ownerTradeFeeDenominator,
    ownerWithdrawFeeNumerator,
    ownerWithdrawFeeDenominator,
    curveType,
    curveParameters,
    poolNonce
  };
}

var CurveType;

(function (CurveType) {
  CurveType[CurveType["ConstantProduct"] = 0] = "ConstantProduct";
  CurveType[CurveType["Stable"] = 2] = "Stable";
})(CurveType || (CurveType = {})); // Abstract any SPL token swap based AMM


class SplTokenSwapAmm {
  constructor(address, swapStateAccountInfo, label) {
    this.label = void 0;
    this.id = void 0;
    this.shouldPrefetch = false;
    this.tokenSwapState = void 0;
    this.curveType = void 0;
    this.tokenAccounts = [];
    this.calculator = void 0;
    this.label = label;
    this.id = address.toBase58();
    this.tokenSwapState = accountInfoToTokenSwapState(address, swapStateAccountInfo);
    this.curveType = this.tokenSwapState.curveType;

    if (!(this.curveType in CurveType)) {
      throw new Error(`curveType ${this.tokenSwapState.curveType} is not supported`);
    }

    if (this.tokenSwapState.curveType === CurveType.ConstantProduct) {
      this.calculator = new math.TokenSwapConstantProduct(new math.Fraction(JSBI__default["default"].BigInt(this.tokenSwapState.tradeFeeNumerator.toString()), JSBI__default["default"].BigInt(this.tokenSwapState.tradeFeeDenominator.toString())), new math.Fraction(JSBI__default["default"].BigInt(this.tokenSwapState.ownerTradeFeeNumerator.toString()), JSBI__default["default"].BigInt(this.tokenSwapState.ownerTradeFeeDenominator.toString())));
    } else {
      this.calculator = new math.TokenSwapStable(JSBI__default["default"].BigInt(this.tokenSwapState.curveParameters[0]), new math.Fraction(JSBI__default["default"].BigInt(this.tokenSwapState.tradeFeeNumerator.toString()), JSBI__default["default"].BigInt(this.tokenSwapState.tradeFeeDenominator.toString())), new math.Fraction(JSBI__default["default"].BigInt(this.tokenSwapState.ownerTradeFeeNumerator.toString()), JSBI__default["default"].BigInt(this.tokenSwapState.ownerTradeFeeDenominator.toString())));
    }
  }

  getAccountsForUpdate() {
    return [this.tokenSwapState.tokenAccountA, this.tokenSwapState.tokenAccountB];
  }

  update(accountInfoMap) {
    const tokenAccountInfos = mapAddressToAccountInfos(accountInfoMap, this.getAccountsForUpdate());
    this.tokenAccounts = tokenAccountInfos.map(info => {
      const tokenAccount = optimist.deserializeAccount(info.data);

      if (!tokenAccount) {
        throw new Error('Invalid token account');
      }

      return tokenAccount;
    });
  }

  getQuote({
    sourceMint,
    amount
  }) {
    if (this.tokenAccounts.length === 0) {
      throw new Error('Unable to fetch accounts for specified tokens.');
    }

    let feePct = new Decimal__default["default"](this.tokenSwapState.tradeFeeNumerator.toString()).div(this.tokenSwapState.tradeFeeDenominator.toString()).add(new Decimal__default["default"](this.tokenSwapState.ownerTradeFeeNumerator.toString()).div(this.tokenSwapState.ownerTradeFeeDenominator.toString()));
    const outputIndex = this.tokenAccounts[0].mint.equals(sourceMint) ? 1 : 0;
    let result = this.calculator.exchange(tokenAccountsToJSBIs(this.tokenAccounts), JSBI__default["default"].BigInt(Math.floor(amount)), outputIndex);
    return {
      notEnoughLiquidity: false,
      inAmount: amount,
      outAmount: JSBI__default["default"].toNumber(result.expectedOutputAmount),
      feeAmount: JSBI__default["default"].toNumber(result.fees),
      feeMint: sourceMint.toBase58(),
      feePct: feePct.toNumber(),
      priceImpactPct: result.priceImpact.toNumber()
    };
  }

  createSwapInstructions(swapParams) {
    return [createTokenSwapInstruction({
      tokenSwapState: this.tokenSwapState,
      ...swapParams,
      isStep: this.tokenSwapState.programId.equals(STEP_TOKEN_SWAP_PROGRAM_ID)
    })];
  }

  get reserveTokenMints() {
    return [this.tokenSwapState.mintA, this.tokenSwapState.mintB];
  }

}

const FEE_DENOMINATOR$1 = /*#__PURE__*/Math.pow(10, 10);
const MercurialSwapLayout = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8('version'), /*#__PURE__*/bufferLayout.u8('isInitialized'), /*#__PURE__*/bufferLayout.u8('nonce'), /*#__PURE__*/uint64('amplificationCoefficient'), /*#__PURE__*/uint64('feeNumerator'), /*#__PURE__*/uint64('adminFeeNumerator'), /*#__PURE__*/bufferLayout.u32('tokenAccountsLength'), /*#__PURE__*/uint64('precisionFactor'), /*#__PURE__*/uint64('precisionMultiplierA'), /*#__PURE__*/uint64('precisionMultiplierB'), /*#__PURE__*/uint64('precisionMultiplierC'), /*#__PURE__*/uint64('precisionMultiplierD'), /*#__PURE__*/publicKey('tokenAccountA'), /*#__PURE__*/publicKey('tokenAccountB'), /*#__PURE__*/publicKey('tokenAccountC'), /*#__PURE__*/publicKey('tokenAccountD')]);
const accountInfoToMercurialSwapLayout = (address, accountInfo) => {
  const programId = accountInfo.owner;
  const decoded = MercurialSwapLayout.decode(accountInfo.data);
  const tokenAccountsLength = decoded.tokenAccountsLength;
  const [authority] = pubkey.findProgramAddressSync([address.toBuffer()], programId);
  const precisionMultipliers = [decoded.precisionMultiplierA.toNumber(), decoded.precisionMultiplierB.toNumber(), decoded.precisionMultiplierC.toNumber(), decoded.precisionMultiplierD.toNumber()].slice(0, tokenAccountsLength);
  const tokenAccounts = [decoded.tokenAccountA, decoded.tokenAccountB, decoded.tokenAccountC, decoded.tokenAccountD].slice(0, tokenAccountsLength);
  return {
    programId,
    authority,
    isInitialized: Boolean(decoded.isInitialized),
    nonce: decoded.nonce,
    ammId: address,
    amplificationCoefficient: decoded.amplificationCoefficient.toNumber(),
    feeNumerator: decoded.feeNumerator.toNumber(),
    tokenAccountsLength,
    precisionFactor: decoded.precisionFactor.toNumber(),
    precisionMultipliers,
    tokenAccounts
  };
};

class MercurialAmm {
  constructor(address, accountInfo, params) {
    this.params = void 0;
    this.id = void 0;
    this.label = 'Mercurial';
    this.shouldPrefetch = false;
    this.swapLayout = void 0;
    this.tokenAccounts = [];
    this.calculator = void 0;
    this.params = params;
    this.id = address.toBase58();
    this.swapLayout = accountInfoToMercurialSwapLayout(address, accountInfo);
    this.calculator = new math.Stable(JSBI__default["default"].BigInt(this.swapLayout.tokenAccountsLength), JSBI__default["default"].BigInt(this.swapLayout.amplificationCoefficient), this.swapLayout.precisionMultipliers.map(precisionMultiplier => JSBI__default["default"].BigInt(precisionMultiplier)), new math.Fraction(JSBI__default["default"].BigInt(this.swapLayout.feeNumerator), JSBI__default["default"].BigInt(FEE_DENOMINATOR$1)));
  }

  getAccountsForUpdate() {
    return this.swapLayout.tokenAccounts;
  }

  update(accountInfoMap) {
    let tokenAccountInfos = mapAddressToAccountInfos(accountInfoMap, this.getAccountsForUpdate());
    this.tokenAccounts = tokenAccountInfos.map(info => optimist.deserializeAccount(info.data)).filter(x => x !== null);
  }

  getQuote({
    sourceMint,
    destinationMint,
    amount
  }) {
    if (this.tokenAccounts.length === 0) {
      throw new Error('Unable to fetch accounts for specified tokens.');
    }

    const inputIndex = this.tokenAccounts.findIndex(tokenAccount => tokenAccount.mint.equals(sourceMint));
    const outputIndex = this.tokenAccounts.findIndex(tokenAccount => tokenAccount.mint.equals(destinationMint));
    const result = this.calculator.exchange(tokenAccountsToJSBIs(this.tokenAccounts), JSBI__default["default"].BigInt(amount), inputIndex, outputIndex);
    const feePct = this.swapLayout.feeNumerator / FEE_DENOMINATOR$1;
    return {
      notEnoughLiquidity: false,
      inAmount: amount,
      outAmount: JSBI__default["default"].toNumber(result.expectedOutputAmount),
      feeAmount: JSBI__default["default"].toNumber(result.fees),
      feeMint: destinationMint.toBase58(),
      feePct: feePct,
      priceImpactPct: result.priceImpact.toNumber()
    };
  }

  createSwapInstructions(swapParams) {
    return [createMercurialExchangeInstruction({
      swapLayout: this.swapLayout,
      ...swapParams
    })];
  }

  get reserveTokenMints() {
    return this.params.tokenMints.map(tokenMint => new web3_js.PublicKey(tokenMint));
  }

}
MercurialAmm.decodeSwapLayout = accountInfoToMercurialSwapLayout;

class CropperAmm {
  // Hardcoded because no where to query this
  static async getStateFromStateAccount(connection) {
    const accountInfo = await connection.getAccountInfo(CROPPER_STATE_ADDRESS);

    if (!accountInfo) {
      throw new Error('State account not found');
    }

    return stateAccountInfoToCropperState(accountInfo);
  }

  constructor(address, accountInfo, params) {
    this.params = void 0;
    this.id = void 0;
    this.label = 'Cropper';
    this.shouldPrefetch = false;
    this.poolState = void 0;
    this.tokenAccounts = [];
    this.calculator = void 0;
    this.feePct = void 0;
    this.params = params;
    this.id = address.toBase58();
    this.poolState = accountInfoToCropperPoolState(address, accountInfo);
    this.feePct = new Decimal__default["default"](this.params.fixedFeeNumerator).div(this.params.feeDenominator).add(new Decimal__default["default"](this.params.returnFeeNumerator).div(this.params.feeDenominator));
    this.params.tokenAFeeAccount = new web3_js.PublicKey(this.params.tokenAFeeAccount);
    this.params.tokenBFeeAccount = new web3_js.PublicKey(this.params.tokenBFeeAccount);
    this.calculator = new math.TokenSwapConstantProduct(new math.Fraction(JSBI__default["default"].BigInt(this.params.fixedFeeNumerator), JSBI__default["default"].BigInt(this.params.feeDenominator)), new math.Fraction(JSBI__default["default"].BigInt(this.params.returnFeeNumerator), JSBI__default["default"].BigInt(this.params.feeDenominator)));
  }

  getAccountsForUpdate() {
    return [this.poolState.tokenAAccount, this.poolState.tokenBAccount];
  }

  update(accountInfoMap) {
    const tokenAccountInfos = mapAddressToAccountInfos(accountInfoMap, this.getAccountsForUpdate());
    this.tokenAccounts = tokenAccountInfos.map(info => {
      const tokenAccount = optimist.deserializeAccount(info.data);

      if (!tokenAccount) {
        throw new Error('Invalid token account');
      }

      return tokenAccount;
    });
  }

  getQuote({
    sourceMint,
    amount
  }) {
    if (this.tokenAccounts.length === 0) {
      throw new Error('Unable to fetch accounts for specified tokens.');
    }

    const outputIndex = this.tokenAccounts[0].mint.equals(sourceMint) ? 1 : 0;
    const result = this.calculator.exchange(tokenAccountsToJSBIs(this.tokenAccounts), JSBI__default["default"].BigInt(amount), outputIndex);
    return {
      notEnoughLiquidity: false,
      inAmount: amount,
      outAmount: JSBI__default["default"].toNumber(result.expectedOutputAmount),
      feeAmount: JSBI__default["default"].toNumber(result.fees),
      feeMint: sourceMint.toBase58(),
      feePct: this.feePct.toNumber(),
      priceImpactPct: result.priceImpact.toNumber()
    };
  }

  createSwapInstructions(swapParams) {
    const feeAccount = swapParams.sourceMint.equals(this.poolState.mintA) ? this.params.tokenAFeeAccount : this.params.tokenBFeeAccount;
    return [createCropperSwapInstruction({
      poolState: this.poolState,
      feeAccount,
      ...swapParams
    })];
  }

  get reserveTokenMints() {
    return [this.poolState.mintA, this.poolState.mintB];
  }

}
CropperAmm.decodePoolState = accountInfoToCropperPoolState;

const accountInfoToCremaPoolState = (address, accountInfo) => {
  const programId = accountInfo.owner;
  const decoded = cremaSdk.TokenSwapAccountLayout.decode(accountInfo.data);
  const [authority] = pubkey.findProgramAddressSync([address.toBuffer()], programId);
  return {
    programId,
    authority,
    version: decoded.version,
    isInitialized: Boolean(decoded.isInitialized),
    nonce: decoded.nonce,
    ammId: address,
    tokenProgramId: decoded.tokenProgramId,
    tokenAAccount: decoded.swapTokenA,
    tokenBAccount: decoded.swapTokenB,
    ticksKey: decoded.ticksKey,
    mintA: decoded.tokenAMint,
    mintB: decoded.tokenBMint,
    fee: decoded.fee,
    currentSqrtPrice: decoded.currentSqrtPrice,
    currentLiquity: decoded.currentLiquity
  };
};

class CremaAmm {
  constructor(address, accountInfo) {
    this.id = void 0;
    this.label = 'Crema';
    this.shouldPrefetch = false;
    this.ticks = void 0;
    this.poolState = void 0;
    this.poolState = accountInfoToCremaPoolState(address, accountInfo);
    this.id = address.toBase58();
  }

  getAccountsForUpdate() {
    return [this.poolState.ammId, this.poolState.ticksKey];
  }

  update(accountInfoMap) {
    const [tokenSwapAccountInfo, ticksAccountInfo] = mapAddressToAccountInfos(accountInfoMap, this.getAccountsForUpdate());
    this.poolState = accountInfoToCremaPoolState(this.poolState.ammId, tokenSwapAccountInfo);
    const ticksInfo = cremaSdk.parseTicksAccount(this.poolState.ticksKey, ticksAccountInfo);
    if (!ticksInfo) throw new Error(`Ticks account invalid: ${this.poolState.ticksKey.toBase58()}`);
    this.ticks = ticksInfo.data.ticks;
  }

  getQuote({
    sourceMint,
    amount
  }) {
    if (!this.ticks) {
      throw new Error('Unable to fetch accounts for ticks.');
    } // Crema SDK doesn't support 0 amount input


    if (amount === 0) {
      return {
        notEnoughLiquidity: false,
        inAmount: amount,
        outAmount: 0,
        feeAmount: 0,
        feeMint: sourceMint.toBase58(),
        feePct: this.poolState.fee.toNumber(),
        priceImpactPct: 0
      };
    }

    const result = this.poolState.mintA.equals(sourceMint) ? this.preSwapA(new Decimal__default["default"](amount)) : this.preSwapB(new Decimal__default["default"](amount));

    if (result.revert) {
      throw new Error('Crema error: insufficient liquidity');
    }

    return {
      notEnoughLiquidity: false,
      inAmount: amount,
      outAmount: result.amountOut.toNumber(),
      feeAmount: result.feeUsed.toNumber(),
      feeMint: sourceMint.toBase58(),
      feePct: this.poolState.fee.toNumber(),
      priceImpactPct: result.impact.toNumber()
    };
  }

  preSwapA(amountIn) {
    if (!this.ticks) {
      throw new Error('Unable to fetch accounts for ticks.');
    }

    const result = cremaSdk.calculateSwapA2B(this.ticks, this.poolState.currentSqrtPrice, this.poolState.fee, this.poolState.currentLiquity, amountIn);
    const currentPriceA = this.poolState.currentSqrtPrice.pow(2);
    const transactionPriceA = result.amountOut.div(result.amountUsed);
    const impact = transactionPriceA.sub(currentPriceA).div(currentPriceA).abs();
    const revert = result.amountUsed.lessThan(amountIn);
    return { ...result,
      impact,
      revert
    };
  }

  preSwapB(amountIn) {
    if (!this.ticks) {
      throw new Error('Unable to fetch accounts for ticks.');
    }

    const result = cremaSdk.calculateSwapB2A(this.ticks, this.poolState.currentSqrtPrice, this.poolState.fee, this.poolState.currentLiquity, amountIn);
    const currentPriceA = this.poolState.currentSqrtPrice.pow(2);
    const currentPriceB = new Decimal__default["default"](1).div(currentPriceA);
    const transactionPriceB = result.amountOut.div(result.amountUsed);
    const impact = transactionPriceB.sub(currentPriceB).div(currentPriceB).abs();
    const revert = result.amountUsed.lessThan(amountIn);
    return { ...result,
      impact,
      revert
    };
  }

  createSwapInstructions(swapParams) {
    return [createCremaSwapInstruction({
      poolState: this.poolState,
      ...swapParams
    })];
  }

  get reserveTokenMints() {
    return [this.poolState.mintA, this.poolState.mintB];
  }

}

const SenchaSwapLayout = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.blob(8, 'discriminator'), /*#__PURE__*/publicKey('factory'), /*#__PURE__*/bufferLayout.u8('bump'), /*#__PURE__*/uint64('index'), /*#__PURE__*/publicKey('admin'), /*#__PURE__*/publicKey('token0Reserves'), /*#__PURE__*/publicKey('token0Mint'), /*#__PURE__*/publicKey('token0Fees'), /*#__PURE__*/publicKey('token1Reserves'), /*#__PURE__*/publicKey('token1Mint'), /*#__PURE__*/publicKey('token1Fees'), /*#__PURE__*/bufferLayout.u8('isPaused'), /*#__PURE__*/publicKey('poolMint'), /*#__PURE__*/uint64('tradeFeeKbps'), /*#__PURE__*/uint64('withdrawFeeKbps'), /*#__PURE__*/uint64('adminTradeFeeKbps'), /*#__PURE__*/uint64('adminWithdrawFeeKbps')]);
const accountInfoToSenchaPoolState = (address, accountInfo) => {
  const programId = accountInfo.owner;
  const decoded = SenchaSwapLayout.decode(accountInfo.data);
  return {
    programId,
    isPaused: Boolean(decoded.isPaused),
    bump: decoded.bump,
    ammId: address,
    token0Reserves: decoded.token0Reserves,
    token1Reserves: decoded.token1Reserves,
    token0Mint: decoded.token0Mint,
    token1Mint: decoded.token1Mint,
    token0Fees: decoded.token0Fees,
    token1Fees: decoded.token1Fees,
    poolMint: decoded.poolMint,
    tradeFeeKbps: decoded.tradeFeeKbps.toNumber()
  };
};

class SenchaAmm {
  constructor(address, accountInfo) {
    this.id = void 0;
    this.label = 'Sencha';
    this.shouldPrefetch = false;
    this.poolState = void 0;
    this.calculator = void 0;
    this.tokenAccounts = [];
    this.id = address.toBase58();
    this.poolState = accountInfoToSenchaPoolState(address, accountInfo);
    this.calculator = new math.TokenSwapConstantProduct(new math.Fraction(JSBI__default["default"].BigInt(this.poolState.tradeFeeKbps), JSBI__default["default"].BigInt(10000000)), new math.Fraction(math.ZERO, math.ZERO), false);
  }

  get isPaused() {
    return this.poolState.isPaused;
  }

  getAccountsForUpdate() {
    return [this.poolState.token0Reserves, this.poolState.token1Reserves];
  }

  update(accountInfoMap) {
    const tokenAccountInfos = mapAddressToAccountInfos(accountInfoMap, this.getAccountsForUpdate());
    this.tokenAccounts = tokenAccountInfos.map(info => {
      const tokenAccount = optimist.deserializeAccount(info.data);

      if (!tokenAccount) {
        throw new Error('Invalid token account');
      }

      return tokenAccount;
    });
  }

  getQuote({
    sourceMint,
    amount
  }) {
    if (this.tokenAccounts.length === 0) {
      throw new Error('Unable to fetch accounts for specified tokens.');
    }

    const outputIndex = this.tokenAccounts[0].mint.equals(sourceMint) ? 1 : 0;
    let result = this.calculator.exchange(tokenAccountsToJSBIs(this.tokenAccounts), JSBI__default["default"].BigInt(amount), outputIndex);
    let feePct = this.poolState.tradeFeeKbps / 10000000; // 100% kbps

    return {
      notEnoughLiquidity: false,
      inAmount: amount,
      outAmount: JSBI__default["default"].toNumber(result.expectedOutputAmount),
      feeAmount: JSBI__default["default"].toNumber(result.fees),
      feeMint: sourceMint.toBase58(),
      feePct,
      priceImpactPct: result.priceImpact.toNumber()
    };
  }

  createSwapInstructions(swapParams) {
    return [createSenchaSwapInstruction({
      poolState: this.poolState,
      ...swapParams
    })];
  }

  get reserveTokenMints() {
    return [this.poolState.token0Mint, this.poolState.token1Mint];
  }

}

const swapStateToPoolInfo = state => {
  return {
    amm: state.amm.toBase58(),
    configAccount: state.configAccount.toBase58(),
    feeAccount: state.feeAccount.toBase58(),
    pythAccount: state.pythAccount.toBase58(),
    pythPcAccount: state.pythPcAccount.toBase58(),
    poolCoinMint: state.poolCoinMint.toBase58(),
    poolCoinTokenAccount: state.poolCoinTokenAccount.toBase58(),
    poolMint: state.poolMint.toBase58(),
    poolPcTokenAccount: state.poolPcTokenAccount.toBase58(),
    poolPcMint: state.poolPcMint.toBase58(),
    // We don't use decimals at the moment, so default to 0, if we need to use it later, we can add it from API
    poolCoinDecimal: 0,
    poolPcDecimal: 0,
    poolMintDecimal: 0,
    pythBaseDecimal: 0
  };
};
const accountInfoLifinitySwapLayout = (address, accountInfo) => {
  const programId = accountInfo.owner;
  const decoded = lifinitySdk.LIFINITY_AMM_LAYOUT.decode(accountInfo.data);
  const [authority] = pubkey.findProgramAddressSync([address.toBuffer()], programId);
  return {
    programId,
    authority,
    amm: address,
    tokenAMint: decoded.tokenAMint,
    tokenBMint: decoded.tokenBMint,
    poolMint: decoded.poolMint,
    feeAccount: decoded.poolFeeAccount,
    pythAccount: decoded.pythAccount,
    pythPcAccount: decoded.pythPcAccount,
    configAccount: decoded.configAccount,
    poolCoinTokenAccount: decoded.tokenAAccount,
    poolCoinMint: decoded.tokenAMint,
    poolPcTokenAccount: decoded.tokenBAccount,
    poolPcMint: decoded.tokenBMint
  };
};

class LifinityAmm {
  constructor(address, ammAccountInfo) {
    this.ammAccountInfo = void 0;
    this.id = void 0;
    this.label = 'Lifinity';
    this.shouldPrefetch = false;
    this.swapState = void 0;
    this.poolInfo = void 0;
    this.accountInfos = [];
    this.ammAccountInfo = ammAccountInfo;
    this.id = address.toBase58();
    this.swapState = accountInfoLifinitySwapLayout(address, ammAccountInfo);
    this.poolInfo = swapStateToPoolInfo(this.swapState);
  }

  getAccountsForUpdate() {
    return [this.swapState.poolCoinTokenAccount, this.swapState.poolPcTokenAccount, this.swapState.configAccount, this.swapState.pythAccount, this.swapState.pythPcAccount];
  }

  update(accountInfoMap) {
    this.getAccountsForUpdate().forEach((publicKey, idx) => {
      const account = accountInfoMap.get(publicKey.toBase58());

      if (account) {
        this.accountInfos[idx] = {
          publicKey,
          account
        };
      }
    });
  }

  getQuote({
    sourceMint,
    amount
  }) {
    if (this.accountInfos.length !== this.getAccountsForUpdate().length) {
      throw new Error('Accounts not loaded');
    }

    const tradeDirection = this.swapState.poolCoinMint.equals(sourceMint) ? lifinitySdk.TradeDirection.AtoB : lifinitySdk.TradeDirection.BtoA;
    const {
      amm,
      pyth,
      pythPc,
      fees,
      coinBalance,
      pcBalance,
      config
    } = lifinitySdk.getParsedData([{
      publicKey: this.swapState.amm,
      account: this.ammAccountInfo
    }, ...this.accountInfos], this.poolInfo);

    if (!pyth.status.equals(1) || // pythPc can be undefined from the lifinity SDK
    pythPc && !pythPc.status.equals(1)) {
      throw new Error('Pyth accounts are outdated');
    }

    const amountIn = new Decimal__default["default"](amount);
    const result = lifinitySdk.getCurveAmount(amountIn, pyth.publishSlot.toNumber(), // Use pyth publish slot to not throw error
    amm, fees, coinBalance, pcBalance, config, pyth, pythPc, tradeDirection);
    return {
      notEnoughLiquidity: false,
      inAmount: amount,
      outAmount: result.amountSwapped.toNumber(),
      feeAmount: result.fee.toNumber(),
      feeMint: sourceMint.toBase58(),
      feePct: result.feePercent.toNumber(),
      priceImpactPct: result.priceImpact.toNumber()
    };
  }

  createSwapInstructions(swapParams) {
    return [createLifinitySwapInstruction({
      swapState: this.swapState,
      ...swapParams
    })];
  }

  get reserveTokenMints() {
    return [this.swapState.poolCoinMint, this.swapState.poolPcMint];
  }

}

const FEE_RATE_MUL_VALUE = 1000000;

function fromX64(num) {
  return new Decimal__default["default"](num.toString()).mul(Decimal__default["default"].pow(2, -64));
}

function parseWhirlpoolSafe(address, data) {
  const whirlpoolData = whirlpoolSdk.parseWhirlpool(data);
  if (!whirlpoolData) throw new Error(`Failed to parse whilpool ${address.toBase58()}`);
  return whirlpoolData;
}

class WhirlpoolAmm {
  constructor(address, whirlpoolAccountInfo) {
    this.address = void 0;
    this.id = void 0;
    this.label = 'Orca (Whirlpools)';
    this.shouldPrefetch = true;
    this.whirlpoolData = void 0;
    this.tickArrays = new Map();
    this.tickPks = void 0;
    this.oracle = void 0;
    this.feePct = void 0;
    this.address = address;
    this.id = address.toBase58();
    this.whirlpoolData = parseWhirlpoolSafe(address, whirlpoolAccountInfo.data);
    this.oracle = pubkey.findProgramAddressSync([Buffer.from('oracle'), address.toBuffer()], WHIRLPOOL_PROGRAM_ID)[0];
    this.feePct = new Decimal__default["default"](this.whirlpoolData.feeRate).div(FEE_RATE_MUL_VALUE).toNumber();
    this.tickPks = whirlpoolSdk.getTickArrayPks(address, this.whirlpoolData);
  }

  getAccountsForUpdate() {
    // The tickCurrentIndex is technically behind here, belonging to the last refresh
    return [this.address, ...this.tickPks];
  }

  update(accountInfoMap) {
    const whirlpoolAccountInfo = accountInfoMap.get(this.address.toBase58());
    if (!whirlpoolAccountInfo) throw new Error(`Missing ${this.address.toBase58()}`);
    this.whirlpoolData = parseWhirlpoolSafe(this.address, whirlpoolAccountInfo.data);
    this.tickPks = whirlpoolSdk.getTickArrayPks(this.address, this.whirlpoolData);
    this.tickArrays.clear();

    for (const tickArrayPk of this.tickPks) {
      const tickArrayAddress = tickArrayPk.toBase58();
      const tickArrayAccountInfo = accountInfoMap.get(tickArrayAddress);

      if (!tickArrayAccountInfo) {
        // This can happen if we reach an uninitialized tick, and it is likely to occur right now
        continue;
      }

      const tickArray = whirlpoolSdk.parseTickArray(tickArrayAccountInfo.data);
      if (!tickArray) throw new Error(`Could not parse tick array ${tickArrayAddress}`);
      this.tickArrays.set(tickArrayAddress, tickArray);
    }
  }

  getQuote({
    sourceMint,
    amount
  }) {
    const swapQuote = whirlpoolSdk.getSwapQuote({
      poolAddress: this.address,
      whirlpool: this.whirlpoolData,
      tickArrays: this.tickArrays,
      tokenMint: sourceMint,
      tokenAmount: new BN__default["default"](amount.toString()),
      isInput: true // slippageTolerance,

    });
    const inAmount = Number(swapQuote.amountIn.toString());
    const feeAmount = Math.floor(this.feePct * inAmount);
    const quotePrice = swapQuote.aToB ? new Decimal__default["default"](swapQuote.amountOut.toString()).div(swapQuote.amountIn.toString()) : new Decimal__default["default"](swapQuote.amountIn.toString()).div(swapQuote.amountOut.toString());
    const currentPrice = fromX64(this.whirlpoolData.sqrtPrice).pow(2);
    const priceImpactPct = currentPrice.minus(quotePrice).div(currentPrice).abs().toNumber();
    return {
      notEnoughLiquidity: false,
      inAmount,
      outAmount: Number(swapQuote.amountOut.toString()),
      feeAmount,
      feeMint: sourceMint.toBase58(),
      feePct: this.feePct,
      priceImpactPct: Number(priceImpactPct)
    };
  }

  createSwapInstructions(swapParams) {
    const aToB = swapParams.sourceMint.equals(this.whirlpoolData.tokenMintA);
    const [tickArray0, tickArray1, tickArray2] = whirlpoolSdk.getTickArrayPublicKeysForSwap(this.whirlpoolData.tickCurrentIndex, this.whirlpoolData.sqrtPrice, this.whirlpoolData.tickSpacing, this.address, this.tickArrays, WHIRLPOOL_PROGRAM_ID, aToB);
    return [createWhirlpoolSwapInstruction({
      additionalArgs: {
        aToB,
        whirlpool: this.address,
        tickArray0,
        tickArray1,
        tickArray2,
        oracle: this.oracle,
        ...this.whirlpoolData
      },
      ...swapParams
    })];
  }

  get reserveTokenMints() {
    return [this.whirlpoolData.tokenMintA, this.whirlpoolData.tokenMintB];
  }

}

// TODO: Move this to SDK rather than being maintained by us
class SolanaTickDataProvider {
  constructor(program, pool) {
    this.program = void 0;
    this.pool = void 0;
    this.bitmapCache = void 0;
    this.tickCache = void 0;
    this.accountsToFetch = {
      bitmaps: [],
      ticks: []
    };
    this.program = program;
    this.pool = pool;
    this.bitmapCache = new Map();
    this.tickCache = new Map();
  }
  /**
   * Caches ticks and bitmap accounts near the current price
   * @param tickCurrent The current pool tick
   * @param tickSpacing The pool tick spacing
   */


  async eagerLoadCache(tickCurrent, tickSpacing) {
    // fetch 10 bitmaps on each side in a single fetch. Find active ticks and read them together
    const compressed = JSBI__default["default"].toNumber(JSBI__default["default"].divide(JSBI__default["default"].BigInt(tickCurrent), JSBI__default["default"].BigInt(tickSpacing)));
    const {
      wordPos
    } = cykuraSdk.tickPosition(compressed);

    try {
      const bitmapsToFetch = [];
      const {
        wordPos: WORD_POS_MIN
      } = cykuraSdk.tickPosition(Math.floor(cykuraSdk.TickMath.MIN_TICK / tickSpacing));
      const {
        wordPos: WORD_POS_MAX
      } = cykuraSdk.tickPosition(Math.floor(cykuraSdk.TickMath.MAX_TICK / tickSpacing));
      const minWord = Math.max(wordPos - 10, WORD_POS_MIN);
      const maxWord = Math.min(wordPos + 10, WORD_POS_MAX);

      for (let i = minWord; i < maxWord; i++) {
        bitmapsToFetch.push(this.getBitmapAddressSync(i));
      }

      const fetchedBitmaps = await this.program.account.tickBitmapState.fetchMultiple(bitmapsToFetch);
      const tickAddresses = [];

      for (let i = 0; i < maxWord - minWord; i++) {
        var _fetchedBitmaps$i;

        const currentWordPos = i + minWord;
        const wordArray = (_fetchedBitmaps$i = fetchedBitmaps[i]) === null || _fetchedBitmaps$i === void 0 ? void 0 : _fetchedBitmaps$i.word;
        const word = wordArray ? cykuraSdk.generateBitmapWord(wordArray) : new anchor.BN(0);
        this.bitmapCache.set(currentWordPos, {
          address: bitmapsToFetch[i],
          word
        });

        if (word && !word.eqn(0)) {
          for (let j = 0; j < 256; j++) {
            if (word.shrn(j).and(new anchor.BN(1)).eqn(1)) {
              const tick = ((currentWordPos << 8) + j) * tickSpacing;
              const tickAddress = this.getTickAddressSync(tick);
              tickAddresses.push(tickAddress);
            }
          }
        }
      }

      const fetchedTicks = await this.program.account.tickState.fetchMultiple(tickAddresses);

      for (const i in tickAddresses) {
        const fetchedTick = fetchedTicks[i];
        if (!fetchedTick) continue;
        const {
          tick,
          liquidityNet
        } = fetchedTick;
        this.tickCache.set(tick, {
          address: tickAddresses[i],
          liquidityNet: JSBI__default["default"].BigInt(liquidityNet)
        });
      }
    } catch (error) {}
  }
  /**
   * Return accounts to cache and returns early if there is insufficient data
   * @param tickCurrent The current pool tick
   * @param tickSpacing The pool tick spacing
   */


  lazyLoadAccountsToCache(tickCurrent, tickSpacing) {
    // fetch 10 bitmaps on each side in a single fetch. Find active ticks and read them together
    const compressed = JSBI__default["default"].toNumber(JSBI__default["default"].divide(JSBI__default["default"].BigInt(tickCurrent), JSBI__default["default"].BigInt(tickSpacing)));
    const {
      wordPos
    } = cykuraSdk.tickPosition(compressed);
    const bitmapsToFetch = [];
    const bitmaps = [];
    const {
      wordPos: WORD_POS_MIN
    } = cykuraSdk.tickPosition(Math.floor(cykuraSdk.TickMath.MIN_TICK / tickSpacing));
    const {
      wordPos: WORD_POS_MAX
    } = cykuraSdk.tickPosition(Math.floor(cykuraSdk.TickMath.MAX_TICK / tickSpacing));
    const minWord = Math.max(wordPos - 10, WORD_POS_MIN);
    const maxWord = Math.min(wordPos + 10, WORD_POS_MAX);

    for (let i = minWord; i < maxWord; i++) {
      bitmapsToFetch.push(this.getBitmapAddressSync(i));
      const bitmap = this.bitmapCache.get(i);
      bitmaps.push(bitmap);
    }

    const tickAddressesToFetch = [];

    for (let i = 0; i < maxWord - minWord; i++) {
      var _bitmaps$i$word, _bitmaps$i;

      const currentWordPos = i + minWord; // We might not have the bitmap yet in the first iteration

      const word = (_bitmaps$i$word = (_bitmaps$i = bitmaps[i]) === null || _bitmaps$i === void 0 ? void 0 : _bitmaps$i.word) !== null && _bitmaps$i$word !== void 0 ? _bitmaps$i$word : new anchor.BN(0);
      this.bitmapCache.set(currentWordPos, {
        address: bitmapsToFetch[i],
        word
      });

      if (word && !word.eqn(0)) {
        for (let j = 0; j < 256; j++) {
          if (word.shrn(j).and(new anchor.BN(1)).eqn(1)) {
            const tick = ((currentWordPos << 8) + j) * tickSpacing;
            const tickAddress = this.getTickAddressSync(tick);
            tickAddressesToFetch.push(tickAddress);
          }
        }
      }
    }

    this.accountsToFetch = {
      bitmaps: bitmapsToFetch,
      ticks: tickAddressesToFetch
    };
    return [...bitmapsToFetch, ...tickAddressesToFetch];
  }

  getTick(tick) {
    let savedTick = this.tickCache.get(tick);

    if (!savedTick) {
      throw new Error('Tick not cached');
    }

    return {
      address: savedTick.address,
      liquidityNet: savedTick.liquidityNet
    };
  }

  async getTickAddress(tick) {
    return this.getTickAddressSync(tick);
  }

  getTickAddressSync(tick) {
    return pubkey.findProgramAddressSync([cykuraSdk.TICK_SEED, this.pool.token0.toBuffer(), this.pool.token1.toBuffer(), cykuraSdk.u32ToSeed(this.pool.fee), cykuraSdk.u32ToSeed(tick)], this.program.programId)[0];
  }

  async getBitmapAddress(wordPos) {
    return this.getBitmapAddressSync(wordPos);
  }

  getBitmapAddressSync(wordPos) {
    return pubkey.findProgramAddressSync([cykuraSdk.BITMAP_SEED, this.pool.token0.toBuffer(), this.pool.token1.toBuffer(), cykuraSdk.u32ToSeed(this.pool.fee), cykuraSdk.u16ToSeed(wordPos)], this.program.programId)[0];
  }
  /**
   * Fetches the cached bitmap for the word
   * @param wordPos
   */


  getBitmap(wordPos) {
    let savedBitmap = this.bitmapCache.get(wordPos);

    if (!savedBitmap) {
      throw new Error('Bitmap not cached');
    }

    return savedBitmap;
  }
  /**
   * Finds the next initialized tick in the given word. Fetched bitmaps are saved in a
   * cache for quicker lookups in future.
   * @param tick The current tick
   * @param lte Whether to look for a tick less than or equal to the current one, or a tick greater than or equal to
   * @param tickSpacing The tick spacing for the pool
   * @returns
   */


  nextInitializedTickWithinOneWord(tick, lte, tickSpacing) {
    let compressed = JSBI__default["default"].toNumber(JSBI__default["default"].divide(JSBI__default["default"].BigInt(tick), JSBI__default["default"].BigInt(tickSpacing)));

    if (tick < 0 && tick % tickSpacing !== 0) {
      compressed -= 1;
    }

    if (!lte) {
      compressed += 1;
    }

    const {
      wordPos,
      bitPos
    } = cykuraSdk.tickPosition(compressed);
    const cachedBitmap = this.getBitmap(wordPos);
    const {
      next: nextBit,
      initialized
    } = cykuraSdk.nextInitializedBit(cachedBitmap.word, bitPos, lte);
    const nextTick = cykuraSdk.buildTick(wordPos, nextBit, tickSpacing);
    return [nextTick, initialized, wordPos, bitPos, cachedBitmap.address];
  } // Change this to be a blind decoder rather than decode what we know


  updateCachedAccountInfos(accountInfoMap) {
    for (const bitmapAddress of this.accountsToFetch.bitmaps) {
      const bitmapAccountInfo = accountInfoMap.get(bitmapAddress.toBase58());

      if (bitmapAccountInfo) {
        const tickBitmapState = this.program.coder.accounts.decode('tickBitmapState', bitmapAccountInfo.data);
        this.bitmapCache.set(tickBitmapState.wordPos, {
          address: bitmapAddress,
          word: cykuraSdk.generateBitmapWord(tickBitmapState.word)
        });
      }
    }

    for (const tickAddress of this.accountsToFetch.ticks) {
      const tickStateAccountInfo = accountInfoMap.get(tickAddress.toBase58());

      if (tickStateAccountInfo) {
        const tickState = this.program.coder.accounts.decode('tickState', tickStateAccountInfo.data);
        this.tickCache.set(tickState.tick, {
          address: tickAddress,
          liquidityNet: JSBI__default["default"].BigInt(tickState.liquidityNet)
        });
      }
    }
  }

}

const FEE_DENOMINATOR = 1000000;
const provider = /*#__PURE__*/new anchor__namespace.Provider(null, null, {
  skipPreflight: false
});
const CYCLOS_CORE = /*#__PURE__*/new anchor__namespace.Program(cykuraSdk.IDL, CYKURA_PROGRAM_ID, provider);
class CykuraAmm {
  constructor(address, accountInfoOrPoolState) {
    this.address = void 0;
    this.label = 'Cykura';
    this.id = void 0;
    this.shouldPrefetch = true;
    this.poolState = void 0;
    this.pool = void 0;
    this.tickDataProvider = void 0;
    this.tokens = void 0;
    this.vaults = void 0;
    this.swapAccountMetas = [];
    this.feePct = void 0;
    this.address = address;
    this.id = address.toBase58();
    let poolState;

    if ('data' in accountInfoOrPoolState) {
      poolState = CYCLOS_CORE.coder.accounts.decode('poolState', accountInfoOrPoolState.data);
    } else {
      poolState = accountInfoOrPoolState;
    }

    this.poolState = poolState;
    const {
      token0,
      token1,
      fee,
      sqrtPriceX32,
      liquidity,
      tick
    } = this.poolState;
    this.tickDataProvider = new SolanaTickDataProvider(CYCLOS_CORE, {
      token0,
      token1,
      fee
    });
    this.tokens = {
      token0: new cykuraSdkCore.Token(101, token0, 0, '', ''),
      token1: new cykuraSdkCore.Token(101, token1, 0, '', '')
    };
    this.pool = new cykuraSdk.Pool(this.tokens.token0, this.tokens.token1, fee, JSBI__default["default"].BigInt(sqrtPriceX32.toString()), JSBI__default["default"].BigInt(liquidity.toString()), tick, this.tickDataProvider);
    this.vaults = {
      vault0: pubkey.findProgramAddressSync([this.address.toBuffer(), splToken.TOKEN_PROGRAM_ID.toBuffer(), token0.toBuffer()], splToken.ASSOCIATED_TOKEN_PROGRAM_ID)[0],
      vault1: pubkey.findProgramAddressSync([this.address.toBuffer(), splToken.TOKEN_PROGRAM_ID.toBuffer(), token1.toBuffer()], splToken.ASSOCIATED_TOKEN_PROGRAM_ID)[0]
    };
    this.feePct = this.poolState.fee / FEE_DENOMINATOR;
  }

  getAccountsForUpdate() {
    return [this.address, ...this.tickDataProvider.lazyLoadAccountsToCache(this.pool.tickCurrent, this.pool.tickSpacing)];
  }

  update(accountInfoMap) {
    const poolAccountInfo = accountInfoMap.get(this.address.toBase58());

    if (!poolAccountInfo) {
      throw new Error(`Could not find poolAccountInfo ${this.address.toBase58()}`);
    }

    this.poolState = CYCLOS_CORE.coder.accounts.decode('poolState', poolAccountInfo.data);
    const {
      fee,
      sqrtPriceX32,
      liquidity,
      tick
    } = this.poolState;
    this.pool = new cykuraSdk.Pool(this.tokens.token0, this.tokens.token1, fee, JSBI__default["default"].BigInt(sqrtPriceX32.toString()), JSBI__default["default"].BigInt(liquidity.toString()), tick, this.tickDataProvider);
    this.tickDataProvider.updateCachedAccountInfos(accountInfoMap);
  }

  getQuote({
    sourceMint,
    amount
  }) {
    const inputToken = sourceMint.equals(this.poolState.token0) ? this.tokens.token0 : this.tokens.token1;
    const [currentOutAmount, newPool, swapAccountMetas] = this.pool.getOutputAmount(cykuraSdkCore.CurrencyAmount.fromRawAmount(inputToken, JSBI__default["default"].BigInt(amount)));
    this.swapAccountMetas = swapAccountMetas;
    const priceImpactDecimal = math.toDecimal(JSBI__default["default"].subtract(this.pool.sqrtRatioX32, newPool.sqrtRatioX32)).div(this.pool.sqrtRatioX32.toString());
    return {
      notEnoughLiquidity: false,
      inAmount: amount,
      outAmount: JSBI__default["default"].toNumber(currentOutAmount.quotient),
      // Might not be spot on but avoids many conversions
      feeAmount: Math.floor(amount * this.poolState.fee / FEE_DENOMINATOR),
      feeMint: sourceMint.toBase58(),
      feePct: this.feePct,
      priceImpactPct: priceImpactDecimal.toNumber()
    };
  }

  createSwapInstructions(swapParams) {
    const [inputVault, outputVault] = swapParams.sourceMint.equals(this.poolState.token0) ? [this.vaults.vault0, this.vaults.vault1] : [this.vaults.vault1, this.vaults.vault0];
    const lastObservationState = pubkey.findProgramAddressSync([cykuraSdk.OBSERVATION_SEED, this.poolState.token0.toBuffer(), this.poolState.token1.toBuffer(), cykuraSdk.u32ToSeed(this.poolState.fee), cykuraSdk.u16ToSeed(this.poolState.observationIndex)], CYKURA_PROGRAM_ID)[0];
    const nextObservationState = pubkey.findProgramAddressSync([cykuraSdk.OBSERVATION_SEED, this.poolState.token0.toBuffer(), this.poolState.token1.toBuffer(), cykuraSdk.u32ToSeed(this.poolState.fee), cykuraSdk.u16ToSeed((this.poolState.observationIndex + 1) % this.poolState.observationCardinalityNext)], CYKURA_PROGRAM_ID)[0];
    const additionalArgs = {
      poolAddress: this.address,
      inputVault,
      outputVault,
      nextObservationState,
      lastObservationState,
      swapAccountMetas: this.swapAccountMetas
    };
    return [createCykuraSwapInstruction({ ...swapParams,
      additionalArgs
    })];
  }

  get reserveTokenMints() {
    return [this.poolState.token0, this.poolState.token1];
  }

}

function ammFactory(address, accountInfo, params) {
  const programId = new web3_js.PublicKey(accountInfo.owner);

  if (programId.equals(MAINNET_SERUM_DEX_PROGRAM) || programId.equals(DEVNET_SERUM_DEX_PROGRAM)) {
    const decoded = serum.Market.getLayout(programId).decode(accountInfo.data);

    if (!decoded.accountFlags.initialized || !decoded.accountFlags.market) {
      throw new Error('Invalid market');
    }

    const serumMarket = new serum.Market(decoded, 0, 0, {}, programId);
    return new SerumAmm(serumMarket);
  } else if (programId.equals(RAYDIUM_AMM_V4_PROGRAM_ID)) {
    const raydiumAmm = new RaydiumAmm(address, accountInfo, params);

    if (raydiumAmm.status === 1) {
      return raydiumAmm;
    }
  } else if (programId.equals(MERCURIAL_SWAP_PROGRAM_ID)) {
    return new MercurialAmm(address, accountInfo, params);
  } else if (programId.equals(stableswapSdk.SWAP_PROGRAM_ID)) {
    const stableSwap = stableswapSdk.StableSwap.loadWithData(address, accountInfo.data, pubkey.findProgramAddressSync([address.toBuffer()], stableswapSdk.SWAP_PROGRAM_ID)[0]);
    if (stableSwap.state.isPaused || !stableSwap.state.isInitialized) return;
    return new SaberAmm(stableSwap);
  } else if (programId.equals(CREMA_PROGRAM_ID)) {
    return new CremaAmm(address, accountInfo);
  } else if (programId.equals(ALDRIN_SWAP_PROGRAM_ID) || programId.equals(ALDRIN_SWAP_V2_PROGRAM_ID)) {
    return new AldrinAmm(address, accountInfo, params);
  } else if ([...PROGRAM_ID_TO_LABEL.keys()].includes(programId.toBase58())) {
    var _PROGRAM_ID_TO_LABEL$;

    const label = (_PROGRAM_ID_TO_LABEL$ = PROGRAM_ID_TO_LABEL.get(accountInfo.owner.toBase58())) !== null && _PROGRAM_ID_TO_LABEL$ !== void 0 ? _PROGRAM_ID_TO_LABEL$ : 'Unknown';
    return new SplTokenSwapAmm(address, accountInfo, label);
  } else if (programId.equals(CROPPER_PROGRAM_ID)) {
    return new CropperAmm(address, accountInfo, params);
  } else if (programId.equals(SENCHA_PROGRAM_ID)) {
    const senchaAmm = new SenchaAmm(address, accountInfo);
    if (senchaAmm.isPaused) return;
    return senchaAmm;
  } else if (programId.equals(LIFINITY_PROGRAM_ID)) {
    return new LifinityAmm(address, accountInfo);
  } else if (programId.equals(WHIRLPOOL_PROGRAM_ID)) {
    return new WhirlpoolAmm(address, accountInfo);
  } else if (programId.equals(CYKURA_PROGRAM_ID)) {
    return new CykuraAmm(address, accountInfo);
  } // Not supported by frontend


  return;
}

const fetchMarketCache = async url => {
  const marketsCache = await (await fetch__default["default"](url)).json();
  return marketsCache;
};
/** For testing purposes when api does not have the new pools */

async function fetchExtraKeyedAccountInfos(connection, pks) {
  const extraKeyedAccountInfos = (await chunkedGetMultipleAccountInfos(connection, pks.map(item => item.toBase58()))).map((item, index) => {
    const pubkey = pks[index];
    if (!item) throw new Error(`Failed to fetch pool ${pubkey.toBase58()}`);
    return {
      pubkey,
      ...item
    };
  });
  return extraKeyedAccountInfos;
}
async function getAllAmms(connection, marketsCache) {
  const marketCacheToAccountInfo = marketsCache => {
    return marketsCache.map(market => {
      const {
        data: [accountInfo, format],
        pubkey,
        ...rest
      } = market;
      return { ...rest,
        pubkey: new web3_js.PublicKey(pubkey),
        data: Buffer.from(accountInfo, format),
        owner: new web3_js.PublicKey(rest.owner)
      };
    });
  };

  const marketKeyedAccountInfos = marketCacheToAccountInfo(marketsCache); // this is used for development

  const extraKeys = [];

  if (extraKeys.length) {
    const extraKeyedAccountInfos = await fetchExtraKeyedAccountInfos(connection, extraKeys);
    marketKeyedAccountInfos.push(...extraKeyedAccountInfos);
  }

  const amms = marketKeyedAccountInfos.reduce((acc, keyedAccountInfo) => {
    const amm = ammFactory(keyedAccountInfo.pubkey, keyedAccountInfo, keyedAccountInfo.params); // Amm might not be recognized by the current version of the frontend
    // or be in a state we don't want

    if (amm) {
      acc.push(amm);
    }

    return acc;
  }, new Array());
  await prefetchAmms(amms.filter(amm => amm.shouldPrefetch), connection);
  amms.push(...getSaberWrappedDecimalsAmms());
  return amms;
}
function ammCrossProtocolPairs(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // Don't pair amm with same label
      if (arr[i].label !== arr[j].label) {
        callback(arr[i], arr[j]);
      }
    }
  }
}
function getTokenRouteSegments(amms) {
  const tokenRouteSegments = new Map();
  amms.forEach(amm => {
    const reserveTokenMintPermutations = getTwoPermutations(amm.reserveTokenMints);
    reserveTokenMintPermutations.forEach(([firstReserveMint, secondReserveMint]) => {
      addSegment(firstReserveMint.toBase58(), secondReserveMint.toBase58(), amm, tokenRouteSegments);
    });
  });
  return tokenRouteSegments;
}

function addSegment(inMint, outMint, amm, tokenRouteSegments) {
  let segments = tokenRouteSegments.get(inMint);

  if (!segments) {
    segments = new Map([[outMint, []]]);
    tokenRouteSegments.set(inMint, segments);
  }

  let amms = segments.get(outMint);

  if (!amms) {
    amms = [];
    segments.set(outMint, amms);
  }

  amms.push(amm);
}
/*
 * Construct TokenRouteSegment that is only used for the selected inputMint and outputMint
 * Example:
 *   SOL => USDC, the map would consist of
 *     - SOL => USDC => Amm[]
 *     - SOL => USDT => Amm[]
 *     - USDT => SOL => Amm[]
 */


function computeInputRouteSegments({
  inputMint,
  outputMint,
  tokenRouteSegments,
  intermediateTokens
}) {
  const inputRouteSegments = new Map();
  const inputSegment = tokenRouteSegments.get(inputMint);
  const outputSegment = tokenRouteSegments.get(outputMint);

  if (inputSegment && outputSegment) {
    const inputInnerMap = new Map();
    const outputInnerMap = new Map();

    for (let [outMint, amms] of inputSegment.entries()) {
      if (outMint === outputMint) {
        inputInnerMap.set(outMint, amms);
        outputInnerMap.set(inputMint, amms);
        continue;
      }

      if (intermediateTokens && !intermediateTokens.includes(outMint)) {
        continue;
      }

      const intersectionAmms = outputSegment.get(outMint);

      if (intersectionAmms) {
        inputRouteSegments.set(outMint, new Map([[inputMint, amms], [outputMint, intersectionAmms]]));
        inputInnerMap.set(outMint, amms);
        outputInnerMap.set(outMint, intersectionAmms);
      }
    }

    inputRouteSegments.set(inputMint, inputInnerMap);
    inputRouteSegments.set(outputMint, outputInnerMap);
  }

  return inputRouteSegments;
}
function computeRouteMap(tokenRouteSegments, intermediateTokens, onlyDirectRoutes) {
  const routeMap = new Map();

  for (const [tokenMint, firstLevelOutputs] of tokenRouteSegments) {
    const validOutputMints = new Set();

    for (const [firstLevelOutputMint, firstLevelAmms] of firstLevelOutputs) {
      var _tokenRouteSegments$g;

      validOutputMints.add(firstLevelOutputMint);

      if (onlyDirectRoutes) {
        continue;
      } // add the single level output as possible valid mints as well


      const secondLevelOutputs = (_tokenRouteSegments$g = tokenRouteSegments.get(firstLevelOutputMint)) !== null && _tokenRouteSegments$g !== void 0 ? _tokenRouteSegments$g : [];

      for (const [secondLevelOutputMint, secondLevelAmms] of secondLevelOutputs) {
        // Prevent output mint == input mint when routing
        if (secondLevelOutputMint === tokenMint) {
          continue;
        } // if intermediateTokens is specified and it doesnt include in the intermediateTokens, skip it


        if (intermediateTokens && !intermediateTokens.includes(firstLevelOutputMint)) {
          continue;
        }

        for (const firstLevelAmm of firstLevelAmms) {
          for (const secondLevelAmm of secondLevelAmms) {
            if (isValidRoute(firstLevelAmm, secondLevelAmm)) {
              validOutputMints.add(secondLevelOutputMint);
              break;
            }
          }
        }
      }
    }

    routeMap.set(tokenMint, Array.from(validOutputMints));
  }

  return routeMap;
}
function isSplitSetupRequired(marketInfos, {
  hasSerumOpenOrderInstruction
}) {
  let firstAmm;
  let secondAmm;

  if (marketInfos.length === 1) {
    const amm = marketInfos[0].amm;

    if (amm instanceof SplitTradeAmm) {
      firstAmm = amm.firstAmm;
      secondAmm = amm.secondAmm;
    } else {
      return {
        needSetup: false,
        needCleanup: false
      };
    }
  } else {
    [firstAmm, secondAmm] = marketInfos.map(marketInfo => marketInfo.amm);
  }

  if (firstAmm instanceof RaydiumAmm || secondAmm instanceof RaydiumAmm) {
    return {
      needSetup: true,
      needCleanup: true
    };
  } else if (firstAmm instanceof SerumAmm && secondAmm instanceof SerumAmm) {
    return {
      needSetup: true,
      needCleanup: true
    };
  } else if (hasSerumOpenOrderInstruction) {
    return {
      needSetup: true,
      needCleanup: false
    };
  }

  return {
    needSetup: false,
    needCleanup: false
  };
} // We cannot add platform fee to all possible routing due to transaction size limit

function isPlatformFeeSupported(amms) {
  if (amms.length > 1) {
    const [firstMarket, secondMarket] = amms;

    if (firstMarket instanceof RaydiumAmm && secondMarket instanceof RaydiumAmm) {
      return false;
    }
  }

  return true;
}
function getRouteInfoUniqueId(routeInfo) {
  return routeInfo.marketInfos.map(marketInfo => `${marketInfo.amm.id}-${marketInfo.inputMint}`).join('-');
}

const getEmptyInstruction = () => ({
  instructions: [],
  cleanupInstructions: [],
  signers: []
});

async function createAndCloseWSOLAccount({
  connection,
  amount,
  owner: {
    publicKey
  }
}) {
  const result = getEmptyInstruction();
  result.instructions = [];
  const toAccount = await splToken.Token.getAssociatedTokenAddress(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, WRAPPED_SOL_MINT, publicKey, true);
  const info = await connection.getAccountInfo(toAccount);

  if (info === null) {
    result.instructions.push(createAssociatedTokenAccountInstruction(publicKey, toAccount, publicKey, WRAPPED_SOL_MINT));
  } // Fund account and sync


  result.instructions.push(web3_js.SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: toAccount,
    lamports: amount
  }));
  result.instructions.push( // This is not exposed by the types, but indeed it exists
  splToken.Token.createSyncNativeInstruction(splToken.TOKEN_PROGRAM_ID, toAccount));
  result.cleanupInstructions = [splToken.Token.createCloseAccountInstruction(splToken.TOKEN_PROGRAM_ID, toAccount, publicKey, publicKey, [])];
  return {
    address: toAccount,
    ...result
  };
}
async function findOrCreateAssociatedAccountByMint({
  connection,
  payer,
  owner: {
    publicKey
  },
  mintAddress,
  unwrapSOL
}) {
  const mint = typeof mintAddress === 'string' ? new web3_js.PublicKey(mintAddress) : mintAddress;
  const toAccount = await splToken.Token.getAssociatedTokenAddress(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, mint, publicKey, true);
  const cleanupInstructions = [];
  const instructions = [];
  const info = await connection.getAccountInfo(toAccount);

  if (info === null) {
    instructions.push(createAssociatedTokenAccountInstruction(payer, toAccount, publicKey, mint));
  } else {
    const tokenAccountInfo = optimist.deserializeAccount(info.data);

    if (tokenAccountInfo && !tokenAccountInfo.owner.equals(publicKey)) {
      // What to do at the top level in UIs and SDK?
      throw new Error(`/!\ ATA ${toAccount.toBase58()} is not owned by ${publicKey.toBase58()}`);
    }
  } // We close it when wrapped SOL


  if (mint.equals(WRAPPED_SOL_MINT) && unwrapSOL) {
    cleanupInstructions.push(splToken.Token.createCloseAccountInstruction(splToken.TOKEN_PROGRAM_ID, toAccount, publicKey, publicKey, []));
  }

  return {
    address: toAccount,
    instructions: instructions,
    cleanupInstructions,
    signers: []
  };
} // 0.1.x @solana/spl-token does not have the version without the rent sysvar
// Source: https://github.com/solana-labs/solana-program-library/blob/dc5684445f0b42ba36a0157f06c561d967a7cb34/associated-token-account/program/src/instruction.rs#L16-L25

function createAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, programId = splToken.TOKEN_PROGRAM_ID, associatedTokenProgramId = splToken.ASSOCIATED_TOKEN_PROGRAM_ID) {
  const keys = [{
    pubkey: payer,
    isSigner: true,
    isWritable: true
  }, {
    pubkey: associatedToken,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: owner,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: mint,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: web3_js.SystemProgram.programId,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: programId,
    isSigner: false,
    isWritable: false
  }];
  return new web3_js.TransactionInstruction({
    keys,
    programId: associatedTokenProgramId,
    data: Buffer.alloc(0)
  });
}

async function routeToInstructions({
  user,
  tokenLedger,
  openOrdersAddresses,
  userSourceTokenAccountAddress,
  userIntermediaryTokenAccountAddress,
  userDestinationTokenAccountAddress,
  routeInfo,
  platformFee,
  quoteMintToReferrer
}) {
  const outAmountWithSlippage = routeInfo.outAmountWithSlippage;
  const inputAmount = routeInfo.inAmount;
  const legs = routeInfo.marketInfos.length;

  if (legs === 2 && !userIntermediaryTokenAccountAddress) {
    throw new Error('Missing intermediary token account');
  } // Drop referrer if space is scarce


  const effectiveQuoteMintToReferrer = platformFee && isSerumAndRaydium(routeInfo.marketInfos) ? undefined : quoteMintToReferrer;
  const userIntermediateTokenAccountAddresses = userIntermediaryTokenAccountAddress ? [userIntermediaryTokenAccountAddress] : [];
  const userTokenAccountAddresses = [userSourceTokenAccountAddress, ...userIntermediateTokenAccountAddresses, userDestinationTokenAccountAddress];
  const platformFeeSupported = isPlatformFeeSupported(routeInfo.marketInfos.map(mi => mi.amm));
  const instructions = [createSetTokenLedgerInstruction(tokenLedger, userTokenAccountAddresses[1])];

  for (const [index, marketInfo] of routeInfo.marketInfos.entries()) {
    const amm = marketInfo.amm;
    const legInputAmount = index === 0 ? inputAmount : null;
    const legOutAmountWithSlippage = index === legs - 1 ? outAmountWithSlippage : 0;
    const legPlatformFee = index === legs - 1 && platformFeeSupported ? platformFee : undefined;
    const [userSourceTokenAccount, userDestinationTokenAccount] = userTokenAccountAddresses.slice(index);
    instructions.push(...amm.createSwapInstructions({
      sourceMint: marketInfo.inputMint,
      destinationMint: marketInfo.outputMint,
      userSourceTokenAccount,
      userDestinationTokenAccount,
      userTransferAuthority: user.publicKey,
      inAmount: legInputAmount,
      minimumOutAmount: legOutAmountWithSlippage,
      tokenLedger,
      openOrdersAddress: openOrdersAddresses[index],
      platformFee: legPlatformFee,
      quoteMintToReferrer: effectiveQuoteMintToReferrer
    }));
  }

  const {
    signers,
    cleanupInstructions
  } = getEmptyInstruction();

  if (user.isKeyPair && user.signer) {
    signers.push(user.signer);
  }

  return {
    signers,
    cleanupInstructions,
    instructions
  };
}

const routeAtaInstructions = async ({
  connection,
  marketInfos,
  owner,
  unwrapSOL
}) => {
  const getUserIntermediateTokenAccountAddress = async () => {
    const userIntermediateTokenAccountAddress = marketInfos.length === 2 ? await findOrCreateAssociatedAccountByMint({
      connection,
      owner: owner,
      payer: owner.publicKey,
      mintAddress: marketInfos[0].outputMint,
      unwrapSOL
    }) : undefined;
    return userIntermediateTokenAccountAddress;
  };

  const getUserDestinationTokenAccountAddress = () => {
    return findOrCreateAssociatedAccountByMint({
      connection,
      owner: owner,
      payer: owner.publicKey,
      mintAddress: marketInfos.length === 2 ? marketInfos[1].outputMint : marketInfos[0].outputMint,
      unwrapSOL
    });
  };

  const [userIntermediaryTokenAccountResult, userDestinationTokenAccountResult] = await Promise.all([getUserIntermediateTokenAccountAddress(), getUserDestinationTokenAccountAddress()]);
  return {
    userIntermediaryTokenAccountResult,
    userDestinationTokenAccountResult
  };
};

async function getOrCreateOpenOrdersAddress(connection, user, serumMarket, marketToOpenOrdersAddress) {
  const result = getEmptyInstruction();
  const marketAddress = serumMarket.address.toString();

  if (marketToOpenOrdersAddress) {
    // check existing map
    let openOrdersAddress = marketToOpenOrdersAddress.get(marketAddress);

    if (openOrdersAddress) {
      let openOrdersAccountInfo = null; // We verify if it indeed exists, with low commitment to pick it up, to address the unsafe behaviour below

      openOrdersAccountInfo = await connection.getAccountInfo(openOrdersAddress, 'confirmed');

      if (openOrdersAccountInfo) {
        return { ...result,
          address: openOrdersAddress
        };
      }
    }
  }

  const [newOpenOrdersAddress, ix] = createOpenOrdersInstruction(serumMarket, user);
  const newOpenOrdersAddressInfo = await connection.getAccountInfo(newOpenOrdersAddress);

  if (!newOpenOrdersAddressInfo) {
    result.instructions = [ix];
  } // This is unsafe, since we don't know yet if it has succeeded


  marketToOpenOrdersAddress === null || marketToOpenOrdersAddress === void 0 ? void 0 : marketToOpenOrdersAddress.set(serumMarket.address.toString(), newOpenOrdersAddress);
  return { ...result,
    address: newOpenOrdersAddress
  };
}

const SERUM_OPEN_ACCOUNT_LAMPORTS = 23352760;
const OPEN_TOKEN_ACCOUNT_LAMPORTS = 2039280;

function sum(values) {
  return values.reduce((value, acc) => {
    acc += value;
    return acc;
  }, 0);
}

const calculateTransactionDepositAndFee = ({
  intermediate,
  destination,
  openOrders,
  hasWrapUnwrapSOL,
  feeCalculator
}) => {
  const openOrdersDeposits = openOrders.filter(ooi => ooi && ooi.instructions.length > 0).map(() => SERUM_OPEN_ACCOUNT_LAMPORTS);
  const ataDeposits = [intermediate, destination].filter(item => (item === null || item === void 0 ? void 0 : item.instructions.length) && item.cleanupInstructions.length === 0).map(() => OPEN_TOKEN_ACCOUNT_LAMPORTS);
  const signatureFee = ([...(openOrders === null || openOrders === void 0 ? void 0 : openOrders.map(oo => oo === null || oo === void 0 ? void 0 : oo.signers)), intermediate === null || intermediate === void 0 ? void 0 : intermediate.signers, destination.signers].filter(Boolean).flat().length + 1) * feeCalculator.lamportsPerSignature;
  const totalFeeAndDeposits = sum([signatureFee, ...openOrdersDeposits, ...ataDeposits]); // We need to account for temporary wrapped SOL token accounts as intermediary or output

  const minimumSOLForTransaction = sum([signatureFee, ...openOrdersDeposits, ...[intermediate, destination].filter(item => {
    var _item$instructions$le;

    return ((_item$instructions$le = item === null || item === void 0 ? void 0 : item.instructions.length) !== null && _item$instructions$le !== void 0 ? _item$instructions$le : 0) > 0;
  }).map(() => OPEN_TOKEN_ACCOUNT_LAMPORTS), hasWrapUnwrapSOL ? OPEN_TOKEN_ACCOUNT_LAMPORTS : 0]);
  return {
    signatureFee,
    openOrdersDeposits,
    ataDeposits,
    totalFeeAndDeposits,
    minimumSOLForTransaction
  };
};

const getDepositAndFeeFromInstructions = async ({
  connection,
  owner,
  inputMint,
  marketInfos,
  feeCalculator,
  serumOpenOrdersPromise,
  wrapUnwrapSOL: unwrapSOL
}) => {
  const hasWrapUnwrapSOL = inputMint.equals(WRAPPED_SOL_MINT) && unwrapSOL;
  const openOrdersInstructionsPromise = Promise.all(marketInfos.map(async marketInfo => {
    const amm = marketInfo.amm;

    if (amm instanceof SerumAmm || amm instanceof SplitTradeAmm) {
      if (!amm.market) return;
      return await getOrCreateOpenOrdersAddress(connection, owner.publicKey, amm.market, await serumOpenOrdersPromise);
    }

    return;
  }));
  const promise = routeAtaInstructions({
    connection,
    marketInfos,
    owner,
    unwrapSOL
  }).then(({
    userIntermediaryTokenAccountResult,
    userDestinationTokenAccountResult
  }) => {
    return openOrdersInstructionsPromise.then(openOrdersInstructions => ({
      intermediate: userIntermediaryTokenAccountResult,
      destination: userDestinationTokenAccountResult,
      openOrders: openOrdersInstructions
    }));
  });
  const instructionResult = await promise;
  return calculateTransactionDepositAndFee({ ...instructionResult,
    hasWrapUnwrapSOL,
    feeCalculator
  });
};
const NO_PLATFORM_FEE = {
  feeBps: 0,
  feeAccounts: /*#__PURE__*/new Map()
};
async function getPlatformFeeAccounts(connection, feeAccountOwner) {
  const tokenAccounts = (await connection.getTokenAccountsByOwner(feeAccountOwner, {
    programId: splToken.TOKEN_PROGRAM_ID
  })).value;
  const feeAccounts = tokenAccounts.reduce((acc, tokenAccount) => {
    const deserializedtokenAccount = optimist.deserializeAccount(tokenAccount.account.data);

    if (deserializedtokenAccount) {
      acc.set(deserializedtokenAccount.mint.toBase58(), tokenAccount.pubkey);
    }

    return acc;
  }, new Map());
  return feeAccounts;
}

class TransactionBuilder {
  constructor(connection, feePayer, owner) {
    this.connection = void 0;
    this.feePayer = void 0;
    this.instructions = void 0;
    this.owner = void 0;
    this.connection = connection;
    this.feePayer = feePayer;
    this.instructions = [];
    this.owner = owner;
  }

  addInstruction(instruction) {
    this.instructions.push(instruction);
    return this;
  }

  async build(recentBlockHash) {
    if (!recentBlockHash) {
      recentBlockHash = (await this.connection.getLatestBlockhash('confirmed')).blockhash;
    }

    const txFields = {
      recentBlockhash: recentBlockHash,
      feePayer: this.feePayer
    };
    let instructions = [];
    let cleanupInstructions = [];
    let signers = [];
    this.instructions.forEach(curr => {
      instructions = instructions.concat(curr.instructions);
      cleanupInstructions = cleanupInstructions.concat(curr.cleanupInstructions);
      signers = signers.concat(curr.signers);
    });
    const transaction = new web3_js.Transaction(txFields);
    instructions.concat(cleanupInstructions).forEach(ix => transaction.add(ix));
    transaction.feePayer = this.feePayer;
    return {
      transaction: transaction,
      signers: signers,
      execute: this.owner.isKeyPair ? () => {
        return this.connection.sendTransaction(transaction, signers);
      } : async () => {
        throw new Error('Please use a Keypair for the owner parameter to enable the execute function');
      }
    };
  }

}

class Owner {
  constructor(owner) {
    this._owner = void 0;
    this._owner = owner;
  }

  get publicKey() {
    if (Owner.isKeyPair(this._owner)) {
      return this._owner.publicKey;
    }

    return this._owner;
  }

  get signer() {
    return Owner.isKeyPair(this._owner) ? this._owner : undefined;
  }

  get isKeyPair() {
    return Owner.isKeyPair(this._owner);
  }

  get isPublicKey() {
    return Owner.isPublicKey(this._owner);
  }

  static isKeyPair(owner) {
    return owner.secretKey !== undefined;
  }

  static isPublicKey(owner) {
    return !Owner.isKeyPair(owner);
  }

}

const wait = time => new Promise(resolve => setTimeout(resolve, time));

function diffTokenBalance(accountKeyIndex, meta) {
  var _meta$postTokenBalanc, _meta$postTokenBalanc2, _meta$preTokenBalance, _meta$preTokenBalance2;

  const postBalance = (_meta$postTokenBalanc = meta.postTokenBalances) === null || _meta$postTokenBalanc === void 0 ? void 0 : (_meta$postTokenBalanc2 = _meta$postTokenBalanc.find(postTokenBalance => postTokenBalance.accountIndex === accountKeyIndex)) === null || _meta$postTokenBalanc2 === void 0 ? void 0 : _meta$postTokenBalanc2.uiTokenAmount.amount;
  const preBalance = (_meta$preTokenBalance = meta.preTokenBalances) === null || _meta$preTokenBalance === void 0 ? void 0 : (_meta$preTokenBalance2 = _meta$preTokenBalance.find(preTokenBalance => preTokenBalance.accountIndex === accountKeyIndex)) === null || _meta$preTokenBalance2 === void 0 ? void 0 : _meta$preTokenBalance2.uiTokenAmount.amount; // When token account is created it isn't present in preBalance

  if (!postBalance) return;
  return Math.abs(parseInt(postBalance) - (preBalance !== undefined ? parseInt(preBalance) : 0));
}

function extractTokenBalanceChangeFromTransaction(meta, transaction, tokenAccountAddress) {
  const message = transaction.message;

  if (!meta) {
    return;
  }

  const index = message.accountKeys.findIndex(p => p.equals(tokenAccountAddress));
  return diffTokenBalance(index, meta);
}
function extractSOLChangeFromTransaction(meta, transaction, user) {
  let accountKeyIndex = transaction.message.accountKeys.findIndex(p => p.equals(user));

  if (accountKeyIndex !== -1) {
    return Math.abs(meta.postBalances[accountKeyIndex] - meta.preBalances[accountKeyIndex]);
  } // if 0 is returned it will throw error in the caller function


  return 0;
}
function getTokenBalanceChangesFromTransactionResponse({
  txid,
  inputMint,
  outputMint,
  user,
  sourceAddress,
  destinationAddress,
  transactionResponse,
  hasWrappedSOL
}) {
  let sourceTokenBalanceChange;
  let destinationTokenBalanceChange;

  if (transactionResponse) {
    let {
      meta,
      transaction
    } = transactionResponse;

    if (meta) {
      sourceTokenBalanceChange = inputMint.equals(WRAPPED_SOL_MINT) && !hasWrappedSOL ? extractSOLChangeFromTransaction(meta, transaction, user) : extractTokenBalanceChangeFromTransaction(meta, transaction, sourceAddress);
      destinationTokenBalanceChange = outputMint.equals(WRAPPED_SOL_MINT) && !hasWrappedSOL ? extractSOLChangeFromTransaction(meta, transaction, user) : extractTokenBalanceChangeFromTransaction(meta, transaction, destinationAddress);
    }
  }

  if (!(sourceTokenBalanceChange && destinationTokenBalanceChange)) {
    throw new optimist.TransactionError('Cannot find source or destination token account balance change', txid, JUPITER_ERRORS['BalancesNotExtractedProperly'].code);
  }

  return [sourceTokenBalanceChange, destinationTokenBalanceChange];
}
function getUnixTs() {
  return new Date().getTime();
}
const SEND_OPTIONS = {
  skipPreflight: true,
  maxRetries: 2
};
/**
 * awaits confirmation while resending the transaction periodically
 *
 * Our RPC node settings
 * solana_send_leader_count: 8
 * solana_send_retry_ms: 15000
 **/

async function transactionSenderAndConfirmationWaiter(connection, signedTransaction, timeout = 120000, // 2 minutes, (sendInterval * sendRetries) = 80_000 + extra wait 40_000
pollInterval = 500, sendInterval = 2000, sendRetries = 40) {
  const rawTransaction = signedTransaction.serialize();
  const txid = await connection.sendRawTransaction(rawTransaction, SEND_OPTIONS);
  const start = getUnixTs();
  let lastSendTimestamp = getUnixTs();
  let retries = 0;

  while (getUnixTs() - start < timeout) {
    const timestamp = getUnixTs();

    if (retries < sendRetries && timestamp - lastSendTimestamp > sendInterval) {
      lastSendTimestamp = timestamp;
      retries += 1;
      await connection.sendRawTransaction(rawTransaction, SEND_OPTIONS);
    }

    const response = await Promise.any([connection.getTransaction(txid, {
      commitment: 'confirmed'
    }), wait(5000)]);
    if (response) return {
      txid,
      transactionResponse: response
    };
    await wait(pollInterval);
  }

  return {
    txid,
    transactionResponse: null
  };
}
function getSignature(transaction) {
  const signature = transaction.signature;

  if (!signature) {
    throw new Error('Transaction has no signature');
  }

  return bytes.bs58.encode(signature);
}

// The package is missing cjs. Apache License 2.0
// https://github.com/ehmicky/fast-cartesian/blob/619a497dffd978fb4a09a83f2ca047915579774f/src/main.js
// Validate 'array()' input
const validateInput = function (arrays) {
  if (!Array.isArray(arrays)) {
    throw new TypeError('Argument must be an array of arrays');
  }

  arrays.forEach(validateArray);
  validateDimensions(arrays);
  validateCombinations(arrays);
};

const validateArray = function (array) {
  if (!Array.isArray(array)) {
    throw new TypeError(`Argument must be an array: ${array}`);
  }
}; // Maximum number of nested `for` loops. In my machine, it's 604 but it is
// engine-specific so we use a safe number. Above the limit, a max call stack
// error is thrown by the engine.


const validateDimensions = function ({
  length
}) {
  if (length >= MAX_DIMENSIONS) {
    throw new TypeError(`Too many arrays (${length}): please use the 'big-cartesian' library instead of 'fast-cartesian'`);
  }
};

const MAX_DIMENSIONS = 1e2; // Max array size in JavaScript. This is the limit of the final return value.

const validateCombinations = function (arrays) {
  const size = arrays.reduce(multiplySize, 1);

  if (size >= MAX_SIZE) {
    const sizeStr = Number.isFinite(size) ? ` (${size.toExponential(0)})` : '';
    throw new TypeError(`Too many combinations${sizeStr}: please use the 'big-cartesian' library instead of 'fast-cartesian'`);
  }
};

const multiplySize = function (size, array) {
  return size * array.length;
};

const MAX_SIZE = 4294967296; // 2 ** 32 = 4,294,967,296
// Does a cartesian product on several arrays.
// Returns an array with the results.
// Optimized to be the fastest implementation in JavaScript.

function fastCartesian(arrays) {
  validateInput(arrays);

  if (arrays.length === 0) {
    return [];
  }

  const loopFunc = getLoopFunc(arrays.length);
  const result = [];
  loopFunc(arrays, result);
  return result;
}

const getLoopFunc = function (length) {
  const cachedLoopFunc = cache[length];

  if (cachedLoopFunc !== undefined) {
    return cachedLoopFunc;
  }

  const loopFunc = mGetLoopFunc(length); // eslint-disable-next-line fp/no-mutation

  cache[length] = loopFunc;
  return loopFunc;
};

const cache = {}; // Create a function with `new Function()` that does:
//   function(arrays, results) {
//     for (const value0 of arrays[0]) {
//       for (const value1 of arrays[1]) {
//         // and so on
//         results.push([value0, value1])
//       }
//     }
//   }

const mGetLoopFunc = function (length) {
  const indexes = Array.from({
    length
  }, getIndex);
  const start = indexes.map(index => `for (const value${index} of arrays[${index}]) {`).join('\n');
  const middle = indexes.map(index => `value${index}`).join(', ');
  const end = '}\n'.repeat(length); // eslint-disable-next-line no-new-func

  return new Function('arrays', 'result', `${start}\nresult.push([${middle}])\n${end}`);
};

const getIndex = function (value, index) {
  return String(index);
};

const PLATFORM_FEE_DENOMINATOR = 10000;
async function fetchAccountInfos(connection, routes) {
  const accountInfosMap = new Map();
  const accountsToFetchSet = new Set();
  const ammMap = new Map();
  routes.forEach(innerMap => {
    innerMap.forEach(amms => {
      amms.forEach(amm => {
        ammMap.set(amm.id, amm);
        amm.getAccountsForUpdate().forEach(account => {
          // Only add accountInfos that is not in the Map
          accountsToFetchSet.add(account.toBase58());
        });
      });
    });
  });
  const accountsToFetch = Array.from(accountsToFetchSet);

  if (accountsToFetch.length > 0) {
    const accountInfos = await chunkedGetMultipleAccountInfos(connection, accountsToFetch);
    accountInfos.forEach((item, index) => {
      const publicKey = accountsToFetch[index];

      if (item) {
        accountInfosMap.set(publicKey, item);
      }
    });
    ammMap.forEach(amm => {
      amm.update(accountInfosMap);
    });
  }
}

function getInputOutputId({
  inputMint,
  outputMint
}) {
  return `${inputMint}-${outputMint}`;
}

function getQuoteId({
  ammId,
  amount
}) {
  return `${ammId}-${amount}`;
}

function getQuoteMap({
  amms,
  inputMint,
  outputMint,
  amount,
  filterTopNResult = 3
}) {
  const quotes = amms.map(amm => {
    try {
      const quote = amm.getQuote({
        amount,
        sourceMint: new web3_js.PublicKey(inputMint),
        destinationMint: new web3_js.PublicKey(outputMint)
      });
      return {
        quote,
        id: amm.id
      };
    } catch (e) {

      return undefined;
    }
  }).sort((a, b) => ((b === null || b === void 0 ? void 0 : b.quote.outAmount) || 0) - ((a === null || a === void 0 ? void 0 : a.quote.outAmount) || 0)) // only choose top 3 rates
  .filter((item, idx) => item && item.quote.inAmount && idx < filterTopNResult);
  return new Map(quotes.map(item => [getQuoteId({
    ammId: item.id,
    amount
  }), item.quote]));
} // Change this to support N-1 level of hops


const MAX_LEVEL = 2;
function processInputRouteSegmentToRoutesInfos({
  inputRouteSegment,
  inputMint,
  outputMint,
  amount,
  getDepositAndFeeForRoute,
  platformFeeBps,
  slippage,
  filterTopNResult,
  onlyDirectRoutes
}) {
  const inputMintString = inputMint.toBase58();
  const outputMintString = outputMint.toBase58(); // (InputMint-OutputMint) map to (AmmId-InputAmount) map to Quote from the amm with the inputAmount
  // this is used to prevent calculation being repeated later on.

  const tradeIdQuoteMap = new Map();
  const inputMintInnerMap = inputRouteSegment.get(inputMintString);
  const routes = [];

  if (!inputMintInnerMap) {
    throw new Error('No routes found for the input and output mints');
  }

  const maxLevel = onlyDirectRoutes ? 0 : MAX_LEVEL;
  /*
   * It get the rate of all single pair that is linked to the inputMint
   * Example: SOL => USDC, will have direct pair, while
   *          SOL => USDT, USDT => SOL will have a hop
   *
   * So we go through each of the hop and get the top 3 rate and drop others
   * This will eventually reduce the needs to compute bad rate for the same pair
   *
   * The loop below is doing for the inputMint, while the one after is doing for the outputMint.
   */

  const walkTheTree = ({
    inputMint,
    level = 0,
    walked = [inputMint]
  }) => {
    const inputMintInnerMap = inputRouteSegment.get(inputMint);

    if (inputMintInnerMap) {
      inputMintInnerMap.forEach((amms, outMint) => {
        const tradeId = getInputOutputId({
          inputMint,
          outputMint: outMint
        });
        const quoteMap = getQuoteMap({
          amms,
          inputMint,
          outputMint: outMint,
          amount,
          filterTopNResult
        });
        const filteredAmms = amms.filter(amm => quoteMap.has(getQuoteId({
          ammId: amm.id,
          amount
        }))); // add split trade in when outputMint match and it's not direct only routes

        if (outMint === outputMintString && !onlyDirectRoutes) {
          ammCrossProtocolPairs(filteredAmms.slice(), (firstAmm, secondAmm) => {
            const splitTradeAmm = SplitTradeAmm.create(firstAmm, secondAmm);

            if (splitTradeAmm) {
              filteredAmms.push(splitTradeAmm);
            }
          });
        }

        inputMintInnerMap.set(outMint, filteredAmms);
        tradeIdQuoteMap.set(tradeId, quoteMap); // keep looping if not walked and not reached max level

        if (outMint !== outputMintString && quoteMap.size && !walked.includes(outMint) && level < maxLevel - 1) {
          walkTheTree({
            inputMint: outMint,
            amount: quoteMap.values().next().value.outAmount,
            level: level + 1,
            walked: walked.concat(outMint)
          });
        } else if (outMint === outputMintString) {
          // if output reached, we add the route
          const mints = walked.concat(outMint);

          const _mints = mints.map(i => new web3_js.PublicKey(i));

          const ammsArr = mints.reduce((amms, _, index) => {
            if (index < mints.length - 1) {
              var _inputRouteSegment$ge;

              amms.push((_inputRouteSegment$ge = inputRouteSegment.get(mints[index])) === null || _inputRouteSegment$ge === void 0 ? void 0 : _inputRouteSegment$ge.get(mints[index + 1]));
            }

            return amms;
          }, []);
          const permutations = fastCartesian(ammsArr);
          permutations.forEach(item => {
            if (item.length === 1 || isValidRoute(item[0], item[1])) {
              routes.push({
                amms: item,
                mints: _mints
              });
            }
          });
        }
      });
    }
  };

  walkTheTree({
    inputMint: inputMintString,
    amount: amount
  });
  const routesInfo = routes.map(route => {
    const {
      amms,
      mints
    } = route; // Chain all amms

    let marketInfos = [];
    let intermediateAmount = amount;
    let outAmountWithSlippage = amount;
    const platformFeeSupported = isPlatformFeeSupported(amms);
    const tokenMints = mints;
    const legs = amms.length;

    for (const [i, amm] of amms.entries()) {
      try {
        var _tradeIdQuoteMap$get;

        const sourceMint = tokenMints[i];
        const destinationMint = tokenMints[i + 1];
        const tradeId = getInputOutputId({
          inputMint: sourceMint.toBase58(),
          outputMint: destinationMint.toBase58()
        });
        const cacheQuote = (_tradeIdQuoteMap$get = tradeIdQuoteMap.get(tradeId)) === null || _tradeIdQuoteMap$get === void 0 ? void 0 : _tradeIdQuoteMap$get.get(getQuoteId({
          ammId: amm.id,
          amount: intermediateAmount
        }));
        const quote = cacheQuote || amm.getQuote({
          sourceMint,
          destinationMint,
          amount: intermediateAmount
        }); // Platform fee applicable only on last leg

        const platformFee = legs - 1 === i && platformFeeSupported ? {
          amount: Math.floor(quote.outAmount * platformFeeBps / PLATFORM_FEE_DENOMINATOR),
          mint: destinationMint.toBase58(),
          pct: platformFeeBps / 100
        } : {
          amount: 0,
          mint: destinationMint.toBase58(),
          pct: 0
        };
        const outAmountAfterFees = Math.max(0, quote.outAmount - platformFee.amount);
        const legOutAmountWithSlippage = Math.round(outAmountAfterFees * (1 - slippage / 100));
        marketInfos.push({
          amm,
          inputMint: sourceMint,
          outputMint: destinationMint,
          notEnoughLiquidity: quote.notEnoughLiquidity,
          minInAmount: quote.minInAmount,
          minOutAmount: quote.minOutAmount,
          inAmount: quote.inAmount,
          outAmount: outAmountAfterFees,
          priceImpactPct: quote.priceImpactPct,
          lpFee: {
            amount: quote.feeAmount,
            mint: quote.feeMint,
            pct: quote.feePct
          },
          platformFee
        });
        intermediateAmount = outAmountAfterFees;
        outAmountWithSlippage = legOutAmountWithSlippage;
      } catch (e) {

        return undefined;
      }
    }

    return {
      marketInfos,
      getDepositAndFee: () => getDepositAndFeeForRoute({
        marketInfos
      }),
      inAmount: marketInfos[0].inAmount,
      outAmount: intermediateAmount,
      outAmountWithSlippage: outAmountWithSlippage,
      priceImpactPct: 1 - marketInfos.reduce((priceFactor, marketInfo) => {
        priceFactor *= 1 - marketInfo.priceImpactPct;
        return priceFactor;
      }, 1)
    };
  }).filter(item => item !== undefined).sort((a, b) => b.outAmount - a.outAmount); // sort based on which one have better output

  return routesInfo;
}

async function validateTransactionResponse({
  txid,
  transactionResponse
}) {
  var _transactionResponse$;

  if (!transactionResponse) {
    throw new optimist.TransactionError('Transaction was not confirmed', txid);
  }

  if (transactionResponse !== null && transactionResponse !== void 0 && (_transactionResponse$ = transactionResponse.meta) !== null && _transactionResponse$ !== void 0 && _transactionResponse$.err) {
    let {
      message,
      code
    } = await optimist.parseErrorForTransaction(transactionResponse);

    switch (code) {
      case 6000:
        {
          message = 'Slippage error';
        }
    }

    throw new optimist.TransactionError(message || '', txid, code);
  }

  return {
    txid,
    transactionResponse
  };
}

async function getTopTokens() {
  const topTokens = await (await fetch__default["default"]('https://cache.jup.ag/top-tokens')).json();
  return new Set(topTokens.filter((_, idx) => idx < 60));
}

class Jupiter {
  /* promise because we can choose not to await it when we dont need it */
  constructor(_connection, cluster, tokenRouteSegments, feeCalculator, platformFeeAndAccounts,
  /** Referrer account to collect Serum referrer fees for each given quote mint, the referrer fee is 20% of the Serum protocol fee */
  quoteMintToReferrer,
  /** route cache duration in ms */
  routeCacheDuration = 0,
  /** When set to true (default) native SOL is wrapped and wSOL unwrapped in each swap, otherwise it assumes wSOL is funded when it exists */
  _wrapUnwrapSOL2 = true,
  /** A token ledger which can be used to track volume as it can be made unique per platform, also alleviates write locks on a single token ledger account */
  _tokenLedger, intermediateTokens,
  /** Perform a getProgramAccounts on user's serum open orders. Recomended to turn off if RPC is slow to perform a gPA */
  shouldLoadSerumOpenOrders) {
    this.connection = void 0;
    this.cluster = void 0;
    this.tokenRouteSegments = void 0;
    this.feeCalculator = void 0;
    this.platformFeeAndAccounts = void 0;
    this.quoteMintToReferrer = void 0;
    this.routeCacheDuration = void 0;
    this.wrapUnwrapSOL = void 0;
    this.tokenLedger = void 0;
    this.intermediateTokens = void 0;
    this.shouldLoadSerumOpenOrders = void 0;
    this.serumOpenOrdersPromise = undefined;
    this.user = void 0;
    this.routeCache = new Map();

    this.getDepositAndFees = async ({
      marketInfos,
      userPublicKey,

      /**
       * We can use Jupiter.findSerumOpenOrdersForOwner for this, if we want to reuse existing user serum open orders.
       */
      serumOpenOrdersPromise = Promise.resolve(new Map())
    }) => {
      return getDepositAndFeeFromInstructions({
        connection: this.connection,
        feeCalculator: this.feeCalculator,
        inputMint: marketInfos[0].inputMint,
        marketInfos,
        serumOpenOrdersPromise,
        owner: new Owner(userPublicKey),
        wrapUnwrapSOL: this.wrapUnwrapSOL
      });
    };

    this.getDepositAndFeesForUser = ({
      marketInfos
    }) => {
      if (this.user && this.serumOpenOrdersPromise) {
        const user = new Owner(this.user);
        return this.getDepositAndFees({
          marketInfos,
          userPublicKey: user.publicKey,
          serumOpenOrdersPromise: this.serumOpenOrdersPromise
        });
      }

      return Promise.resolve(undefined);
    };

    this.exchange = async ({
      routeInfo,
      userPublicKey,
      feeAccount,
      wrapUnwrapSOL,
      tokenLedger
    }) => {
      var _instructions$interme;

      const {
        connection,
        serumOpenOrdersPromise
      } = this;
      const user = userPublicKey || this.user;

      if (!user) {
        throw new Error('user not found');
      }

      const owner = new Owner(user);
      const lastMarketInfoIndex = routeInfo.marketInfos.length - 1;
      const inputMint = routeInfo.marketInfos[0].inputMint;
      const outputMint = routeInfo.marketInfos[lastMarketInfoIndex].outputMint;

      const _wrapUnwrapSOL = wrapUnwrapSOL !== null && wrapUnwrapSOL !== void 0 ? wrapUnwrapSOL : this.wrapUnwrapSOL;

      const [sourceInstruction, ataInstructions, openOrdersInstructions] = await Promise.all([inputMint.equals(WRAPPED_SOL_MINT) && _wrapUnwrapSOL ? createAndCloseWSOLAccount({
        connection,
        owner,
        amount: routeInfo.inAmount
      }) : splToken.Token.getAssociatedTokenAddress(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, inputMint, owner.publicKey, true).then(address => ({ ...getEmptyInstruction(),
        address
      })), routeAtaInstructions({
        connection,
        marketInfos: routeInfo.marketInfos,
        owner,
        unwrapSOL: _wrapUnwrapSOL
      }), Promise.all(routeInfo.marketInfos.map(async ({
        amm
      }) => {
        if (amm instanceof SerumAmm || amm instanceof SplitTradeAmm) {
          if (!amm.market) return;
          return await getOrCreateOpenOrdersAddress(connection, owner.publicKey, amm.market, await serumOpenOrdersPromise);
        }

        return;
      }))]);
      const instructions = {
        intermediate: ataInstructions.userIntermediaryTokenAccountResult,
        destination: ataInstructions.userDestinationTokenAccountResult,
        openOrders: openOrdersInstructions
      };
      const hasOpenOrders = instructions.openOrders.filter(Boolean).length > 0; // Construct platform fee

      feeAccount = feeAccount || this.platformFeeAndAccounts.feeAccounts.get(outputMint.toBase58());
      const platformFee = feeAccount ? {
        feeBps: this.platformFeeAndAccounts.feeBps || Math.floor(routeInfo.marketInfos[lastMarketInfoIndex].platformFee.pct * 100),
        feeAccount
      } : undefined;
      const preparedInstructions = await routeToInstructions({
        user: owner,
        tokenLedger: tokenLedger || this.tokenLedger,
        openOrdersAddresses: instructions.openOrders.map(oo => oo === null || oo === void 0 ? void 0 : oo.address),
        userSourceTokenAccountAddress: sourceInstruction.address,
        userIntermediaryTokenAccountAddress: (_instructions$interme = instructions.intermediate) === null || _instructions$interme === void 0 ? void 0 : _instructions$interme.address,
        userDestinationTokenAccountAddress: instructions.destination.address,
        routeInfo,
        platformFee,
        quoteMintToReferrer: this.quoteMintToReferrer
      });
      const {
        needCleanup,
        needSetup
      } = isSplitSetupRequired(routeInfo.marketInfos, {
        hasSerumOpenOrderInstruction: hasOpenOrders
      });
      const setupTransactionBuilder = new TransactionBuilder(connection, owner.publicKey, owner);
      const transactionBuilder = new TransactionBuilder(connection, owner.publicKey, owner);
      const cleanupTransactionBuilder = new TransactionBuilder(connection, owner.publicKey, owner);
      const ixs = [instructions.intermediate, sourceInstruction, // if source address the same as destination address, then we don't need to setup or cleanup twice, mainly SOL-SOL
      !instructions.destination.address.equals(sourceInstruction.address) && instructions.destination];

      if (needSetup) {
        if (hasOpenOrders) {
          instructions.openOrders.forEach(openOrders => {
            if (openOrders) {
              setupTransactionBuilder.addInstruction(openOrders);
            }
          });
        }

        ixs.forEach(instruction => {
          if (instruction) {
            // we cannot put cleanup here because we cannot do cleanup in setupTransaction
            setupTransactionBuilder.addInstruction({ ...instruction,
              cleanupInstructions: []
            });

            if (instruction.cleanupInstructions.length) {
              const cleanupIx = { ...getEmptyInstruction(),
                cleanupInstructions: instruction.cleanupInstructions
              };

              if (needCleanup) {
                cleanupTransactionBuilder.addInstruction(cleanupIx);
              } else {
                transactionBuilder.addInstruction(cleanupIx);
              }
            }
          }
        });
      } else {
        if (hasOpenOrders) {
          instructions.openOrders.forEach(openOrders => {
            if (openOrders) {
              transactionBuilder.addInstruction(openOrders);
            }
          });
        }

        ixs.forEach(instruction => {
          if (instruction) {
            transactionBuilder.addInstruction(instruction);
          }
        });
      }

      transactionBuilder.addInstruction(preparedInstructions);
      const recentBlockHash = (await this.connection.getLatestBlockhash('confirmed')).blockhash;
      const {
        transaction: setupTransaction
      } = await setupTransactionBuilder.build(recentBlockHash);
      const {
        transaction
      } = await transactionBuilder.build(recentBlockHash);
      const {
        transaction: cleanupTransaction
      } = await cleanupTransactionBuilder.build(recentBlockHash);
      const [setupTransactionObject, swapTransactionObject, cleanupTransactionObject] = [setupTransaction.instructions.length ? setupTransaction : undefined, transaction, cleanupTransaction.instructions.length ? cleanupTransaction : undefined];
      const setupInstructions = instructions;
      return {
        transactions: {
          setupTransaction: setupTransactionObject,
          swapTransaction: swapTransactionObject,
          cleanupTransaction: cleanupTransactionObject
        },
        execute: ({
          wallet,
          onTransaction
        } = {}) => this.executeInternal({
          wallet,
          onTransaction,
          inputMint,
          outputMint,
          sourceInstruction,
          setupInstructions,
          setupTransaction: setupTransactionObject,
          swapTransaction: swapTransactionObject,
          cleanupTransaction: cleanupTransactionObject,
          wrapUnwrapSOL: _wrapUnwrapSOL,
          owner
        })
      };
    };

    this.connection = _connection;
    this.cluster = cluster;
    this.tokenRouteSegments = tokenRouteSegments;
    this.feeCalculator = feeCalculator;
    this.platformFeeAndAccounts = platformFeeAndAccounts;
    this.quoteMintToReferrer = quoteMintToReferrer;
    this.routeCacheDuration = routeCacheDuration;
    this.wrapUnwrapSOL = _wrapUnwrapSOL2;
    this.tokenLedger = _tokenLedger;
    this.intermediateTokens = intermediateTokens;
    this.shouldLoadSerumOpenOrders = shouldLoadSerumOpenOrders;
  }
  /**
   * load performs the necessary async scaffolding of the Jupiter object
   */


  static async load({
    connection,
    cluster,
    user,
    platformFeeAndAccounts = NO_PLATFORM_FEE,
    quoteMintToReferrer,
    routeCacheDuration = 0,
    wrapUnwrapSOL = true,
    // @internal,
    marketUrl,
    restrictIntermediateTokens = false,
    tokenLedger = TOKEN_LEDGER,
    shouldLoadSerumOpenOrders = true
  }) {
    const [tokenRouteSegments, {
      value: {
        feeCalculator
      }
    }, _quoteMintToReferrer, intermediateTokens] = await Promise.all([Jupiter.fetchTokenRouteSegments(connection, cluster, marketUrl), connection.getRecentBlockhashAndContext('processed'), quoteMintToReferrer !== null && quoteMintToReferrer !== void 0 ? quoteMintToReferrer : getPlatformFeeAccounts(connection, new web3_js.PublicKey(JUPITER_WALLET)), restrictIntermediateTokens ? Jupiter.getIntermediateTokens() : undefined]);
    const jupiter = new Jupiter(connection, cluster, tokenRouteSegments, feeCalculator, platformFeeAndAccounts, _quoteMintToReferrer, routeCacheDuration, wrapUnwrapSOL, tokenLedger, intermediateTokens, shouldLoadSerumOpenOrders);
    if (user) jupiter.setUserPublicKey(user);
    return jupiter;
  }

  getAccountToAmmMap() {
    const accountToAmmMap = new Map();
    this.tokenRouteSegments.forEach(tokenRouteSegment => {
      Array.from(tokenRouteSegment.values()).forEach(marketInfos => {
        marketInfos.forEach(amm => {
          amm.getAccountsForUpdate().forEach(account => {
            accountToAmmMap.set(account.toBase58(), amm);
          });
        });
      });
    });
    return accountToAmmMap;
  }

  async computeRoutes({
    inputMint,
    outputMint,
    inputAmount,
    slippage,
    feeBps = 0,
    forceFetch,
    onlyDirectRoutes,
    filterTopNResult
  }) {
    const inputMintString = inputMint.toBase58();
    const outputMintString = outputMint.toBase58(); // Platform fee can only be applied when fee account exists

    const platformFeeBps = feeBps || (this.platformFeeAndAccounts.feeAccounts.get(outputMintString) ? this.platformFeeAndAccounts.feeBps : 0);
    const now = new Date().getTime(); // do sort so that it's always the same order for the same inputMint and outputMint and vice versa

    const inputMintAndOutputMint = [inputMintString, outputMintString].sort((a, b) => a.localeCompare(b)).join('');
    const routeCache = this.routeCache.get(inputMintAndOutputMint);
    const inputRouteSegment = computeInputRouteSegments({
      inputMint: inputMintString,
      outputMint: outputMintString,
      tokenRouteSegments: this.tokenRouteSegments,
      intermediateTokens: this.intermediateTokens
    });
    let shouldBustCache = false; // special -1 condition to not fetch

    if (this.routeCacheDuration === -1) {
      shouldBustCache = false;
    } else if (this.routeCacheDuration === 0) {
      shouldBustCache = true;
    } else {
      if (routeCache) {
        const {
          fetchTimestamp
        } = routeCache;

        if (now - fetchTimestamp > this.routeCacheDuration) {
          shouldBustCache = true;
        }
      } else {
        shouldBustCache = true;
      }
    }

    if (forceFetch || shouldBustCache) {
      await fetchAccountInfos(this.connection, inputRouteSegment);
      this.routeCache.set(inputMintAndOutputMint, {
        fetchTimestamp: new Date().getTime()
      });
    }

    try {
      const routesInfos = processInputRouteSegmentToRoutesInfos({
        inputRouteSegment: inputRouteSegment,
        inputMint: inputMint,
        outputMint: outputMint,
        amount: inputAmount,
        getDepositAndFeeForRoute: this.getDepositAndFeesForUser,
        onlyDirectRoutes,
        slippage,
        platformFeeBps,
        filterTopNResult
      });
      return {
        routesInfos,

        /* indicate if the result is fetched or get from cache */
        cached: !(forceFetch || shouldBustCache)
      };
    } catch (e) {
      throw e;
    } finally {
      // clear cache if it is expired
      this.routeCache.forEach(({
        fetchTimestamp
      }, key) => {
        if (fetchTimestamp - now > this.routeCacheDuration) {
          this.routeCache.delete(key);
        }
      });
    }
  }

  setUserPublicKey(userPublicKey) {
    this.user = userPublicKey;
    const owner = new Owner(this.user);
    this.serumOpenOrdersPromise = this.shouldLoadSerumOpenOrders ? Jupiter.findSerumOpenOrdersForOwner({
      connection: this.connection,
      cluster: this.cluster,
      userPublicKey: owner.publicKey
    }) : Promise.resolve(new Map());
  }
  /**
   * The token route segments contains all the routes and the market meta information.
   */


  static async fetchTokenRouteSegments(connection, cluster, marketUrl) {
    const marketCaches = await fetchMarketCache(marketUrl || MARKETS_URL[cluster]);
    const amms = await getAllAmms(connection, marketCaches);
    const tokenRouteSegments = getTokenRouteSegments(amms);
    return tokenRouteSegments;
  }
  /**
   * This generate a routeMap which represents every possible output token mint for a given input token mint.
   * For example, we have SOL to USDC and this pairs have many routings like
   * SOL => USDT
   * USDT => USDC
   * SOL => USDC
   *
   * From here we know that we can have 2 different routing of SOL => USDC.
   * We do single level routing map but for all coins which result in the route map below:
   * SOL => USDT, USDC
   * USDT => SOL
   * USDC => SOL, USDT
   *
   * From this route map we can map out all possible route from one to another by checking the intersection.
   */


  getRouteMap(onlyDirectRoutes) {
    return computeRouteMap(this.tokenRouteSegments, this.intermediateTokens, onlyDirectRoutes);
  }
  /**
   * Query existing open order account, this query is slow.
   * We suggest to fetch this in the background.
   */


  /** sign, send and await confirmation for an exchange */
  async executeInternal({
    wallet,
    onTransaction,
    inputMint,
    outputMint,
    sourceInstruction,
    setupInstructions,
    setupTransaction,
    swapTransaction,
    cleanupTransaction,
    owner,
    wrapUnwrapSOL
  }) {
    try {
      const transactions = [setupTransaction, swapTransaction, cleanupTransaction].filter(tx => tx !== undefined);
      const totalTxs = transactions.length;

      if (owner.signer) {
        const signer = owner.signer;
        transactions.forEach(transaction => {
          transaction.sign(signer);
        });
      } else {
        if (!wallet) {
          throw new Error('Signer wallet not found');
        }

        if (totalTxs > 1) {
          await wallet.signAllTransactions(transactions);
        } else {
          await wallet.signTransaction(transactions[0]);
        }
      }

      if (setupTransaction) {
        onTransaction === null || onTransaction === void 0 ? void 0 : onTransaction(getSignature(setupTransaction), totalTxs, 'SETUP');
        await validateTransactionResponse(await transactionSenderAndConfirmationWaiter(this.connection, setupTransaction));
      }

      onTransaction === null || onTransaction === void 0 ? void 0 : onTransaction(getSignature(swapTransaction), totalTxs, 'SWAP');
      let swapError;
      let swapResult = undefined;

      try {
        const {
          txid,
          transactionResponse
        } = await validateTransactionResponse(await transactionSenderAndConfirmationWaiter(this.connection, swapTransaction));
        const [sourceTokenBalanceChange, destinationTokenBalanceChange] = getTokenBalanceChangesFromTransactionResponse({
          txid,
          inputMint,
          outputMint,
          user: owner.publicKey,
          sourceAddress: sourceInstruction.address,
          destinationAddress: setupInstructions.destination.address,
          transactionResponse,
          hasWrappedSOL: Boolean(cleanupTransaction) || !wrapUnwrapSOL
        });
        swapResult = {
          txid,
          inputAddress: sourceInstruction.address,
          outputAddress: setupInstructions.destination.address,
          inputAmount: sourceTokenBalanceChange,
          outputAmount: destinationTokenBalanceChange
        };
      } catch (e) {
        swapError = e;
      } finally {
        if (cleanupTransaction) {
          onTransaction === null || onTransaction === void 0 ? void 0 : onTransaction(getSignature(cleanupTransaction), totalTxs, 'CLEANUP'); // wait for confirmation but swallow error to conserve behaviour

          await transactionSenderAndConfirmationWaiter(this.connection, cleanupTransaction);
        }
      }

      if (swapError || !swapResult) {
        throw swapError || new Error('Swap failed');
      } // return must be after `finally` clause to ensure we wait what we done in the `finally`


      return swapResult;
    } catch (error) {
      return {
        error: error
      };
    } finally {
      this.routeCache.clear();
    }
  }

  static async getIntermediateTokens() {
    const intermediateTokensSet = await getTopTokens();

    for (const swapProtocolToken of SWAP_PROTOCOL_TOKENS) {
      intermediateTokensSet.add(swapProtocolToken);
    }

    const saberDecimalAmms = getSaberWrappedDecimalsAmms();
    saberDecimalAmms.forEach(item => {
      intermediateTokensSet.add(item.wrappedToken.addDecimals.mint.toBase58());
    });
    return Array.from(intermediateTokensSet);
  }

}

Jupiter.findSerumOpenOrdersForOwner = async ({
  userPublicKey,
  cluster,
  connection
}) => {
  const newMarketToOpenOrdersAddress = new Map();

  if (userPublicKey) {
    const programId = cluster === 'mainnet-beta' ? MAINNET_SERUM_DEX_PROGRAM : DEVNET_SERUM_DEX_PROGRAM;
    const allOpenOrders = await serum.OpenOrders.findForOwner(connection, userPublicKey, programId);
    allOpenOrders.forEach(openOrders => {
      newMarketToOpenOrdersAddress.set(openOrders.market.toString(), openOrders.address);
    });
  }

  return newMarketToOpenOrdersAddress;
};

Jupiter.createInitializeTokenLedgerInstruction = createInitializeTokenLedgerInstruction;

exports.ALDRIN_SWAP_PROGRAM_ID = ALDRIN_SWAP_PROGRAM_ID;
exports.ALDRIN_SWAP_V2_PROGRAM_ID = ALDRIN_SWAP_V2_PROGRAM_ID;
exports.AldrinAmm = AldrinAmm;
exports.CREMA_PROGRAM_ID = CREMA_PROGRAM_ID;
exports.CROPPER_PROGRAM_ID = CROPPER_PROGRAM_ID;
exports.CYKURA_FACTORY_STATE_ADDRESS = CYKURA_FACTORY_STATE_ADDRESS;
exports.CYKURA_PROGRAM_ID = CYKURA_PROGRAM_ID;
exports.CropperAmm = CropperAmm;
exports.CykuraAmm = CykuraAmm;
exports.DEVNET_SERUM_DEX_PROGRAM = DEVNET_SERUM_DEX_PROGRAM;
exports.IS_DEV = IS_DEV;
exports.JUPITER_ERRORS = JUPITER_ERRORS;
exports.JUPITER_WALLET = JUPITER_WALLET;
exports.Jupiter = Jupiter;
exports.LAMPORTS_PER_SIGNATURE = LAMPORTS_PER_SIGNATURE;
exports.LIFINITY_PROGRAM_ID = LIFINITY_PROGRAM_ID;
exports.MAINNET_SERUM_DEX_PROGRAM = MAINNET_SERUM_DEX_PROGRAM;
exports.MARKETS_URL = MARKETS_URL;
exports.MERCURIAL_SWAP_PROGRAM_ID = MERCURIAL_SWAP_PROGRAM_ID;
exports.MercurialAmm = MercurialAmm;
exports.RAYDIUM_AMM_V4_PROGRAM_ID = RAYDIUM_AMM_V4_PROGRAM_ID;
exports.RaydiumAmm = RaydiumAmm;
exports.SABER_ADD_DECIMALS_PROGRAM_ID = SABER_ADD_DECIMALS_PROGRAM_ID;
exports.SENCHA_PROGRAM_ID = SENCHA_PROGRAM_ID;
exports.SWAP_PROTOCOL_TOKENS = SWAP_PROTOCOL_TOKENS;
exports.SaberAddDecimalsAmm = SaberAddDecimalsAmm;
exports.SaberAmm = SaberAmm;
exports.SenchaAmm = SenchaAmm;
exports.SerumAmm = SerumAmm;
exports.SplTokenSwapAmm = SplTokenSwapAmm;
exports.SplitTradeAmm = SplitTradeAmm;
exports.TOKEN_LIST_URL = TOKEN_LIST_URL;
exports.TransactionBuilder = TransactionBuilder;
exports.WHIRLPOOL_PROGRAM_ID = WHIRLPOOL_PROGRAM_ID;
exports.WRAPPED_SOL_MINT = WRAPPED_SOL_MINT;
exports.WhirlpoolAmm = WhirlpoolAmm;
exports.getEmptyInstruction = getEmptyInstruction;
exports.getPlatformFeeAccounts = getPlatformFeeAccounts;
exports.getRouteInfoUniqueId = getRouteInfoUniqueId;
exports.getSaberWrappedDecimalsAmms = getSaberWrappedDecimalsAmms;
exports.transactionSenderAndConfirmationWaiter = transactionSenderAndConfirmationWaiter;
//# sourceMappingURL=core.cjs.development.js.map
