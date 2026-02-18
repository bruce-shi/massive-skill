import { Command } from "commander";
import type {
  DefaultApiGetOptionsAggregatesRequest,
  GetOptionsAggregatesTimespanEnum,
  DefaultApiGetOptionsQuotesRequest,
  DefaultApiGetOptionsTradesRequest,
  DefaultApiGetOptionsOpenCloseRequest,
  DefaultApiGetOptionsChainRequest,
  GetOptionsChainContractTypeEnum,
  GetOptionsChainSortEnum,
  DefaultApiGetOptionContractRequest,
  DefaultApiGetPreviousOptionsAggregatesRequest,
  DefaultApiGetOptionsSMARequest,
  GetOptionsSMATimespanEnum,
  GetOptionsSMASeriesTypeEnum,
  GetOptionsSMAOrderEnum,
  DefaultApiGetOptionsEMARequest,
  GetOptionsEMATimespanEnum,
  GetOptionsEMASeriesTypeEnum,
  GetOptionsEMAOrderEnum,
  DefaultApiGetOptionsRSIRequest,
  GetOptionsRSITimespanEnum,
  GetOptionsRSISeriesTypeEnum,
  GetOptionsRSIOrderEnum,
  DefaultApiGetOptionsMACDRequest,
  GetOptionsMACDTimespanEnum,
  GetOptionsMACDSeriesTypeEnum,
  GetOptionsMACDOrderEnum,
  DefaultApiGetLastOptionsTradeRequest,
  GetOptionsTradesSortEnum,
  GetOptionsTradesOrderEnum,
  GetOptionsQuotesOrderEnum,
  GetOptionsQuotesSortEnum,
} from "@massive.com/client-js";
import { api } from "../lib/api";
import { output, num } from "../lib/utils";

export function createOptionsCommand(): Command {
  const options = new Command("options").description(
    "Options market data commands",
  );

  options
    .command("aggs")
    .description("Options aggregate bars")
    .requiredOption(
      "-t, --ticker <ticker>",
      "Options ticker (e.g., O:AAPL230616C00150000)",
    )
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
    .option("-l, --limit <number>", "Limit number of results")
    .action(async (opts) => {
      const params: DefaultApiGetOptionsAggregatesRequest = {
        optionsTicker: opts.ticker,
        multiplier: num(opts.multiplier) ?? 1,
        timespan: (opts.timespan ?? "day") as GetOptionsAggregatesTimespanEnum,
        from: opts.from,
        to: opts.to,
        adjusted: opts.adjusted ?? true,
        sort: opts.sort,
        limit: num(opts.limit),
      };
      await output(api.getOptionsAggregates(params));
    });

  options
    .command("trades")
    .description("Options trades")
    .requiredOption("-t, --ticker <ticker>", "Options ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
    .option("-o, --order <order>", "Order (asc, desc)")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-s, --sort <sort>", "Sort field", "timestamp")
    .action(async (opts) => {
      const params: DefaultApiGetOptionsTradesRequest = {
        optionsTicker: opts.ticker,
        timestamp: opts.timestamp,
        timestampGte: opts["timestamp-gte"],
        timestampGt: opts["timestamp-gt"],
        timestampLte: opts["timestamp-lte"],
        timestampLt: opts["timestamp-lt"],
        order: opts.order as GetOptionsTradesOrderEnum,
        limit: num(opts.limit),
        sort: opts.sort as GetOptionsTradesSortEnum,
      };
      await output(api.getOptionsTrades(params));
    });

  options
    .command("quotes")
    .description("Options quotes")
    .requiredOption("-t, --ticker <ticker>", "Options ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
    .option("-o, --order <order>", "Order (asc, desc)")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-s, --sort <sort>", "Sort field", "timestamp")
    .action(async (opts) => {
      const params: DefaultApiGetOptionsQuotesRequest = {
        optionsTicker: opts.ticker,
        timestamp: opts.timestamp,
        timestampGte: opts["timestamp-gte"],
        timestampGt: opts["timestamp-gt"],
        timestampLte: opts["timestamp-lte"],
        timestampLt: opts["timestamp-lt"],
        order: opts.order as GetOptionsQuotesOrderEnum,
        limit: num(opts.limit),
        sort: opts.sort as GetOptionsQuotesSortEnum,
      };
      await output(api.getOptionsQuotes(params));
    });

  options
    .command("open-close")
    .description("Options open/close")
    .requiredOption("-t, --ticker <ticker>", "Options ticker")
    .requiredOption("-d, --date <date>", "Date (YYYY-MM-DD)")
    .option("-a, --adjusted", "Adjust for splits")
    .action(async (opts) => {
      const params: DefaultApiGetOptionsOpenCloseRequest = {
        optionsTicker: opts.ticker,
        date: opts.date,
        adjusted: opts.adjusted,
      };
      await output(api.getOptionsOpenClose(params));
    });

  options
    .command("chain")
    .description("Options chain")
    .requiredOption(
      "-u, --underlying <underlying>",
      "Underlying asset (e.g., AAPL)",
    )
    .option("--strike <number>", "Strike price")
    .option("-e, --expiration <date>", "Expiration date (YYYY-MM-DD)")
    .option("-t, --type <type>", "Contract type (call, put)")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-s, --sort <sort>", "Sort field", "expiration")
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .action(async (opts) => {
      const params: DefaultApiGetOptionsChainRequest = {
        underlyingAsset: opts.underlying,
        strikePrice: num(opts.strike),
        expirationDate: opts.expiration,
        contractType: opts.type as GetOptionsChainContractTypeEnum,
        order: opts.order,
        limit: num(opts.limit),
        sort: opts.sort as GetOptionsChainSortEnum,
      };
      await output(api.getOptionsChain(params));
    });

  options
    .command("contract")
    .description("Options contract details")
    .requiredOption(
      "-u, --underlying <underlying>",
      "Underlying asset (e.g., AAPL)",
    )
    .requiredOption(
      "-c, --contract <contract>",
      "Option contract (e.g., O:AAPL230616C00150000)",
    )
    .action(async (opts) => {
      const params: DefaultApiGetOptionContractRequest = {
        underlyingAsset: opts.underlying,
        optionContract: opts.contract,
      };
      await output(api.getOptionContract(params));
    });

  options
    .command("previous")
    .description("Options previous day aggregates")
    .requiredOption("-t, --ticker <ticker>", "Options ticker")
    .option("-a, --adjusted", "Adjust for splits")
    .action(async (opts) => {
      const params: DefaultApiGetPreviousOptionsAggregatesRequest = {
        optionsTicker: opts.ticker,
        adjusted: opts.adjusted,
      };
      await output(api.getPreviousOptionsAggregates(params));
    });

  options
    .command("sma")
    .description("Options SMA")
    .requiredOption("-t, --ticker <ticker>", "Options ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
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
    .action(async (opts) => {
      const params: DefaultApiGetOptionsSMARequest = {
        optionsTicker: opts.ticker,
        timestamp: opts.timestamp,
        timespan: opts.timespan as GetOptionsSMATimespanEnum,
        adjusted: opts.adjusted,
        window: num(opts.window),
        seriesType: opts["series-type"] as GetOptionsSMASeriesTypeEnum,
        expandUnderlying: opts["expand-underlying"],
        order: opts.order as GetOptionsSMAOrderEnum,
        limit: num(opts.limit),
      };
      await output(api.getOptionsSMA(params));
    });

  options
    .command("ema")
    .description("Options EMA")
    .requiredOption("-t, --ticker <ticker>", "Options ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
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
    .action(async (opts) => {
      const params: DefaultApiGetOptionsEMARequest = {
        optionsTicker: opts.ticker,
        timestamp: opts.timestamp,
        timespan: opts.timespan as GetOptionsEMATimespanEnum,
        adjusted: opts.adjusted,
        window: num(opts.window),
        seriesType: opts["series-type"] as GetOptionsEMASeriesTypeEnum,
        expandUnderlying: opts["expand-underlying"],
        order: opts.order as GetOptionsEMAOrderEnum,
        limit: num(opts.limit),
      };
      await output(api.getOptionsEMA(params));
    });

  options
    .command("rsi")
    .description("Options RSI")
    .requiredOption("-t, --ticker <ticker>", "Options ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
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
    .action(async (opts) => {
      const params: DefaultApiGetOptionsRSIRequest = {
        optionsTicker: opts.ticker,
        timestamp: opts.timestamp,
        timespan: opts.timespan as GetOptionsRSITimespanEnum,
        adjusted: opts.adjusted,
        window: num(opts.window),
        seriesType: opts["series-type"] as GetOptionsRSISeriesTypeEnum,
        expandUnderlying: opts["expand-underlying"],
        order: opts.order as GetOptionsRSIOrderEnum,
        limit: num(opts.limit),
      };
      await output(api.getOptionsRSI(params));
    });

  options
    .command("macd")
    .description("Options MACD")
    .requiredOption("-t, --ticker <ticker>", "Options ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
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
    .action(async (opts) => {
      const params: DefaultApiGetOptionsMACDRequest = {
        optionsTicker: opts.ticker,
        timestamp: opts.timestamp,
        timespan: opts.timespan as GetOptionsMACDTimespanEnum,
        adjusted: opts.adjusted,
        shortWindow: num(opts["short-window"]),
        longWindow: num(opts["long-window"]),
        signalWindow: num(opts["signal-window"]),
        seriesType: opts["series-type"] as GetOptionsMACDSeriesTypeEnum,
        expandUnderlying: opts["expand-underlying"],
        order: opts.order as GetOptionsMACDOrderEnum,
        limit: num(opts.limit),
      };
      await output(api.getOptionsMACD(params));
    });

  return options;
}

export function createLastOptionsTradeCommand(): Command {
  return new Command("last-options-trade")
    .description("Last options trade")
    .requiredOption("-t, --ticker <ticker>", "Options ticker")
    .action(async (opts) => {
      const params: DefaultApiGetLastOptionsTradeRequest = {
        optionsTicker: opts.ticker,
      };
      await output(api.getLastOptionsTrade(params));
    });
}
