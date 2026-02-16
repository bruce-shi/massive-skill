# Reference Data Commands Reference

This document provides a reference for the reference data commands available in the Polygon CLI.

## Commands

### tickers
Query all ticker symbols which are supported by Polygon.io.

**Usage:**
```bash
bun cli.js tickers [options]
```

**Parameters:**
- `--ticker` (string): Specify a ticker symbol.
- `--type` (string): Specify the type of the tickers (e.g., CS, ETF).
- `--market` (string): Filter by market type (stocks, crypto, fx, otc, indices).
- `--exchange` (string): Specify the primary exchange MIC.
- `--cusip` (string): Search by CUSIP.
- `--cik` (string): Search by CIK.
- `--date` (string): Specify a date for the ticker search (YYYY-MM-DD).
- `--search` (string): Search for terms within the ticker and/or company name.
- `--active` (boolean): Filter for active/inactive tickers (default: true).
- `--sort` (string): Sort field (ticker, type).
- `--order` (string): Sort order (asc, desc).
- `--limit` (number): Max results (default: 10).

**Example:**
```bash
bun cli.js tickers --search apple --market stocks --active true
```

### ticker-details
Get a single ticker supported by Polygon.io.

**Usage:**
```bash
bun cli.js ticker-details --ticker <ticker> [options]
```

**Parameters:**
- `--ticker` (required): The ticker symbol.
- `--date` (string): Specify a point in time for the ticker details (YYYY-MM-DD).

**Example:**
```bash
bun cli.js ticker-details --ticker AAPL
```

### ticker-types
Get a mapping of ticker types to their type code.

**Usage:**
```bash
bun cli.js ticker-types [options]
```

**Parameters:**
- `--asset-class` (string): Filter by asset class (stocks, options, crypto, fx, indices).
- `--locale` (string): Filter by locale (us, global).

**Example:**
```bash
bun cli.js ticker-types --asset-class stocks
```

### exchanges
List all exchanges that Polygon.io knows about.

**Usage:**
```bash
bun cli.js exchanges [options]
```

**Parameters:**
- `--asset-class` (string): Filter by asset class.
- `--locale` (string): Filter by locale.

**Example:**
```bash
bun cli.js exchanges --asset-class stocks
```

### conditions
List all conditions that Polygon.io uses.

**Usage:**
```bash
bun cli.js conditions [options]
```

**Parameters:**
- `--asset-class` (string): Filter by asset class.
- `--data-type` (string): Filter by data type (trade, bbo, nbbo).
- `--id` (number): Filter by condition ID.
- `--sip` (string): Filter by SIP (CTA, UTP, OPRA).
- `--sort` (string): Sort field.
- `--order` (string): Sort order.
- `--limit` (number): Max results.

**Example:**
```bash
bun cli.js conditions --asset-class stocks
```

### dividends
Get a list of historical cash dividends, including the ticker symbol, declaration date, ex-dividend date, record date, pay date, frequency, and amount.

**Usage:**
```bash
bun cli.js dividends [options]
```

**Parameters:**
- `--ticker` (string): Filter by ticker.
- `--ex-dividend-date` (string): Query by ex-dividend date.
- `--record-date` (string): Query by record date.
- `--declaration-date` (string): Query by declaration date.
- `--pay-date` (string): Query by pay date.
- `--frequency` (number): Frequency (0=one-time, 1=annually, 4=quarterly, etc.).
- `--cash-amount` (number): Query by cash amount.
- `--dividend-type` (string): Query by dividend type (CD, SC, LT, etc.).
- `--sort` (string): Sort field.
- `--order` (string): Sort order.
- `--limit` (number): Max results.

**Example:**
```bash
bun cli.js dividends --ticker AAPL
```

### stock-splits
Get a list of historical stock splits, including the ticker symbol, the execution date, and the split ratio.

**Usage:**
```bash
bun cli.js stock-splits [options]
```

**Parameters:**
- `--ticker` (string): Filter by ticker.
- `--execution-date` (string): Query by execution date.
- `--reverse-split` (boolean): Filter for reverse splits.
- `--sort` (string): Sort field.
- `--order` (string): Sort order.
- `--limit` (number): Max results.

**Example:**
```bash
bun cli.js stock-splits --ticker AAPL
```

### financials
Get historical financial data for a stock ticker.

**Usage:**
```bash
bun cli.js financials [options]
```

**Parameters:**
- `--ticker` (string): Query by ticker.
- `--cik` (string): Query by CIK.
- `--company-name` (string): Query by company name.
- `--sic` (string): Query by SIC.
- `--filing-date` (string): Query by filing date.
- `--period-of-report-date` (string): Query by period of report date.
- `--timeframe` (string): internal.
- `--include-sources` (boolean): Include sources.
- `--sort` (string): Sort field.
- `--order` (string): Sort order.
- `--limit` (number): Max results.

**Example:**
```bash
bun cli.js financials --ticker AAPL
```

### ipos
Get a list of upcoming IPOs.

**Usage:**
```bash
bun cli.js ipos [options]
```

**Parameters:**
- `--ticker` (string): Filter by ticker.
- `--us-code` (string): Filter by US Code.
- `--isin` (string): Filter by ISIN.
- `--listing-date` (string): Filter by listing date.
- `--sort` (string): Sort field.
- `--order` (string): Sort order.
- `--limit` (number): Max results.

**Example:**
```bash
bun cli.js ipos --limit 5
```

### related-companies
Get a list of tickers that are related to the given ticker.

**Usage:**
```bash
bun cli.js related-companies --ticker <ticker>
```

**Parameters:**
- `--ticker` (required): The ticker symbol.

**Example:**
```bash
bun cli.js related-companies --ticker AAPL
```
