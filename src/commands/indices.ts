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
  DefaultApiGetIndicesEMARequest,
  GetIndicesEMATimespanEnum,
  GetIndicesEMASeriesTypeEnum,
  DefaultApiGetIndicesRSIRequest,
  GetIndicesRSITimespanEnum,
  GetIndicesRSISeriesTypeEnum,
  DefaultApiGetIndicesMACDRequest,
  GetIndicesMACDTimespanEnum,
  GetIndicesEMAOrderEnum,
  GetIndicesRSIOrderEnum,
  GetIndicesMACDSeriesTypeEnum,
  GetIndicesMACDOrderEnum,
  GetIndicesSMAOrderEnum,
} from "@massive.com/client-js";
import { api } from "../lib/api";
import type { CommandMap } from "../lib/types";
import { output, requireFlag, num, bool } from "../lib/utils";

export const indicesCommands: CommandMap = {
  "indices-aggs": {
    desc: "Indices aggregate bars",
    usage:
      "--ticker I:SPX --from 2025-01-01 --to 2025-01-31 [--timespan day] [--multiplier 1] [--sort asc] [--limit 120]",
    handler: async (_api, f) => {
      const params: DefaultApiGetIndicesAggregatesRequest = {
        indicesTicker: requireFlag(f, "ticker"),
        multiplier: num(f.multiplier) ?? 1,
        timespan: (f.timespan ?? "day") as GetIndicesAggregatesTimespanEnum,
        from: requireFlag(f, "from"),
        to: requireFlag(f, "to"),
        sort: f.sort as GetIndicesAggregatesSortEnum,
        limit: num(f.limit),
      };
      await output(api.getIndicesAggregates(params));
    },
  },
  "indices-open-close": {
    desc: "Indices open/close",
    usage: "--ticker I:SPX --date 2025-01-15",
    handler: async (_api, f) => {
      const params: DefaultApiGetIndicesOpenCloseRequest = {
        indicesTicker: requireFlag(f, "ticker"),
        date: requireFlag(f, "date"),
      };
      await output(api.getIndicesOpenClose(params));
    },
  },
  "indices-snapshot": {
    desc: "Indices snapshot",
    usage: "[--ticker I:SPX]",
    handler: async (_api, f) => {
      const params: DefaultApiGetIndicesSnapshotRequest = {
        tickerAnyOf: f.ticker,
      };
      await output(api.getIndicesSnapshot(params));
    },
  },
  "indices-previous": {
    desc: "Indices previous day aggregates",
    usage: "--ticker I:SPX",
    handler: async (_api, f) => {
      const params: DefaultApiGetPreviousIndicesAggregatesRequest = {
        indicesTicker: requireFlag(f, "ticker"),
      };
      await output(api.getPreviousIndicesAggregates(params));
    },
  },
  "indices-sma": {
    desc: "Indices SMA",
    usage:
      "--ticker I:SPX [--timestamp 2025-01-01] [--timespan day] [--adjusted true] [--window 50] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetIndicesSMARequest = {
        indicesTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetIndicesSMATimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetIndicesSMASeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetIndicesSMAOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getIndicesSMA(params));
    },
  },
  "indices-ema": {
    desc: "Indices EMA",
    usage:
      "--ticker I:SPX [--timestamp 2025-01-01] [--timespan day] [--adjusted true] [--window 50] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetIndicesEMARequest = {
        indicesTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetIndicesEMATimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetIndicesEMASeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetIndicesEMAOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getIndicesEMA(params));
    },
  },
  "indices-rsi": {
    desc: "Indices RSI",
    usage:
      "--ticker I:SPX [--timestamp 2025-01-01] [--timespan day] [--adjusted true] [--window 14] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetIndicesRSIRequest = {
        indicesTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetIndicesRSITimespanEnum,
        adjusted: bool(f.adjusted),
        window: num(f.window),
        seriesType: f["series-type"] as GetIndicesRSISeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetIndicesRSIOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getIndicesRSI(params));
    },
  },
  "indices-macd": {
    desc: "Indices MACD",
    usage:
      "--ticker I:SPX [--timestamp 2025-01-01] [--timespan day] [--adjusted true] [--short-window 12] [--long-window 26] [--signal-window 9] [--series-type close] [--expand-underlying false] [--order asc] [--limit 10]",
    handler: async (_api, f) => {
      const params: DefaultApiGetIndicesMACDRequest = {
        indicesTicker: requireFlag(f, "ticker"),
        timestamp: f.timestamp,
        timespan: f.timespan as GetIndicesMACDTimespanEnum,
        adjusted: bool(f.adjusted),
        shortWindow: num(f["short-window"]),
        longWindow: num(f["long-window"]),
        signalWindow: num(f["signal-window"]),
        seriesType: f["series-type"] as GetIndicesMACDSeriesTypeEnum,
        expandUnderlying: bool(f["expand-underlying"]),
        order: f.order as GetIndicesMACDOrderEnum,
        limit: num(f.limit),
      };
      await output(api.getIndicesMACD(params));
    },
  },
};
