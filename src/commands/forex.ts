import { Command } from "commander";
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
import { output, num } from "../lib/utils";

export function createForexCommand(): Command {
  const forex = new Command("forex").description("Forex market data commands");

  forex
    .command("aggs")
    .description("Forex aggregate bars")
    .requiredOption("-t, --ticker <ticker>", "Forex ticker (e.g., C:EURUSD)")
    .requiredOption("--from <date>", "Start date (YYYY-MM-DD)")
    .requiredOption("--to <date>", "End date (YYYY-MM-DD)")
    .option(
      "--timespan <timespan>",
      "Timespan (minute, hour, day, week, month, quarter, year)",
      "day",
    )
    .option("-m, --multiplier <number>", "Multiplier", "1")
    .option("-a, --adjusted", "Adjust for splits", true)
    .option("-s, --sort <sort>", "Sort order (asc, desc)", "asc")
    .option("-l, --limit <number>", "Limit number of results", "120")
    .action(async (options) => {
      const params: DefaultApiGetForexAggregatesRequest = {
        forexTicker: options.ticker,
        multiplier: num(options.multiplier) ?? 1,
        timespan: (options.timespan ?? "day") as GetForexAggregatesTimespanEnum,
        from: options.from,
        to: options.to,
        adjusted: options.adjusted ?? true,
        sort: (options.sort ?? "asc") as GetForexAggregatesSortEnum,
        limit: num(options.limit) ?? 120,
      };
      await output(api.getForexAggregates(params));
    });

  forex
    .command("quotes")
    .description("Forex quotes")
    .requiredOption("-t, --ticker <ticker>", "Forex ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
    .option("-o, --order <order>", "Order (asc, desc)")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-s, --sort <sort>", "Sort field", "timestamp")
    .action(async (options) => {
      const params: DefaultApiGetForexQuotesRequest = {
        fxTicker: options.ticker,
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
        order: options.order as GetForexQuotesOrderEnum,
        limit: num(options.limit),
        sort: options.sort as GetForexQuotesSortEnum,
      };
      await output(api.getForexQuotes(params));
    });

  forex
    .command("snapshot")
    .description("Forex ticker snapshot")
    .requiredOption("-t, --ticker <ticker>", "Forex ticker")
    .action(async (options) => {
      const params: DefaultApiGetForexSnapshotTickerRequest = {
        ticker: options.ticker,
      };
      await output(api.getForexSnapshotTicker(params));
    });

  forex
    .command("previous")
    .description("Forex previous day aggregates")
    .requiredOption("-t, --ticker <ticker>", "Forex ticker")
    .option("-a, --adjusted", "Adjust for splits")
    .action(async (options) => {
      const params: DefaultApiGetPreviousForexAggregatesRequest = {
        forexTicker: options.ticker,
        adjusted: options.adjusted,
      };
      await output(api.getPreviousForexAggregates(params));
    });

  forex
    .command("grouped")
    .description("Forex grouped daily aggregates")
    .requiredOption("-d, --date <date>", "Date (YYYY-MM-DD)")
    .option("-a, --adjusted", "Adjust for splits")
    .action(async (options) => {
      const params: DefaultApiGetGroupedForexAggregatesRequest = {
        date: options.date,
        adjusted: options.adjusted,
      };
      await output(api.getGroupedForexAggregates(params));
    });

  forex
    .command("sma")
    .description("Forex SMA")
    .requiredOption("-t, --ticker <ticker>", "Forex ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
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
    .action(async (options) => {
      const params: DefaultApiGetForexSMARequest = {
        fxTicker: options.ticker,
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
        timespan: options.timespan as GetForexSMATimespanEnum,
        adjusted: options.adjusted,
        window: num(options.window),
        seriesType: options["series-type"] as GetForexSMASeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        order: options.order as GetForexSMAOrderEnum,
        limit: num(options.limit),
      };
      await output(api.getForexSMA(params));
    });

  forex
    .command("ema")
    .description("Forex EMA")
    .requiredOption("-t, --ticker <ticker>", "Forex ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
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
    .action(async (options) => {
      const params: DefaultApiGetForexEMARequest = {
        fxTicker: options.ticker,
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
        timespan: options.timespan as GetForexEMATimespanEnum,
        adjusted: options.adjusted,
        window: num(options.window),
        seriesType: options["series-type"] as GetForexEMASeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        order: options.order as GetForexEMAOrderEnum,
        limit: num(options.limit),
      };
      await output(api.getForexEMA(params));
    });

  forex
    .command("rsi")
    .description("Forex RSI")
    .requiredOption("-t, --ticker <ticker>", "Forex ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
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
    .action(async (options) => {
      const params: DefaultApiGetForexRSIRequest = {
        fxTicker: options.ticker,
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
        timespan: options.timespan as GetForexRSITimespanEnum,
        adjusted: options.adjusted,
        window: num(options.window),
        seriesType: options["series-type"] as GetForexRSISeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        order: options.order as GetForexRSIOrderEnum,
        limit: num(options.limit),
      };
      await output(api.getForexRSI(params));
    });

  forex
    .command("macd")
    .description("Forex MACD")
    .requiredOption("-t, --ticker <ticker>", "Forex ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
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
    .action(async (options) => {
      const params: DefaultApiGetForexMACDRequest = {
        fxTicker: options.ticker,
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
        timespan: options.timespan as GetForexMACDTimespanEnum,
        adjusted: options.adjusted,
        shortWindow: num(options["short-window"]),
        longWindow: num(options["long-window"]),
        signalWindow: num(options["signal-window"]),
        seriesType: options["series-type"] as GetForexMACDSeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        order: options.order as GetForexMACDOrderEnum,
        limit: num(options.limit),
      };
      await output(api.getForexMACD(params));
    });

  forex
    .command("last-quote")
    .description("Last forex quote")
    .requiredOption("-f, --from <from>", "From currency (e.g., EUR)")
    .requiredOption("-t, --to <to>", "To currency (e.g., USD)")
    .action(async (options) => {
      const params: DefaultApiGetLastCurrencyQuoteRequest = {
        from: options.from,
        to: options.to,
      };
      await output(api.getLastCurrencyQuote(params));
    });

  return forex;
}

export function createCurrencyConversionCommand(): Command {
  return new Command("currency-conversion")
    .description("Currency conversion")
    .requiredOption("-f, --from <from>", "From currency (e.g., USD)")
    .requiredOption("-t, --to <to>", "To currency (e.g., EUR)")
    .option("-a, --amount <number>", "Amount to convert", "100")
    .option("-p, --precision <number>", "Precision", "2")
    .action(async (options) => {
      const params: DefaultApiGetCurrencyConversionRequest = {
        from: options.from,
        to: options.to,
        amount: num(options.amount),
        precision: num(options.precision) as GetCurrencyConversionPrecisionEnum,
      };
      await output(api.getCurrencyConversion(params));
    });
}
