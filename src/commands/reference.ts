import { Command } from "commander";
import type {
  DefaultApiListTickersRequest,
  ListTickersTypeEnum,
  ListTickersMarketEnum,
  ListTickersOrderEnum,
  ListTickersSortEnum,
  DefaultApiGetTickerRequest,
  DefaultApiListTickerTypesRequest,
  ListTickerTypesAssetClassEnum,
  ListTickerTypesLocaleEnum,
  DefaultApiListExchangesRequest,
  ListExchangesAssetClassEnum,
  ListExchangesLocaleEnum,
  DefaultApiListConditionsRequest,
  ListConditionsAssetClassEnum,
  ListConditionsDataTypeEnum,
  ListConditionsSipEnum,
  ListConditionsSortEnum,
  DefaultApiListDividendsRequest,
  ListDividendsOrderEnum,
  ListDividendsSortEnum,
  ListDividendsFrequencyEnum,
  DefaultApiListStockSplitsRequest,
  ListStockSplitsOrderEnum,
  ListStockSplitsSortEnum,
  DefaultApiListFinancialsRequest,
  ListFinancialsOrderEnum,
  ListFinancialsSortEnum,
  ListFinancialsTimeframeEnum,
  DefaultApiListIPOsRequest,
  ListIPOsOrderEnum,
  ListIPOsSortEnum,
  DefaultApiGetRelatedCompaniesRequest,
} from "@massive.com/client-js";
import { api } from "../lib/api";
import { output, num } from "../lib/utils";

export function createTickersCommand(): Command {
  return new Command("tickers")
    .description("List/search tickers")
    .option("--search <search>", "Search query")
    .option("-t, --type <type>", "Ticker type (CS, etc.)")
    .option("-m, --market <market>", "Market (stocks, crypto, forex)")
    .option("-e, --exchange <exchange>", "Exchange code")
    .option("-c, --cusip <cusip>", "CUSIP")
    .option("--cik <cik>", "CIK")
    .option("-d, --date <date>", "Date (YYYY-MM-DD)")
    .option("-a, --active", "Active only")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-s, --sort <sort>", "Sort field", "ticker")
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .action(async (options) => {
      const params: DefaultApiListTickersRequest = {
        ticker: options.ticker,
        type: options.type as ListTickersTypeEnum,
        market: options.market as ListTickersMarketEnum,
        exchange: options.exchange,
        cusip: options.cusip,
        cik: options.cik,
        date: options.date,
        search: options.search,
        active: options.active,
        order: options.order as ListTickersOrderEnum,
        limit: num(options.limit),
        sort: options.sort as ListTickersSortEnum,
      };
      await output(api.listTickers(params));
    });
}

export function createTickerDetailsCommand(): Command {
  return new Command("ticker-details")
    .description("Ticker details")
    .requiredOption("-t, --ticker <ticker>", "Ticker symbol")
    .option("-d, --date <date>", "Date (YYYY-MM-DD)")
    .action(async (options) => {
      const params: DefaultApiGetTickerRequest = {
        ticker: options.ticker,
        date: options.date,
      };
      await output(api.getTicker(params));
    });
}

export function createTickerTypesCommand(): Command {
  return new Command("ticker-types")
    .description("List ticker types")
    .option(
      "--asset-class <asset-class>",
      "Asset class (stocks, crypto, forex)",
    )
    .option("-l, --locale <locale>", "Locale (us, global)")
    .action(async (options) => {
      const params: DefaultApiListTickerTypesRequest = {
        assetClass: options["asset-class"] as ListTickerTypesAssetClassEnum,
        locale: options.locale as ListTickerTypesLocaleEnum,
      };
      await output(api.listTickerTypes(params));
    });
}

export function createExchangesCommand(): Command {
  return new Command("exchanges")
    .description("List exchanges")
    .option(
      "--asset-class <asset-class>",
      "Asset class (stocks, crypto, forex)",
    )
    .option("-l, --locale <locale>", "Locale (us, global)")
    .action(async (options) => {
      const params: DefaultApiListExchangesRequest = {
        assetClass: options["asset-class"] as ListExchangesAssetClassEnum,
        locale: options.locale as ListExchangesLocaleEnum,
      };
      await output(api.listExchanges(params));
    });
}

export function createConditionsCommand(): Command {
  return new Command("conditions")
    .description("List conditions")
    .option(
      "--asset-class <asset-class>",
      "Asset class (stocks, crypto, forex)",
    )
    .option("--data-type <data-type>", "Data type (trade, quote)")
    .option("-i, --id <id>", "Condition ID")
    .option("-s, --sip <sip>", "SIP (CTA, UTP, etc.)")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("--sort <sort>", "Sort field", "name")
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .action(async (options) => {
      const params: DefaultApiListConditionsRequest = {
        assetClass: options["asset-class"] as ListConditionsAssetClassEnum,
        dataType: options["data-type"] as ListConditionsDataTypeEnum,
        id: num(options.id),
        sip: options.sip as ListConditionsSipEnum,
        order: options.order,
        limit: num(options.limit),
        sort: options.sort as ListConditionsSortEnum,
      };
      await output(api.listConditions(params));
    });
}

export function createDividendsCommand(): Command {
  return new Command("dividends")
    .description("List dividends")
    .option("-t, --ticker <ticker>", "Ticker symbol")
    .option("--ex-dividend-date <date>", "Ex-dividend date")
    .option("--record-date <date>", "Record date")
    .option("--declaration-date <date>", "Declaration date")
    .option("--pay-date <date>", "Pay date")
    .option("-f, --frequency <number>", "Frequency")
    .option("--cash-amount <number>", "Cash amount")
    .option("--dividend-type <type>", "Dividend type")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-s, --sort <sort>", "Sort field", "ex_dividend_date")
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .action(async (options) => {
      const params: DefaultApiListDividendsRequest = {
        ticker: options.ticker,
        exDividendDate: options["ex-dividend-date"],
        recordDate: options["record-date"],
        declarationDate: options["declaration-date"],
        payDate: options["pay-date"],
        frequency: num(options.frequency) as ListDividendsFrequencyEnum,
        cashAmount: num(options["cash-amount"]),
        dividendType: options["dividend-type"] as any,
        order: options.order as ListDividendsOrderEnum,
        limit: num(options.limit),
        sort: options.sort as ListDividendsSortEnum,
      };
      await output(api.listDividends(params));
    });
}

export function createStockSplitsCommand(): Command {
  return new Command("stock-splits")
    .description("List stock splits")
    .option("-t, --ticker <ticker>", "Ticker symbol")
    .option("--execution-date <date>", "Execution date")
    .option("--reverse-split", "Reverse split")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-s, --sort <sort>", "Sort field", "execution_date")
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .action(async (options) => {
      const params: DefaultApiListStockSplitsRequest = {
        ticker: options.ticker,
        executionDate: options["execution-date"],
        reverseSplit: options.reverseSplit,
        order: options.order as ListStockSplitsOrderEnum,
        limit: num(options.limit),
        sort: options.sort as ListStockSplitsSortEnum,
      };
      await output(api.listStockSplits(params));
    });
}

export function createFinancialsCommand(): Command {
  return new Command("financials")
    .description("Company financials")
    .option("-t, --ticker <ticker>", "Ticker symbol")
    .option("--cik <cik>", "CIK")
    .option("--company-name <name>", "Company name")
    .option("--sic <sic>", "SIC code")
    .option("--filing-date <date>", "Filing date")
    .option("--period-of-report-date <date>", "Period of report date")
    .option(
      "--timeframe <timeframe>",
      "Timeframe (annual, quarterly)",
      "quarterly",
    )
    .option("--include-sources", "Include sources", false)
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-s, --sort <sort>", "Sort field", "filing_date")
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .action(async (options) => {
      const params: DefaultApiListFinancialsRequest = {
        ticker: options.ticker,
        cik: options.cik,
        companyName: options["company-name"],
        sic: options.sic,
        filingDate: options["filing-date"],
        periodOfReportDate: options["period-of-report-date"],
        timeframe: options.timeframe as ListFinancialsTimeframeEnum,
        includeSources: options["include-sources"],
        order: options.order as ListFinancialsOrderEnum,
        limit: num(options.limit),
        sort: options.sort as ListFinancialsSortEnum,
      };
      await output(api.listFinancials(params));
    });
}

export function createIposCommand(): Command {
  return new Command("ipos")
    .description("List IPOs")
    .option("-t, --ticker <ticker>", "Ticker symbol")
    .option("--us-code <code>", "US code")
    .option("--isin <isin>", "ISIN")
    .option("--listing-date <date>", "Listing date")
    .option("-l, --limit <number>", "Limit number of results", "10")
    .option("-s, --sort <sort>", "Sort field", "listing_date")
    .option("-o, --order <order>", "Order (asc, desc)", "asc")
    .action(async (options) => {
      const params: DefaultApiListIPOsRequest = {
        ticker: options.ticker,
        usCode: options["us-code"],
        isin: options.isin,
        listingDate: options["listing-date"],
        order: options.order as ListIPOsOrderEnum,
        limit: num(options.limit),
        sort: options.sort as ListIPOsSortEnum,
      };
      await output(api.listIPOs(params));
    });
}

export function createRelatedCompaniesCommand(): Command {
  return new Command("related-companies")
    .description("Related companies")
    .requiredOption("-t, --ticker <ticker>", "Ticker symbol")
    .action(async (options) => {
      const params: DefaultApiGetRelatedCompaniesRequest = {
        ticker: options.ticker,
      };
      await output(api.getRelatedCompanies(params));
    });
}
