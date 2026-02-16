import type {
  DefaultApiGetStocksAggregatesRequest,
  GetStocksAggregatesTimespanEnum,
  GetStocksAggregatesSortEnum,
  DefaultApiGetStocksTradesRequest,
  GetStocksTradesOrderEnum,
  GetStocksTradesSortEnum,
  DefaultApiGetStocksQuotesRequest,
  GetStocksQuotesOrderEnum,
  GetStocksQuotesSortEnum,
  DefaultApiGetStocksSnapshotTickerRequest,
  DefaultApiGetStocksOpenCloseRequest,
  DefaultApiGetPreviousStocksAggregatesRequest,
  DefaultApiGetGroupedStocksAggregatesRequest,
  DefaultApiGetStocksSMARequest,
  GetStocksSMATimespanEnum,
  GetStocksSMASeriesTypeEnum,
  GetStocksSMAOrderEnum,
  DefaultApiGetStocksEMARequest,
  GetStocksEMATimespanEnum,
  GetStocksEMASeriesTypeEnum,
  GetStocksEMAOrderEnum,
  DefaultApiGetStocksRSIRequest,
  GetStocksRSITimespanEnum,
  GetStocksRSISeriesTypeEnum,
  DefaultApiGetStocksMACDRequest,
  GetStocksMACDTimespanEnum,
  GetStocksMACDSeriesTypeEnum,
  GetStocksMACDOrderEnum,
  DefaultApiGetLastStocksTradeRequest,
  DefaultApiGetLastStocksQuoteRequest,
} from "@massive.com/client-js";
import { api } from "../lib/api";
import type { CommandMap } from "../lib/types";
import { output, requireFlag, num, bool } from "../lib/utils";

export const stocksCommands: CommandMap = {
  "stocks-aggs": {
    desc: "Stock aggregate bars (OHLCV)",
    usage:
      "--ticker AAPL --from 2025-01-01 --to 2025-01-31 [--timespan day] [--multiplier 1] [--adjusted true] [--sort asc] [--limit 120]",
    handler: async (_api, f) => {
      const params: DefaultApiGetStocksAggregatesRequest = {
        stocksTicker: requireFlag(f, "ticker"),
        multiplier: num(f.multiplier) ?? 1,
        timespan: (f.timespan ?? "day") as GetStocksAggregatesTimespanEnum,
        from: requireFlag(f, "from"),
        to: requireFlag(f, "to"),
        adjusted: bool(f.adjusted) ?? true,
        sort: (f.sort ?? "asc") as GetStocksAggregatesSortEnum,
        limit: num(f.limit) ?? 120,
      };
      await output(api.getStocksAggregates(params));
    },
  },
  "stocks-trades": {
    desc: "Stock trades",
    usage:
      "--ticker AAPL [--timestamp ...] [--timestamp-gte ...] [--timestamp-gt ...] [--timestamp-lte ...] [--timestamp-lt ...] [--limit 10] [--order asc] [--sort timestamp]",
    handler: async (_api, f) => {
      const params: DefaultApiGetStocksTradesRequest = {
        stockTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
        order: f.order as GetStocksTradesOrderEnum,
        limit: num(f.limit),
        sort: f.sort as GetStocksTradesSortEnum,
      };
      await output(api.getStocksTrades(params));
    },
  },
  "stocks-quotes": {
    desc: "Stock quotes (NBBO)",
    usage:
      "--ticker AAPL [--timestamp ...] [--timestamp-gte ...] [--timestamp-gt ...] [--timestamp-lte ...] [--timestamp-lt ...] [--limit 10] [--order asc] [--sort timestamp]",
    handler: async (_api, f) => {
      const params: DefaultApiGetStocksQuotesRequest = {
        stockTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
        order: f.order as GetStocksQuotesOrderEnum,
        limit: num(f.limit),
        sort: f.sort as GetStocksQuotesSortEnum,
      };
      await output(api.getStocksQuotes(params));
    },
  },
  "stocks-snapshot": {
    desc: "Stock ticker snapshot",
    usage: "--ticker AAPL",
    handler: async (_api, f) => {
      const params: DefaultApiGetStocksSnapshotTickerRequest = {
        stocksTicker: requireFlag(f, "ticker"),
      };
      await output(api.getStocksSnapshotTicker(params));
    },
  },
  "stocks-open-close": {
    desc: "Stock daily open/close",
    usage: "--ticker AAPL --date 2025-01-15 [--adjusted true]",
    handler: async (_api, f) => {
      const params: DefaultApiGetStocksOpenCloseRequest = {
        stocksTicker: requireFlag(f, "ticker"),
        date: requireFlag(f, "date"),
        adjusted: bool(f.adjusted),
      };
      await output(api.getStocksOpenClose(params));
    },
  },
  "stocks-previous": {
    desc: "Stock previous day aggregates",
    usage: "--ticker AAPL [--adjusted true]",
    handler: async (_api, f) => {
      const params: DefaultApiGetPreviousStocksAggregatesRequest = {
        stocksTicker: requireFlag(f, "ticker"),
        adjusted: bool(f.adjusted),
      };
      await output(api.getPreviousStocksAggregates(params));
    },
  },
  "stocks-grouped": {
    desc: "Stock grouped daily aggregates",
    usage: "--date 2025-01-15 [--adjusted true] [--include-otc false]",
    handler: async (_api, f) => {
      const params: DefaultApiGetGroupedStocksAggregatesRequest = {
        date: requireFlag(f, "date"),
        adjusted: bool(f.adjusted),
        includeOtc: bool(f["include-otc"]),
      };
      await output(api.getGroupedStocksAggregates(params));
    },
  },
  "stocks-sma": {
    desc: "Stock SMA",
    usage:
      "--ticker AAPL [--timespan day] [--window 50] [--series-type close] [--expand-underlying true] [--order asc] [--limit 10] [--timestamp ...] [--timestamp-gte ...]",
    handler: async (_api, f) => {
      const params: DefaultApiGetStocksSMARequest = {
        stockTicker: requireFlag(f, "ticker"),
        timespan: f.timespan as GetStocksSMATimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetStocksSMASeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetStocksSMAOrderEnum,
        limit: num(f.limit),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
      };
      await output(api.getStocksSMA(params));
    },
  },
  "stocks-ema": {
    desc: "Stock EMA",
    usage:
      "--ticker AAPL [--timespan day] [--window 50] [--series-type close] [--expand-underlying true] [--order asc] [--limit 10] [--timestamp ...] [--timestamp-gte ...]",
    handler: async (_api, f) => {
      const params: DefaultApiGetStocksEMARequest = {
        stockTicker: requireFlag(f, "ticker"),
        timespan: f.timespan as GetStocksEMATimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetStocksEMASeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetStocksEMAOrderEnum,
        limit: num(f.limit),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
      };
      await output(api.getStocksEMA(params));
    },
  },
  "stocks-rsi": {
    desc: "Stock RSI",
    usage:
      "--ticker AAPL [--timespan day] [--window 14] [--series-type close] [--expand-underlying true] [--order asc] [--limit 10] [--timestamp ...] [--timestamp-gte ...]",
    handler: async (_api, f) => {
      const params: DefaultApiGetStocksRSIRequest = {
        stockTicker: requireFlag(f, "ticker"),
        timespan: f.timespan as GetStocksRSITimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetStocksRSISeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        limit: num(f.limit),
        order: f.order as any, // RSI might not have order enum exported or it is missing in imports
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
      };
      await output(api.getStocksRSI(params));
    },
  },
  "stocks-macd": {
    desc: "Stock MACD",
    usage:
      "--ticker AAPL [--timespan day] [--short-window 12] [--long-window 26] [--signal-window 9] [--series-type close] [--expand-underlying true] [--order asc] [--limit 10] [--timestamp ...] [--timestamp-gte ...]",
    handler: async (_api, f) => {
      const params: DefaultApiGetStocksMACDRequest = {
        stockTicker: requireFlag(f, "ticker"),
        timespan: f.timespan as GetStocksMACDTimespanEnum,
        adjusted: bool(f.adjusted),
        shortWindow: num(f["short-window"]),
        longWindow: num(f["long-window"]),
        signalWindow: num(f["signal-window"]),
        seriesType: f["series-type"] as GetStocksMACDSeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetStocksMACDOrderEnum,
        limit: num(f.limit),
        timestamp: f.timestamp,
        timestampGte: f["timestamp-gte"],
        timestampGt: f["timestamp-gt"],
        timestampLte: f["timestamp-lte"],
        timestampLt: f["timestamp-lt"],
      };
      await output(api.getStocksMACD(params));
    },
  },
  "last-trade": {
    desc: "Last stock trade",
    usage: "--ticker AAPL",
    handler: async (_api, f) => {
      const params: DefaultApiGetLastStocksTradeRequest = {
        stocksTicker: requireFlag(f, "ticker"),
      };
      await output(api.getLastStocksTrade(params));
    },
  },
  "last-quote": {
    desc: "Last stock quote",
    usage: "--ticker AAPL",
    handler: async (_api, f) => {
      const params: DefaultApiGetLastStocksQuoteRequest = {
        stocksTicker: requireFlag(f, "ticker"),
      };
      await output(api.getLastStocksQuote(params));
    },
  },
};
