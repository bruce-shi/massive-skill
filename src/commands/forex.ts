import type {
  DefaultApiGetForexAggregatesRequest,
  GetForexAggregatesTimespanEnum,
  GetForexAggregatesSortEnum,
  DefaultApiGetForexQuotesRequest,
  GetForexQuotesOrderEnum,
  GetForexQuotesSortEnum,
  DefaultApiGetForexSnapshotTickerRequest,
  DefaultApiGetPreviousForexAggregatesRequest,
  DefaultApiGetGroupedForexAggregatesRequest,
  DefaultApiGetForexSMARequest,
  GetForexSMATimespanEnum,
  GetForexSMASeriesTypeEnum,
  GetForexSMAOrderEnum,
  DefaultApiGetForexEMARequest,
  GetForexEMATimespanEnum,
  GetForexEMASeriesTypeEnum,
  GetForexEMAOrderEnum,
  DefaultApiGetForexRSIRequest,
  GetForexRSITimespanEnum,
  GetForexRSISeriesTypeEnum,
  GetForexRSIOrderEnum,
  DefaultApiGetForexMACDRequest,
  GetForexMACDTimespanEnum,
  GetForexMACDSeriesTypeEnum,
  GetForexMACDOrderEnum,
  DefaultApiGetCurrencyConversionRequest,
  GetCurrencyConversionPrecisionEnum,
  DefaultApiGetLastCurrencyQuoteRequest,
} from "@massive.com/client-js";
import { api } from "../lib/api";
import type { CommandMap } from "../lib/types";
import { output, requireFlag, num, bool } from "../lib/utils";

export const forexCommands: CommandMap = {
  "forex-aggs": {
    desc: "Forex aggregate bars",
    usage:
      "--ticker C:EURUSD --from 2025-01-01 --to 2025-01-31 [--timespan day] [--multiplier 1] [--adjusted true] [--sort asc] [--limit 120]",
    handler: async (_api, f) => {
      const params: DefaultApiGetForexAggregatesRequest = {
        forexTicker: requireFlag(f, "ticker"),
        multiplier: num(f.multiplier) ?? 1,
        timespan: (f.timespan ?? "day") as GetForexAggregatesTimespanEnum,
        from: requireFlag(f, "from"),
        to: requireFlag(f, "to"),
        adjusted: bool(f.adjusted) ?? true,
        sort: (f.sort ?? "asc") as GetForexAggregatesSortEnum,
        limit: num(f.limit) ?? 120,
      };
      await output(api.getForexAggregates(params));
    },
  },
  "forex-quotes": {
    desc: "Forex quotes",
    usage:
      "--ticker C:EURUSD [--timestamp 2025-01-01] [--timestamp-gte 2025-01-01] [--timestamp-gt 2025-01-01] [--timestamp-lte 2025-01-02] [--timestamp-lt 2025-01-02] [--order asc] [--limit 10] [--sort timestamp]",
    handler: async (_api, f) => {
      const params: DefaultApiGetForexQuotesRequest = {
        fxTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
        order: f.order as GetForexQuotesOrderEnum,
        limit: num(f.limit),
        sort: f.sort as GetForexQuotesSortEnum,
      };
      await output(api.getForexQuotes(params));
    },
  },
  "forex-snapshot": {
    desc: "Forex ticker snapshot",
    usage: "--ticker C:EURUSD",
    handler: async (_api, f) => {
      const params: DefaultApiGetForexSnapshotTickerRequest = {
        ticker: requireFlag(f, "ticker"),
      };
      await output(api.getForexSnapshotTicker(params));
    },
  },
  "forex-previous": {
    desc: "Forex previous day aggregates",
    usage: "--ticker C:EURUSD [--adjusted true]",
    handler: async (_api, f) => {
      const params: DefaultApiGetPreviousForexAggregatesRequest = {
        forexTicker: requireFlag(f, "ticker"),
        adjusted: bool(f.adjusted),
      };
      await output(api.getPreviousForexAggregates(params));
    },
  },
  "forex-grouped": {
    desc: "Forex grouped daily aggregates",
    usage: "--date 2025-01-15 [--adjusted true]",
    handler: async (_api, f) => {
      const params: DefaultApiGetGroupedForexAggregatesRequest = {
        date: requireFlag(f, "date"),
        adjusted: bool(f.adjusted),
      };
      await output(api.getGroupedForexAggregates(params));
    },
  },
  "forex-sma": {
    desc: "Forex SMA",
    usage:
      "--ticker C:EURUSD [--timestamp 2025-01-01] [--timestamp-gte 2025-01-01] [--timestamp-gt 2025-01-01] [--timestamp-lte 2025-01-02] [--timestamp-lt 2025-01-02] [--timespan day] [--adjusted true] [--window 50] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetForexSMARequest = {
        fxTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
        timespan: f.timespan as GetForexSMATimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetForexSMASeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetForexSMAOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getForexSMA(params));
    },
  },
  "forex-ema": {
    desc: "Forex EMA",
    usage:
      "--ticker C:EURUSD [--timestamp 2025-01-01] [--timestamp-gte 2025-01-01] [--timestamp-gt 2025-01-01] [--timestamp-lte 2025-01-02] [--timestamp-lt 2025-01-02] [--timespan day] [--adjusted true] [--window 50] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetForexEMARequest = {
        fxTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
        timespan: f.timespan as GetForexEMATimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetForexEMASeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetForexEMAOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getForexEMA(params));
    },
  },
  "forex-rsi": {
    desc: "Forex RSI",
    usage:
      "--ticker C:EURUSD [--timestamp 2025-01-01] [--timestamp-gte 2025-01-01] [--timestamp-gt 2025-01-01] [--timestamp-lte 2025-01-02] [--timestamp-lt 2025-01-02] [--timespan day] [--adjusted true] [--window 14] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetForexRSIRequest = {
        fxTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
        timespan: f.timespan as GetForexRSITimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetForexRSISeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetForexRSIOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getForexRSI(params));
    },
  },
  "forex-macd": {
    desc: "Forex MACD",
    usage:
      "--ticker C:EURUSD [--timestamp 2025-01-01] [--timestamp-gte 2025-01-01] [--timestamp-gt 2025-01-01] [--timestamp-lte 2025-01-02] [--timestamp-lt 2025-01-02] [--timespan day] [--adjusted true] [--short-window 12] [--long-window 26] [--signal-window 9] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetForexMACDRequest = {
        fxTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
        timespan: f.timespan as GetForexMACDTimespanEnum,
        adjusted: bool(f.adjusted),
        shortWindow: num(f["short-window"]),
        longWindow: num(f["long-window"]),
        signalWindow: num(f["signal-window"]),
        seriesType: f["series-type"] as GetForexMACDSeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetForexMACDOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getForexMACD(params));
    },
  },
  "currency-conversion": {
    desc: "Currency conversion",
    usage: "--from USD --to EUR [--amount 100] [--precision 2]",
    handler: async (_api, f) => {
      const params: DefaultApiGetCurrencyConversionRequest = {
        from: requireFlag(f, "from"),
        to: requireFlag(f, "to"),
        amount: num(f.amount),
        precision: num(f.precision) as GetCurrencyConversionPrecisionEnum,
      };
      await output(api.getCurrencyConversion(params));
    },
  },
  "last-forex-quote": {
    desc: "Last forex quote",
    usage: "--from EUR --to USD",
    handler: async (_api, f) => {
      const params: DefaultApiGetLastCurrencyQuoteRequest = {
        from: requireFlag(f, "from"),
        to: requireFlag(f, "to"),
      };
      await output(api.getLastCurrencyQuote(params));
    },
  },
};
