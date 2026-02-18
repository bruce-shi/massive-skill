import { Command } from "commander";
import type {
  DefaultApiGetIndicesAggregatesRequest,
  GetIndicesAggregatesTimespanEnum,
  GetIndicesAggregatesSortEnum,
  DefaultApiGetIndicesOpenCloseRequest,
  DefaultApiGetIndicesSnapshotRequest,
  DefaultApiGetPreviousIndicesAggregatesRequest,
  DefaultApiGetIndicesSMARequest,
  GetIndicesSMATimespanEnum,
  GetIndicesSMASeriesTypeEnum,
  GetIndicesSMAOrderEnum,
  DefaultApiGetIndicesEMARequest,
  GetIndicesEMATimespanEnum,
  GetIndicesEMASeriesTypeEnum,
  GetIndicesEMAOrderEnum,
  DefaultApiGetIndicesRSIRequest,
  GetIndicesRSITimespanEnum,
  GetIndicesRSISeriesTypeEnum,
  GetIndicesRSIOrderEnum,
  DefaultApiGetIndicesMACDRequest,
  GetIndicesMACDTimespanEnum,
  GetIndicesMACDSeriesTypeEnum,
  GetIndicesMACDOrderEnum,
} from "@massive.com/client-js";
import { api } from "../lib/api";
import { output, num } from "../lib/utils";

export function createIndicesCommand(): Command {
  const indices = new Command("indices").description(
    "Indices market data commands",
  );

  indices
    .command("aggs")
    .description("Indices aggregate bars")
    .requiredOption("-t, --ticker <ticker>", "Indices ticker (e.g., I:SPX)")
    .requiredOption("--from <date>", "Start date (YYYY-MM-DD)")
    .requiredOption("--to <date>", "End date (YYYY-MM-DD)")
    .option(
      "--timespan <timespan>",
      "Timespan (minute, hour, day, week, month, quarter, year)",
      "day",
    )
    .option("-m, --multiplier <number>", "Multiplier", "1")
    .option("-s, --sort <sort>", "Sort order (asc, desc)", "asc")
    .option("-l, --limit <number>", "Limit number of results")
    .action(async (options) => {
      const params: DefaultApiGetIndicesAggregatesRequest = {
        indicesTicker: options.ticker,
        multiplier: num(options.multiplier) ?? 1,
        timespan: (options.timespan ??
          "day") as GetIndicesAggregatesTimespanEnum,
        from: options.from,
        to: options.to,
        sort: options.sort as GetIndicesAggregatesSortEnum,
        limit: num(options.limit),
      };
      await output(api.getIndicesAggregates(params));
    });

  indices
    .command("open-close")
    .description("Indices open/close")
    .requiredOption("-t, --ticker <ticker>", "Indices ticker")
    .requiredOption("-d, --date <date>", "Date (YYYY-MM-DD)")
    .action(async (options) => {
      const params: DefaultApiGetIndicesOpenCloseRequest = {
        indicesTicker: options.ticker,
        date: options.date,
      };
      await output(api.getIndicesOpenClose(params));
    });

  indices
    .command("snapshot")
    .description("Indices snapshot")
    .option("-t, --ticker <ticker>", "Indices ticker")
    .action(async (options) => {
      const params: DefaultApiGetIndicesSnapshotRequest = {
        tickerAnyOf: options.ticker,
      };
      await output(api.getIndicesSnapshot(params));
    });

  indices
    .command("previous")
    .description("Indices previous day aggregates")
    .requiredOption("-t, --ticker <ticker>", "Indices ticker")
    .action(async (options) => {
      const params: DefaultApiGetPreviousIndicesAggregatesRequest = {
        indicesTicker: options.ticker,
      };
      await output(api.getPreviousIndicesAggregates(params));
    });

  indices
    .command("sma")
    .description("Indices SMA")
    .requiredOption("-t, --ticker <ticker>", "Indices ticker")
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
    .action(async (options) => {
      const params: DefaultApiGetIndicesSMARequest = {
        indicesTicker: options.ticker,
        timestamp: options.timestamp,
        timespan: options.timespan as GetIndicesSMATimespanEnum,
        adjusted: options.adjusted,
        window: num(options.window),
        seriesType: options["series-type"] as GetIndicesSMASeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        order: options.order as GetIndicesSMAOrderEnum,
        limit: num(options.limit),
      };
      await output(api.getIndicesSMA(params));
    });

  indices
    .command("ema")
    .description("Indices EMA")
    .requiredOption("-t, --ticker <ticker>", "Indices ticker")
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
    .action(async (options) => {
      const params: DefaultApiGetIndicesEMARequest = {
        indicesTicker: options.ticker,
        timestamp: options.timestamp,
        timespan: options.timespan as GetIndicesEMATimespanEnum,
        adjusted: options.adjusted,
        window: num(options.window),
        seriesType: options["series-type"] as GetIndicesEMASeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        order: options.order as GetIndicesEMAOrderEnum,
        limit: num(options.limit),
      };
      await output(api.getIndicesEMA(params));
    });

  indices
    .command("rsi")
    .description("Indices RSI")
    .requiredOption("-t, --ticker <ticker>", "Indices ticker")
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
    .action(async (options) => {
      const params: DefaultApiGetIndicesRSIRequest = {
        indicesTicker: options.ticker,
        timestamp: options.timestamp,
        timespan: options.timespan as GetIndicesRSITimespanEnum,
        adjusted: options.adjusted,
        window: num(options.window),
        seriesType: options["series-type"] as GetIndicesRSISeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        order: options.order as GetIndicesRSIOrderEnum,
        limit: num(options.limit),
      };
      await output(api.getIndicesRSI(params));
    });

  indices
    .command("macd")
    .description("Indices MACD")
    .requiredOption("-t, --ticker <ticker>", "Indices ticker")
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
    .action(async (options) => {
      const params: DefaultApiGetIndicesMACDRequest = {
        indicesTicker: options.ticker,
        timestamp: options.timestamp,
        timespan: options.timespan as GetIndicesMACDTimespanEnum,
        adjusted: options.adjusted,
        shortWindow: num(options["short-window"]),
        longWindow: num(options["long-window"]),
        signalWindow: num(options["signal-window"]),
        seriesType: options["series-type"] as GetIndicesMACDSeriesTypeEnum,
        expandUnderlying: options["expand-underlying"],
        order: options.order as GetIndicesMACDOrderEnum,
        limit: num(options.limit),
      };
      await output(api.getIndicesMACD(params));
    });

  return indices;
}
