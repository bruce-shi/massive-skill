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
  ListConditionsSortEnum,
} from "@massive.com/client-js";
import { api } from "../lib/api";
import type { CommandMap } from "../lib/types";
import { output, requireFlag, num, bool } from "../lib/utils";

export const referenceCommands: CommandMap = {
  tickers: {
    desc: "List/search tickers",
    usage:
      "[--search apple] [--type CS] [--market stocks] [--exchange NYS] [--cusip ...] [--cik ...] [--date 2025-01-01] [--active true] [--limit 10] [--sort ticker] [--order asc]",
    handler: async (_api, f) => {
      const params: DefaultApiListTickersRequest = {
        ticker: f.ticker,
        type: f.type as ListTickersTypeEnum,
        market: f.market as ListTickersMarketEnum,
        exchange: f.exchange,
        cusip: f.cusip,
        cik: f.cik,
        date: f.date,
        search: f.search,
        active: bool(f.active),
        order: f.order as ListTickersOrderEnum,
        limit: num(f.limit),
        sort: f.sort as ListTickersSortEnum,
      };
      await output(api.listTickers(params));
    },
  },
  "ticker-details": {
    desc: "Ticker details",
    usage: "--ticker AAPL [--date 2025-01-01]",
    handler: async (_api, f) => {
      const params: DefaultApiGetTickerRequest = {
        ticker: requireFlag(f, "ticker"),
        date: f.date,
      };
      await output(api.getTicker(params));
    },
  },
  "ticker-types": {
    desc: "List ticker types",
    usage: "[--asset-class stocks] [--locale us]",
    handler: async (_api, f) => {
      const params: DefaultApiListTickerTypesRequest = {
        assetClass: f["asset-class"] as ListTickerTypesAssetClassEnum,
        locale: f.locale as ListTickerTypesLocaleEnum,
      };
      await output(api.listTickerTypes(params));
    },
  },
  exchanges: {
    desc: "List exchanges",
    usage: "[--asset-class stocks] [--locale us]",
    handler: async (_api, f) => {
      const params: DefaultApiListExchangesRequest = {
        assetClass: f["asset-class"] as ListExchangesAssetClassEnum,
        locale: f.locale as ListExchangesLocaleEnum,
      };
      await output(api.listExchanges(params));
    },
  },
  conditions: {
    desc: "List conditions",
    usage:
      "[--asset-class stocks] [--data-type trade] [--id 1] [--sip CTA] [--limit 10] [--sort name] [--order asc]",
    handler: async (_api, f) => {
      const params: DefaultApiListConditionsRequest = {
        assetClass: f["asset-class"] as ListConditionsAssetClassEnum,
        dataType: f["data-type"] as ListConditionsDataTypeEnum,
        id: num(f.id),
        sip: f.sip as ListConditionsSipEnum,
        // @ts-expect-error - The client library definition might be missing sort, order, limit
        order: f.order,
        limit: num(f.limit),
        sort: f.sort! as ListConditionsSortEnum,
      };
      await output(api.listConditions(params));
    },
  },
  dividends: {
    desc: "List dividends",
    usage:
      "[--ticker AAPL] [--ex-dividend-date 2025-01-01] [--record-date 2025-01-01] [--declaration-date 2025-01-01] [--pay-date 2025-01-01] [--frequency 4] [--cash-amount 0.23] [--dividend-type CD] [--limit 10] [--sort ex_dividend_date] [--order asc]",
    handler: async (_api, f) => {
      const params: DefaultApiListDividendsRequest = {
        ticker: f.ticker,
        exDividendDate: f["ex-dividend-date"],
        recordDate: f["record-date"],
        declarationDate: f["declaration-date"],
        payDate: f["pay-date"],
        frequency: num(f.frequency) as ListDividendsFrequencyEnum,
        cashAmount: num(f["cash-amount"]),
        dividendType: f["dividend-type"] as any, // Enum might be missing or complex
        order: f.order as ListDividendsOrderEnum,
        limit: num(f.limit),
        sort: f.sort as ListDividendsSortEnum,
      };
      await output(api.listDividends(params));
    },
  },
  "stock-splits": {
    desc: "List stock splits",
    usage:
      "[--ticker AAPL] [--execution-date 2025-01-01] [--reverse-split false] [--limit 10] [--sort execution_date] [--order asc]",
    handler: async (_api, f) => {
      const params: DefaultApiListStockSplitsRequest = {
        ticker: f.ticker,
        executionDate: f["execution-date"],
        reverseSplit: bool(f["reverse-split"]),
        order: f.order as ListStockSplitsOrderEnum,
        limit: num(f.limit),
        sort: f.sort as ListStockSplitsSortEnum,
      };
      await output(api.listStockSplits(params));
    },
  },
  financials: {
    desc: "Company financials",
    usage:
      "[--ticker AAPL] [--cik ...] [--company-name ...] [--sic ...] [--filing-date 2025-01-01] [--period-of-report-date 2025-01-01] [--timeframe quarterly] [--include-sources false] [--limit 10] [--sort filing_date] [--order asc]",
    handler: async (_api, f) => {
      const params: DefaultApiListFinancialsRequest = {
        ticker: f.ticker,
        cik: f.cik,
        companyName: f["company-name"],
        sic: f.sic,
        filingDate: f["filing-date"],
        periodOfReportDate: f["period-of-report-date"],
        timeframe: f.timeframe as ListFinancialsTimeframeEnum,
        includeSources: bool(f["include-sources"]),
        order: f.order as ListFinancialsOrderEnum,
        limit: num(f.limit),
        sort: f.sort as ListFinancialsSortEnum,
      };
      await output(api.listFinancials(params));
    },
  },
  ipos: {
    desc: "List IPOs",
    usage:
      "[--ticker AAPL] [--us-code ...] [--isin ...] [--listing-date 2025-01-15] [--limit 10] [--sort listing_date] [--order asc]",
    handler: async (_api, f) => {
      const params: DefaultApiListIPOsRequest = {
        ticker: f.ticker,
        usCode: f["us-code"],
        isin: f.isin,
        listingDate: f["listing-date"],
        order: f.order as ListIPOsOrderEnum,
        limit: num(f.limit),
        sort: f.sort as ListIPOsSortEnum,
      };
      await output(api.listIPOs(params));
    },
  },
  "related-companies": {
    desc: "Related companies",
    usage: "--ticker AAPL",
    handler: async (_api, f) => {
      const params: DefaultApiGetRelatedCompaniesRequest = {
        ticker: requireFlag(f, "ticker"),
      };
      await output(api.getRelatedCompanies(params));
    },
  },
};
