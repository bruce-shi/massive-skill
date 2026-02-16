import type {
  DefaultApiGetCryptoAggregatesRequest,
  GetCryptoAggregatesTimespanEnum,
  GetCryptoAggregatesSortEnum,
  DefaultApiGetCryptoTradesRequest,
  GetCryptoTradesOrderEnum,
  GetCryptoTradesSortEnum,
  DefaultApiGetCryptoSnapshotTickerRequest,
  DefaultApiGetCryptoOpenCloseRequest,
  DefaultApiGetPreviousCryptoAggregatesRequest,
  DefaultApiGetGroupedCryptoAggregatesRequest,
  DefaultApiGetCryptoSMARequest,
  GetCryptoSMATimespanEnum,
  DefaultApiGetCryptoEMARequest,
  GetCryptoEMATimespanEnum,
  DefaultApiGetCryptoRSIRequest,
  GetCryptoRSITimespanEnum,
  DefaultApiGetCryptoMACDRequest,
  GetCryptoMACDTimespanEnum,
  DefaultApiGetLastCryptoTradeRequest,
} from "@massive.com/client-js";
import { api } from "../lib/api";
import type { CommandMap } from "../lib/types";
import { output, requireFlag, num, bool, list } from "../lib/utils";

export const cryptoCommands: CommandMap = {
  "crypto-aggs": {
    desc: "Crypto aggregate bars",
    usage:
      "--ticker X:BTCUSD --from 2025-01-01 --to 2025-01-31 [--timespan day] [--multiplier 1] [--adjusted true] [--sort asc] [--limit 120]",
    handler: async (_api, f) => {
      const params: DefaultApiGetCryptoAggregatesRequest = {
        cryptoTicker: requireFlag(f, "ticker"),
        multiplier: num(f.multiplier) ?? 1,
        timespan: (f.timespan ?? "day") as GetCryptoAggregatesTimespanEnum,
        from: requireFlag(f, "from"),
        to: requireFlag(f, "to"),
        adjusted: bool(f.adjusted) ?? true,
        sort: (f.sort ?? "asc") as GetCryptoAggregatesSortEnum,
        limit: num(f.limit) ?? 120,
      };
      await output(api.getCryptoAggregates(params));
    },
  },
  "crypto-trades": {
    desc: "Crypto trades",
    usage:
      "--ticker X:BTCUSD [--timestamp ...] [--timestamp-gte ...] [--timestamp-lt ...] [--order asc] [--limit 10] [--sort timestamp]",
    handler: async (_api, f) => {
      const params: DefaultApiGetCryptoTradesRequest = {
        cryptoTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
        order: f.order as GetCryptoTradesOrderEnum,
        limit: num(f.limit),
        sort: f.sort as GetCryptoTradesSortEnum,
      };
      await output(api.getCryptoTrades(params));
    },
  },
  "crypto-snapshot": {
    desc: "Crypto ticker snapshot",
    usage: "--ticker X:BTCUSD",
    handler: async (_api, f) => {
      const params: DefaultApiGetCryptoSnapshotTickerRequest = {
        ticker: requireFlag(f, "ticker"),
      };
      await output(api.getCryptoSnapshotTicker(params));
    },
  },
  "crypto-snapshot-direction": {
    desc: "Crypto snapshot direction",
    usage: "--direction gainers|losers",
    handler: async (_api, f) => {
      // DefaultApiGetCryptoSnapshotDirectionRequest
      // direction: GetCryptoSnapshotDirectionDirectionEnum
      // 'gainers' | 'losers'
      const direction = requireFlag(f, "direction") as any;
      await output(api.getCryptoSnapshotDirection({ direction }));
    },
  },
  "crypto-snapshot-tickers": {
    desc: "Crypto snapshot tickers",
    usage: "[--tickers X:BTCUSD,X:ETHUSD]",
    handler: async (_api, f) => {
      // DefaultApiGetCryptoSnapshotTickersRequest
      // tickers?: Array<string>
      await output(
        api.getCryptoSnapshotTickers({
          tickers: list(f.tickers),
        }),
      );
    },
  },
  "crypto-open-close": {
    desc: "Crypto daily open/close",
    usage: "--from BTC --to USD --date 2025-01-15 [--adjusted true]",
    handler: async (_api, f) => {
      const params: DefaultApiGetCryptoOpenCloseRequest = {
        from: requireFlag(f, "from"),
        to: requireFlag(f, "to"),
        date: requireFlag(f, "date"),
        adjusted: bool(f.adjusted),
      };
      await output(api.getCryptoOpenClose(params));
    },
  },
  "crypto-previous": {
    desc: "Crypto previous day aggregates",
    usage: "--ticker X:BTCUSD [--adjusted true]",
    handler: async (_api, f) => {
      const params: DefaultApiGetPreviousCryptoAggregatesRequest = {
        cryptoTicker: requireFlag(f, "ticker"),
        adjusted: bool(f.adjusted),
      };
      await output(api.getPreviousCryptoAggregates(params));
    },
  },
  "crypto-grouped": {
    desc: "Crypto grouped daily aggregates",
    usage: "--date 2025-01-15 [--adjusted true]",
    handler: async (_api, f) => {
      const params: DefaultApiGetGroupedCryptoAggregatesRequest = {
        date: requireFlag(f, "date"),
        adjusted: bool(f.adjusted),
      };
      await output(api.getGroupedCryptoAggregates(params));
    },
  },
  "crypto-sma": {
    desc: "Crypto SMA",
    usage:
      "--ticker X:BTCUSD [--timespan day] [--window 50] [--timestamp ...] [--series-type close] [--expand-underlying true] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetCryptoSMARequest = {
        cryptoTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetCryptoSMATimespanEnum,
        window: num(f.window),
        seriesType: f["series-type"] as any,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as any,
        limit: num(f.limit),
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
      };
      await output(api.getCryptoSMA(params));
    },
  },
  "crypto-ema": {
    desc: "Crypto EMA",
    usage:
      "--ticker X:BTCUSD [--timespan day] [--window 50] [--timestamp ...] [--series-type close] [--expand-underlying true] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetCryptoEMARequest = {
        cryptoTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetCryptoEMATimespanEnum,
        window: num(f.window),
        seriesType: f["series-type"] as any,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as any,
        limit: num(f.limit),
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
      };
      await output(api.getCryptoEMA(params));
    },
  },
  "crypto-rsi": {
    desc: "Crypto RSI",
    usage:
      "--ticker X:BTCUSD [--timespan day] [--window 14] [--timestamp ...] [--series-type close] [--expand-underlying true] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetCryptoRSIRequest = {
        cryptoTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetCryptoRSITimespanEnum,
        window: num(f.window),
        seriesType: f["series-type"] as any,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as any,
        limit: num(f.limit),
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
      };
      await output(api.getCryptoRSI(params));
    },
  },
  "crypto-macd": {
    desc: "Crypto MACD",
    usage:
      "--ticker X:BTCUSD [--timespan day] [--short-window 12] [--long-window 26] [--signal-window 9] [--timestamp ...] [--series-type close] [--expand-underlying true] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetCryptoMACDRequest = {
        cryptoTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetCryptoMACDTimespanEnum,
        shortWindow: num(f["short-window"]),
        longWindow: num(f["long-window"]),
        signalWindow: num(f["signal-window"]),
        seriesType: f["series-type"] as any,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as any,
        limit: num(f.limit),
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
      };
      await output(api.getCryptoMACD(params));
    },
  },
  "last-crypto-trade": {
    desc: "Last crypto trade",
    usage: "--from BTC --to USD",
    handler: async (_api, f) => {
      const params: DefaultApiGetLastCryptoTradeRequest = {
        from: requireFlag(f, "from"),
        to: requireFlag(f, "to"),
      };
      await output(api.getLastCryptoTrade(params));
    },
  },
};
