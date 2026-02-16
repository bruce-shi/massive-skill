import type {
  DefaultApiGetOptionsAggregatesRequest,
  GetOptionsAggregatesTimespanEnum,
  DefaultApiGetOptionsQuotesRequest,
  DefaultApiGetOptionsTradesRequest,
  DefaultApiGetOptionsOpenCloseRequest,
  DefaultApiGetOptionsChainRequest,
  GetOptionsChainContractTypeEnum,
  DefaultApiGetOptionContractRequest,
  DefaultApiGetPreviousOptionsAggregatesRequest,
  DefaultApiGetOptionsSMARequest,
  GetOptionsSMATimespanEnum,
  GetOptionsSMASeriesTypeEnum,
  DefaultApiGetOptionsEMARequest,
  GetOptionsEMATimespanEnum,
  GetOptionsEMASeriesTypeEnum,
  DefaultApiGetOptionsRSIRequest,
  GetOptionsRSITimespanEnum,
  GetOptionsRSISeriesTypeEnum,
  DefaultApiGetOptionsMACDRequest,
  GetOptionsMACDTimespanEnum,
  DefaultApiGetLastOptionsTradeRequest,
  GetOptionsChainSortEnum,
  GetOptionsSMAOrderEnum,
  GetOptionsEMAOrderEnum,
  GetOptionsRSIOrderEnum,
  GetOptionsMACDSeriesTypeEnum,
  GetOptionsMACDOrderEnum,
  GetOptionsTradesSortEnum,
  GetOptionsTradesOrderEnum,
  GetOptionsQuotesOrderEnum,
  GetOptionsQuotesSortEnum,
} from "@massive.com/client-js";
import { api } from "../lib/api";
import type { CommandMap } from "../lib/types";
import { output, requireFlag, num, bool } from "../lib/utils";

export const optionsCommands: CommandMap = {
  "options-aggs": {
    desc: "Options aggregate bars",
    usage:
      "--ticker O:AAPL230616C00150000 --from 2025-01-01 --to 2025-01-31 [--timespan day] [--multiplier 1] [--adjusted true] [--sort asc] [--limit 120]",
    handler: async (_api, f) => {
      const params: DefaultApiGetOptionsAggregatesRequest = {
        optionsTicker: requireFlag(f, "ticker"),
        multiplier: num(f.multiplier) ?? 1,
        timespan: (f.timespan ?? "day") as GetOptionsAggregatesTimespanEnum,
        from: requireFlag(f, "from"),
        to: requireFlag(f, "to"),
        adjusted: bool(f.adjusted) ?? true,
        // @ts-expect-error - The client library definition might be missing sort and limit
        sort: f.sort,
        limit: num(f.limit),
      };
      await output(api.getOptionsAggregates(params));
    },
  },
  "options-trades": {
    desc: "Options trades",
    usage:
      "--ticker O:AAPL230616C00150000 [--timestamp 2025-01-01] [--timestamp-gte 2025-01-01] [--timestamp-gt 2025-01-01] [--timestamp-lte 2025-01-02] [--timestamp-lt 2025-01-02] [--order asc] [--limit 10] [--sort timestamp]",
    handler: async (_api, f) => {
      const params: DefaultApiGetOptionsTradesRequest = {
        optionsTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
        order: f.order as GetOptionsTradesOrderEnum,
        limit: num(f.limit),
        sort: f.sort as GetOptionsTradesSortEnum,
      };
      await output(api.getOptionsTrades(params));
    },
  },
  "options-quotes": {
    desc: "Options quotes",
    usage:
      "--ticker O:AAPL230616C00150000 [--timestamp 2025-01-01] [--timestamp-gte 2025-01-01] [--timestamp-gt 2025-01-01] [--timestamp-lte 2025-01-02] [--timestamp-lt 2025-01-02] [--order asc] [--limit 10] [--sort timestamp]",
    handler: async (_api, f) => {
      const params: DefaultApiGetOptionsQuotesRequest = {
        optionsTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
        order: f.order as GetOptionsQuotesOrderEnum,
        limit: num(f.limit),
        sort: f.sort as GetOptionsQuotesSortEnum,
      };
      await output(api.getOptionsQuotes(params));
    },
  },
  "options-open-close": {
    desc: "Options open/close",
    usage: "--ticker O:AAPL230616C00150000 --date 2025-01-15 [--adjusted true]",
    handler: async (_api, f) => {
      const params: DefaultApiGetOptionsOpenCloseRequest = {
        optionsTicker: requireFlag(f, "ticker"),
        date: requireFlag(f, "date"),
        adjusted: bool(f.adjusted),
      };
      await output(api.getOptionsOpenClose(params));
    },
  },
  "options-chain": {
    desc: "Options chain",
    usage:
      "--underlying AAPL [--strike 150] [--expiration 2025-06-16] [--type call] [--limit 10] [--sort expiration] [--order asc]",
    handler: async (_api, f) => {
      const params: DefaultApiGetOptionsChainRequest = {
        underlyingAsset: requireFlag(f, "underlying"),
        strikePrice: num(f.strike),
        expirationDate: f.expiration,
        contractType: f.type as GetOptionsChainContractTypeEnum,
        // @ts-expect-error - The client library definition might be missing sort, order, limit
        order: f.order,
        limit: num(f.limit),
        sort: f.sort as GetOptionsChainSortEnum,
      };
      await output(api.getOptionsChain(params));
    },
  },
  "options-contract": {
    desc: "Options contract details",
    usage: "--underlying AAPL --contract O:AAPL230616C00150000",
    handler: async (_api, f) => {
      const params: DefaultApiGetOptionContractRequest = {
        underlyingAsset: requireFlag(f, "underlying"),
        optionContract: requireFlag(f, "contract"),
      };
      await output(api.getOptionContract(params));
    },
  },
  "options-previous": {
    desc: "Options previous day aggregates",
    usage: "--ticker O:AAPL230616C00150000 [--adjusted true]",
    handler: async (_api, f) => {
      const params: DefaultApiGetPreviousOptionsAggregatesRequest = {
        optionsTicker: requireFlag(f, "ticker"),
        adjusted: bool(f.adjusted),
      };
      await output(api.getPreviousOptionsAggregates(params));
    },
  },
  "options-sma": {
    desc: "Options SMA",
    usage:
      "--ticker O:AAPL230616C00150000 [--timestamp 2025-01-01] [--timespan day] [--adjusted true] [--window 50] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetOptionsSMARequest = {
        optionsTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetOptionsSMATimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetOptionsSMASeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetOptionsSMAOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getOptionsSMA(params));
    },
  },
  "options-ema": {
    desc: "Options EMA",
    usage:
      "--ticker O:AAPL230616C00150000 [--timestamp 2025-01-01] [--timespan day] [--adjusted true] [--window 50] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetOptionsEMARequest = {
        optionsTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetOptionsEMATimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetOptionsEMASeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetOptionsEMAOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getOptionsEMA(params));
    },
  },
  "options-rsi": {
    desc: "Options RSI",
    usage:
      "--ticker O:AAPL230616C00150000 [--timestamp 2025-01-01] [--timespan day] [--adjusted true] [--window 14] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetOptionsRSIRequest = {
        optionsTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetOptionsRSITimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetOptionsRSISeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetOptionsRSIOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getOptionsRSI(params));
    },
  },
  "options-macd": {
    desc: "Options MACD",
    usage:
      "--ticker O:AAPL230616C00150000 [--timestamp 2025-01-01] [--timespan day] [--adjusted true] [--short-window 12] [--long-window 26] [--signal-window 9] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetOptionsMACDRequest = {
        optionsTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetOptionsMACDTimespanEnum,
        adjusted: bool(f.adjusted),
        shortWindow: num(f["short-window"]),
        longWindow: num(f["long-window"]),
        signalWindow: num(f["signal-window"]),
        seriesType: f["series-type"] as GetOptionsMACDSeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetOptionsMACDOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getOptionsMACD(params));
    },
  },
  "last-options-trade": {
    desc: "Last options trade",
    usage: "--ticker O:AAPL230616C00150000",
    handler: async (_api, f) => {
      const params: DefaultApiGetLastOptionsTradeRequest = {
        optionsTicker: requireFlag(f, "ticker"),
      };
      await output(api.getLastOptionsTrade(params));
    },
  },
};
