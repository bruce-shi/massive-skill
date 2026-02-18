import { Command } from "commander";
import type {
  DefaultApiListNewsRequest,
  ListNewsOrderEnum,
  ListNewsSortEnum,
} from "@massive.com/client-js";
import { api } from "../lib/api";
import { output, num } from "../lib/utils";

export function createNewsCommand(): Command {
  return new Command("news")
    .description("Market news")
    .option("-t, --ticker <ticker>", "Ticker symbol")
    .option("--published-utc <date>", "Published UTC date (YYYY-MM-DD)")
    .option("--ticker-gte <ticker>", "Ticker greater than or equal")
    .option("--ticker-gt <ticker>", "Ticker greater than")
    .option("--ticker-lte <ticker>", "Ticker less than or equal")
    .option("--ticker-lt <ticker>", "Ticker less than")
    .option("--published-utc-gte <date>", "Published UTC greater than or equal")
    .option("--published-utc-gt <date>", "Published UTC greater than")
    .option("--published-utc-lte <date>", "Published UTC less than or equal")
    .option("--published-utc-lt <date>", "Published UTC less than")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-s, --sort <sort>", "Sort field", "published_utc")
    .option("-o, --order <order>", "Order (asc, desc)", "desc")
    .action(async (options) => {
      const params: DefaultApiListNewsRequest = {
        ticker: options.ticker,
        publishedUtc: options["published-utc"],
        tickerGte: options["ticker-gte"],
        tickerGt: options["ticker-gt"],
        tickerLte: options["ticker-lte"],
        tickerLt: options["ticker-lt"],
        publishedUtcGte: options["published-utc-gte"],
        publishedUtcGt: options["published-utc-gt"],
        publishedUtcLte: options["published-utc-lte"],
        publishedUtcLt: options["published-utc-lt"],
        order: options.order as ListNewsOrderEnum,
        limit: num(options.limit),
        sort: options.sort as ListNewsSortEnum,
      };
      await output(api.listNews(params));
    });
}
