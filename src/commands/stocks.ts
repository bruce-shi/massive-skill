import { Command } from "commander";
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
import { output, num } from "../lib/utils";

export function createStocksCommand(): Command {
  const stocks = new Command("stocks").description(
    "Stock market data commands",
  );

  stocks
    .command("aggs")
    .description("Stock aggregate bars (OHLCV)")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker (e.g., AAPL)")
    .requiredOption("--from <date>", "Start date (YYYY-MM-DD)")
    .requiredOption("--to <date>", "End date (YYYY-MM-DD)")
    .option(
      "-ts, --timespan <timespan>",
      "Timespan (minute, hour, day, week, month, quarter, year)",
      "day",
    )
    .option("-m, --multiplier <number>", "Multiplier", "1")
    .option("-a, --adjusted", "Adjust for splits", true)
    .option("-s, --sort <sort>", "Sort order (asc, desc)", "asc")
    .option("-l, --limit <number>", "Limit number of results", "120")
    .action(async (options) => {
      const params: DefaultApiGetStocksAggregatesRequest = {
        stocksTicker: options.ticker,
        multiplier: num(options.multiplier) ?? 1,
        timespan: (options.timespan ??
          "day") as GetStocksAggregatesTimespanEnum,
        from: options.from,
        to: options.to,
        adjusted: options.adjusted ?? true,
        sort: (options.sort ?? "asc") as GetStocksAggregatesSortEnum,
        limit: num(options.limit) ?? 120,
      };
      await output(api.getStocksAggregates(params));
    });

  stocks
    .command("trades")
    .description("Stock trades")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .option("-s, --sort <sort>", "Sort field", "timestamp")
    .action(async (options) => {
      const params: DefaultApiGetStocksTradesRequest = {
        stockTicker: options.ticker,
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
        order: options.order as GetStocksTradesOrderEnum,
        limit: num(options.limit),
        sort: options.sort as GetStocksTradesSortEnum,
      };
      await output(api.getStocksTrades(params));
    });

  stocks
    .command("quotes")
    .description("Stock quotes (NBBO)")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .option("-s, --sort <sort>", "Sort field", "timestamp")
    .action(async (options) => {
      const params: DefaultApiGetStocksQuotesRequest = {
        stockTicker: options.ticker,
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
        order: options.order as GetStocksQuotesOrderEnum,
        limit: num(options.limit),
        sort: options.sort as GetStocksQuotesSortEnum,
      };
      await output(api.getStocksQuotes(params));
    });

  stocks
    .command("snapshot")
    .description("Stock ticker snapshot")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker")
    .action(async (options) => {
      const params: DefaultApiGetStocksSnapshotTickerRequest = {
        stocksTicker: options.ticker,
      };
      await output(api.getStocksSnapshotTicker(params));
    });

  stocks
    .command("open-close")
    .description("Stock daily open/close")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker")
    .requiredOption("-d, --date <date>", "Date (YYYY-MM-DD)")
    .option("-a, --adjusted", "Adjust for splits")
    .action(async (options) => {
      const params: DefaultApiGetStocksOpenCloseRequest = {
        stocksTicker: options.ticker,
        date: options.date,
        adjusted: options.adjusted,
      };
      await output(api.getStocksOpenClose(params));
    });

  stocks
    .command("previous")
    .description("Stock previous day aggregates")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker")
    .option("-a, --adjusted", "Adjust for splits")
    .action(async (options) => {
      const params: DefaultApiGetPreviousStocksAggregatesRequest = {
        stocksTicker: options.ticker,
        adjusted: options.adjusted,
      };
      await output(api.getPreviousStocksAggregates(params));
    });

  stocks
    .command("grouped")
    .description("Stock grouped daily aggregates")
    .requiredOption("-d, --date <date>", "Date (YYYY-MM-DD)")
    .option("-a, --adjusted", "Adjust for splits")
    .option("--include-otc", "Include OTC stocks", false)
    .action(async (options) => {
      const params: DefaultApiGetGroupedStocksAggregatesRequest = {
        date: options.date,
        adjusted: options.adjusted,
        includeOtc: options.includeOtc,
      };
      await output(api.getGroupedStocksAggregates(params));
    });

  stocks
    .command("sma")
    .description("Stock SMA")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker")
    .option("--timespan <timespan>", "Timespan", "day")
    .option("-a, --adjusted", "Adjust for splits")
    .option("-w, --window <number>", "Window size", "50")
    .option(
      "--series-type <type>",
      "Series type (open, high, low, close)",
      "close",
    )
    .option("--expand-underlying", "Expand underlying", false)
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
    .action(async (options) => {
      const params: DefaultApiGetStocksSMARequest = {
        stockTicker: options.ticker,
        timespan: options.timespan as GetStocksSMATimespanEnum,
        adjusted: options.adjusted,
        window: num(options.window),
        seriesType: options["series-type"] as GetStocksSMASeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        order: options.order as GetStocksSMAOrderEnum,
        limit: num(options.limit),
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
      };
      await output(api.getStocksSMA(params));
    });

  stocks
    .command("ema")
    .description("Stock EMA")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker")
    .option("--timespan <timespan>", "Timespan", "day")
    .option("-a, --adjusted", "Adjust for splits")
    .option("-w, --window <number>", "Window size", "50")
    .option(
      "--series-type <type>",
      "Series type (open, high, low, close)",
      "close",
    )
    .option("--expand-underlying", "Expand underlying", false)
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
    .action(async (options) => {
      const params: DefaultApiGetStocksEMARequest = {
        stockTicker: options.ticker,
        timespan: options.timespan as GetStocksEMATimespanEnum,
        adjusted: options.adjusted,
        window: num(options.window),
        seriesType: options["series-type"] as GetStocksEMASeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        order: options.order as GetStocksEMAOrderEnum,
        limit: num(options.limit),
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
      };
      await output(api.getStocksEMA(params));
    });

  stocks
    .command("rsi")
    .description("Stock RSI")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker")
    .option("--timespan <timespan>", "Timespan", "day")
    .option("-a, --adjusted", "Adjust for splits")
    .option("-w, --window <number>", "Window size", "14")
    .option(
      "--series-type <type>",
      "Series type (open, high, low, close)",
      "close",
    )
    .option("--expand-underlying", "Expand underlying", false)
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
    .action(async (options) => {
      const params: DefaultApiGetStocksRSIRequest = {
        stockTicker: options.ticker,
        timespan: options.timespan as GetStocksRSITimespanEnum,
        adjusted: options.adjusted,
        window: num(options.window),
        seriesType: options["series-type"] as GetStocksRSISeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        limit: num(options.limit),
        order: options.order as any,
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
      };
      await output(api.getStocksRSI(params));
    });

  stocks
    .command("macd")
    .description("Stock MACD")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker")
    .option("--timespan <timespan>", "Timespan", "day")
    .option("-a, --adjusted", "Adjust for splits")
    .option("--short-window <number>", "Short window", "12")
    .option("--long-window <number>", "Long window", "26")
    .option("--signal-window <number>", "Signal window", "9")
    .option(
      "--series-type <type>",
      "Series type (open, high, low, close)",
      "close",
    )
    .option("--expand-underlying", "Expand underlying", false)
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
    .action(async (options) => {
      const params: DefaultApiGetStocksMACDRequest = {
        stockTicker: options.ticker,
        timespan: options.timespan as GetStocksMACDTimespanEnum,
        adjusted: options.adjusted,
        shortWindow: num(options["short-window"]),
        longWindow: num(options["long-window"]),
        signalWindow: num(options["signal-window"]),
        seriesType: options["series-type"] as GetStocksMACDSeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        order: options.order as GetStocksMACDOrderEnum,
        limit: num(options.limit),
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
      };
      await output(api.getStocksMACD(params));
    });

  stocks
    .command("last-trade")
    .description("Last stock trade")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker")
    .action(async (options) => {
      const params: DefaultApiGetLastStocksTradeRequest = {
        stocksTicker: options.ticker,
      };
      await output(api.getLastStocksTrade(params));
    });

  stocks
    .command("last-quote")
    .description("Last stock quote")
    .requiredOption("-t, --ticker <ticker>", "Stock ticker")
    .action(async (options) => {
      const params: DefaultApiGetLastStocksQuoteRequest = {
        stocksTicker: options.ticker,
      };
      await output(api.getLastStocksQuote(params));
    });

  return stocks;
}
