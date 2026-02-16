import type {
  DefaultApiListNewsRequest,
  ListNewsOrderEnum,
  ListNewsSortEnum,
} from "@massive.com/client-js";
import { api } from "../lib/api";
import type { CommandMap } from "../lib/types";
import { output, num } from "../lib/utils";

export const newsCommands: CommandMap = {
  news: {
    desc: "Market news",
    usage:
      "[--ticker AAPL] [--published-utc 2025-01-01] [--ticker-gte AAPL] [--ticker-gt AAPL] [--ticker-lte AAPL] [--ticker-lt AAPL] [--published-utc-gte 2025-01-01] [--published-utc-gt 2025-01-01] [--published-utc-lte 2025-01-01] [--published-utc-lt 2025-01-01] [--limit 10] [--sort published_utc] [--order desc]",
    handler: async (_api, f) => {
      const params: DefaultApiListNewsRequest = {
        ticker: f.ticker,
        publishedUtc: f["published-utc"],
        tickerGte: f["ticker-gte"],
        tickerGt: f["ticker-gt"],
        tickerLte: f["ticker-lte"],
        tickerLt: f["ticker-lt"],
        publishedUtcGte: f["published-utc-gte"],
        publishedUtcGt: f["published-utc-gt"],
        publishedUtcLte: f["published-utc-lte"],
        publishedUtcLt: f["published-utc-lt"],
        order: f.order as ListNewsOrderEnum,
        limit: num(f.limit),
        sort: f.sort as ListNewsSortEnum,
      };
      await output(api.listNews(params));
    },
  },
};
