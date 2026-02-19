import { Command } from "commander";
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
import { output, num } from "../lib/utils";

export function createCryptoCommand(): Command {
  const crypto = new Command("crypto").description(
    "Cryptocurrency market data commands",
  );

  crypto
    .command("aggs")
    .description("Crypto aggregate bars")
    .requiredOption("-t, --ticker <ticker>", "Crypto ticker (e.g., X:BTCUSD)")
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
      const params: DefaultApiGetCryptoAggregatesRequest = {
        cryptoTicker: options.ticker,
        multiplier: num(options.multiplier) ?? 1,
        timespan: (options.timespan ??
          "day") as GetCryptoAggregatesTimespanEnum,
        from: options.from,
        to: options.to,
        adjusted: options.adjusted ?? true,
        sort: (options.sort ?? "asc") as GetCryptoAggregatesSortEnum,
        limit: num(options.limit) ?? 120,
      };
      await output(api.getCryptoAggregates(params));
    });

  crypto
    .command("trades")
    .description("Crypto trades")
    .requiredOption("-t, --ticker <ticker>", "Crypto ticker")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option("--timestamp-gte <timestamp>", "Timestamp greater than or equal")
    .option("--timestamp-gt <timestamp>", "Timestamp greater than")
    .option("--timestamp-lte <timestamp>", "Timestamp less than or equal")
    .option("--timestamp-lt <timestamp>", "Timestamp less than")
    .option("-o, --order <order>", "Order (asc, desc)")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-s, --sort <sort>", "Sort field", "timestamp")
    .action(async (options) => {
      const params: DefaultApiGetCryptoTradesRequest = {
        cryptoTicker: options.ticker,
        timestamp: options.timestamp,
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
        order: options.order as GetCryptoTradesOrderEnum,
        limit: num(options.limit),
        sort: options.sort as GetCryptoTradesSortEnum,
      };
      await output(api.getCryptoTrades(params));
    });

  crypto
    .command("snapshot")
    .description("Crypto ticker snapshot")
    .requiredOption("-t, --ticker <ticker>", "Crypto ticker")
    .action(async (options) => {
      const params: DefaultApiGetCryptoSnapshotTickerRequest = {
        ticker: options.ticker,
      };
      await output(api.getCryptoSnapshotTicker(params));
    });

  crypto
    .command("snapshot-direction")
    .description("Crypto snapshot direction")
    .requiredOption(
      "-d, --direction <direction>",
      "Direction (gainers, losers)",
    )
    .action(async (options) => {
      await output(
        api.getCryptoSnapshotDirection({ direction: options.direction as any }),
      );
    });

  crypto
    .command("snapshot-tickers")
    .description("Crypto snapshot tickers")
    .option("-t, --tickers <tickers>", "Comma-separated tickers")
    .action(async (options) => {
      const tickers = options.tickers
        ? options.tickers.split(",").map((s: string) => s.trim())
        : undefined;
      await output(api.getCryptoSnapshotTickers({ tickers }));
    });

  crypto
    .command("open-close")
    .description("Crypto daily open/close")
    .requiredOption("-f, --from <from>", "From currency (e.g., BTC)")
    .requiredOption("-t, --to <to>", "To currency (e.g., USD)")
    .requiredOption("-d, --date <date>", "Date (YYYY-MM-DD)")
    .option("-a, --adjusted", "Adjust for splits")
    .action(async (options) => {
      const params: DefaultApiGetCryptoOpenCloseRequest = {
        from: options.from,
        to: options.to,
        date: options.date,
        adjusted: options.adjusted,
      };
      await output(api.getCryptoOpenClose(params));
    });

  crypto
    .command("previous")
    .description("Crypto previous day aggregates")
    .requiredOption("-t, --ticker <ticker>", "Crypto ticker")
    .option("-a, --adjusted", "Adjust for splits")
    .action(async (options) => {
      const params: DefaultApiGetPreviousCryptoAggregatesRequest = {
        cryptoTicker: options.ticker,
        adjusted: options.adjusted,
      };
      await output(api.getPreviousCryptoAggregates(params));
    });

  crypto
    .command("grouped")
    .description("Crypto grouped daily aggregates")
    .requiredOption("-d, --date <date>", "Date (YYYY-MM-DD)")
    .option("-a, --adjusted", "Adjust for splits")
    .action(async (options) => {
      const params: DefaultApiGetGroupedCryptoAggregatesRequest = {
        date: options.date,
        adjusted: options.adjusted,
      };
      await output(api.getGroupedCryptoAggregates(params));
    });

  crypto
    .command("sma")
    .description("Crypto SMA")
    .requiredOption("-t, --ticker <ticker>", "Crypto ticker")
    .option("--timespan <timespan>", "Timespan", "day")
    .option("-w, --window <number>", "Window size", "50")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option(
      "--series-type <type>",
      "Series type (open, high, low, close)",
      "close",
    )
    .option("--expand-underlying", "Expand underlying", false)
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .action(async (options) => {
      const params: DefaultApiGetCryptoSMARequest = {
        cryptoTicker: options.ticker,
        timestamp: options.timestamp,
        timespan: options.timespan as GetCryptoSMATimespanEnum,
        window: num(options.window),
        seriesType: options["series-type"] as any,
        expandUnderlying: options["expand-underlying"],
        order: options.order as any,
        limit: num(options.limit),
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
      };
      await output(api.getCryptoSMA(params));
    });

  crypto
    .command("ema")
    .description("Crypto EMA")
    .requiredOption("-t, --ticker <ticker>", "Crypto ticker")
    .option("--timespan <timespan>", "Timespan", "day")
    .option("-w, --window <number>", "Window size", "50")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option(
      "--series-type <type>",
      "Series type (open, high, low, close)",
      "close",
    )
    .option("--expand-underlying", "Expand underlying", false)
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .action(async (options) => {
      const params: DefaultApiGetCryptoEMARequest = {
        cryptoTicker: options.ticker,
        timestamp: options.timestamp,
        timespan: options.timespan as GetCryptoEMATimespanEnum,
        window: num(options.window),
        seriesType: options["series-type"] as any,
        expandUnderlying: options["expand-underlying"],
        order: options.order as any,
        limit: num(options.limit),
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
      };
      await output(api.getCryptoEMA(params));
    });

  crypto
    .command("rsi")
    .description("Crypto RSI")
    .requiredOption("-t, --ticker <ticker>", "Crypto ticker")
    .option("--timespan <timespan>", "Timespan", "day")
    .option("-w, --window <number>", "Window size", "14")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option(
      "--series-type <type>",
      "Series type (open, high, low, close)",
      "close",
    )
    .option("--expand-underlying", "Expand underlying", false)
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .action(async (options) => {
      const params: DefaultApiGetCryptoRSIRequest = {
        cryptoTicker: options.ticker,
        timestamp: options.timestamp,
        timespan: options.timespan as GetCryptoRSITimespanEnum,
        window: num(options.window),
        seriesType: options["series-type"] as any,
        expandUnderlying: options["expand-underlying"],
        order: options.order as any,
        limit: num(options.limit),
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
      };
      await output(api.getCryptoRSI(params));
    });

  crypto
    .command("macd")
    .description("Crypto MACD")
    .requiredOption("-t, --ticker <ticker>", "Crypto ticker")
    .option("--timespan <timespan>", "Timespan", "day")
    .option("--short-window <number>", "Short window", "12")
    .option("--long-window <number>", "Long window", "26")
    .option("--signal-window <number>", "Signal window", "9")
    .option("--timestamp <timestamp>", "Timestamp filter")
    .option(
      "--series-type <type>",
      "Series type (open, high, low, close)",
      "close",
    )
    .option("--expand-underlying", "Expand underlying", false)
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .action(async (options) => {
      const params: DefaultApiGetCryptoMACDRequest = {
        cryptoTicker: options.ticker,
        timestamp: options.timestamp,
        timespan: options.timespan as GetCryptoMACDTimespanEnum,
        shortWindow: num(options["short-window"]),
        longWindow: num(options["long-window"]),
        signalWindow: num(options["signal-window"]),
        seriesType: options["series-type"] as any,
        expandUnderlying: options["expand-underlying"],
        order: options.order as any,
        limit: num(options.limit),
        timestampGte: options["timestamp-gte"],
        timestampGt: options["timestamp-gt"],
        timestampLte: options["timestamp-lte"],
        timestampLt: options["timestamp-lt"],
      };
      await output(api.getCryptoMACD(params));
    });

  crypto
    .command("last-trade")
    .description("Last crypto trade")
    .requiredOption("-f, --from <from>", "From currency (e.g., BTC)")
    .requiredOption("-t, --to <to>", "To currency (e.g., USD)")
    .action(async (options) => {
      const params: DefaultApiGetLastCryptoTradeRequest = {
        from: options.from,
        to: options.to,
      };
      await output(api.getLastCryptoTrade(params));
    });

  return crypto;
}
