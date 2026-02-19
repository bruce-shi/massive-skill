# Plan: Restructure CLI Commands and Update Documentation

## Overview

This plan has two main objectives:
1. **Code Changes**: Move `last-trade`, `last-quote`, and similar commands under their parent categories
2. **Documentation Updates**: Fix all command references in markdown files to match the actual CLI command structure

## Part 1: Code Changes - Move Commands Under Parent Categories

### Current Command Structure
```
massive-cl
├── stocks <subcommand>
├── last-trade                 # Standalone - should be under stocks
├── last-quote                 # Standalone - should be under stocks
├── crypto <subcommand>
├── last-crypto-trade          # Standalone - should be under crypto
├── options <subcommand>
├── last-options-trade         # Standalone - should be under options
├── forex <subcommand>
├── currency-conversion        # Standalone
├── last-forex-quote           # Standalone
└── ... other commands
```

### Target Command Structure
```
massive-cl
├── stocks <subcommand>
│   ├── aggs
│   ├── trades
│   ├── quotes
│   ├── last-trade            # MOVED
│   └── last-quote            # MOVED
├── crypto <subcommand>
│   ├── aggs
│   ├── trades
│   ├── last-trade            # MOVED (renamed from last-crypto-trade)
│   └── ...
├── options <subcommand>
│   ├── aggs
│   ├── trades
│   ├── last-trade            # MOVED (renamed from last-options-trade)
│   └── ...
└── ... other commands
```

### Files to Modify for Code Changes

| File | Changes |
|------|---------|
| `src/commands/stocks.ts` | Move `createLastTradeCommand` and `createLastQuoteCommand` logic inside `createStocksCommand` |
| `src/commands/options.ts` | Move `createLastOptionsTradeCommand` logic inside `createOptionsCommand`, rename to `last-trade` |
| `src/commands/crypto.ts` | Move `createLastCryptoTradeCommand` logic inside `createCryptoCommand`, rename to `last-trade` |
| `src/cli.ts` | Remove imports and `addCommand` calls for moved standalone commands |

---

## Part 2: Documentation Updates - Fix Command Format

### Issue
The documentation uses incorrect command format with hyphens instead of spaces:
- **Wrong**: `npx -y massive-cli stocks-aggs --ticker AAPL`
- **Correct**: `npx -y massive-cli stocks aggs --ticker AAPL`

### Command Format Mapping Table

| Old Documentation Format | Correct Format |
|-------------------------|----------------|
| `stocks-aggs` | `stocks aggs` |
| `stocks-trades` | `stocks trades` |
| `stocks-quotes` | `stocks quotes` |
| `stocks-snapshot` | `stocks snapshot` |
| `stocks-open-close` | `stocks open-close` |
| `stocks-previous` | `stocks previous` |
| `stocks-grouped` | `stocks grouped` |
| `stocks-sma` | `stocks sma` |
| `stocks-ema` | `stocks ema` |
| `stocks-rsi` | `stocks rsi` |
| `stocks-macd` | `stocks macd` |
| `last-trade` | `stocks last-trade` |
| `last-quote` | `stocks last-quote` |
| `crypto-aggs` | `crypto aggs` |
| `crypto-trades` | `crypto trades` |
| `crypto-snapshot` | `crypto snapshot` |
| `crypto-snapshot-direction` | `crypto snapshot-direction` |
| `crypto-snapshot-tickers` | `crypto snapshot-tickers` |
| `crypto-open-close` | `crypto open-close` |
| `crypto-previous` | `crypto previous` |
| `crypto-grouped` | `crypto grouped` |
| `crypto-sma` | `crypto sma` |
| `crypto-ema` | `crypto ema` |
| `crypto-rsi` | `crypto rsi` |
| `crypto-macd` | `crypto macd` |
| `last-crypto-trade` | `crypto last-trade` |
| `options-aggs` | `options aggs` |
| `options-trades` | `options trades` |
| `options-quotes` | `options quotes` |
| `options-open-close` | `options open-close` |
| `options-chain` | `options chain` |
| `options-contract` | `options contract` |
| `options-previous` | `options previous` |
| `options-sma` | `options sma` |
| `options-ema` | `options ema` |
| `options-rsi` | `options rsi` |
| `options-macd` | `options macd` |
| `last-options-trade` | `options last-trade` |
| `forex-aggs` | `forex aggs` |
| `forex-quotes` | `forex quotes` |
| `forex-snapshot` | `forex snapshot` |
| `forex-previous` | `forex previous` |
| `forex-grouped` | `forex grouped` |
| `forex-sma` | `forex sma` |
| `forex-ema` | `forex ema` |
| `forex-rsi` | `forex rsi` |
| `forex-macd` | `forex macd` |
| `currency-conversion` | `forex currency-conversion` |
| `last-forex-quote` | `forex last-quote` |
| `indices-aggs` | `indices aggs` |
| `indices-open-close` | `indices open-close` |
| `indices-snapshot` | `indices snapshot` |
| `indices-previous` | `indices previous` |
| `indices-sma` | `indices sma` |
| `indices-ema` | `indices ema` |
| `indices-rsi` | `indices rsi` |
| `indices-macd` | `indices macd` |

### Files to Update for Documentation

| File | Updates Needed |
|------|----------------|
| `skills/SKILL.md` | Update main documentation to reflect new command structure |
| `skills/references/stocks_commands.md` | Fix all command examples from `stocks-xxx` to `stocks xxx`, move `last-trade`/`last-quote` under stocks |
| `skills/references/crypto_commands.md` | Fix all command examples from `crypto-xxx` to `crypto xxx`, move `last-crypto-trade` to `crypto last-trade` |
| `skills/references/options_commands.md` | Fix all command examples from `options-xxx` to `options xxx`, move `last-options-trade` to `options last-trade` |
| `skills/references/forex_commands.md` | Fix all command examples from `forex-xxx` to `forex xxx` |
| `skills/references/indices_commands.md` | Fix all command examples from `indices-xxx` to `indices xxx` |
| `skills/references/reference_commands.md` | Verify command examples are correct |
| `skills/references/market_commands.md` | Verify command examples are correct |
| `skills/references/news_commands.md` | Verify command examples are correct |

---

## Execution Order

### Phase 1: Code Changes
1. Modify `src/commands/stocks.ts` - add last-trade and last-quote as subcommands
2. Modify `src/commands/options.ts` - add last-trade as a subcommand
3. Modify `src/commands/crypto.ts` - add last-trade as a subcommand
4. Update `src/cli.ts` - remove standalone command registrations

### Phase 2: Documentation Updates
5. Update `skills/references/stocks_commands.md`
6. Update `skills/references/options_commands.md`
7. Update `skills/references/crypto_commands.md`
8. Update `skills/references/forex_commands.md`
9. Update `skills/references/indices_commands.md`
10. Update `skills/references/reference_commands.md` (if needed)
11. Update `skills/references/market_commands.md` (if needed)
12. Update `skills/references/news_commands.md` (if needed)
13. Update `skills/SKILL.md`

---

## Testing Commands

After implementation, verify:
```bash
# Stocks
npx -y massive-cli stocks last-trade --ticker AAPL
npx -y massive-cli stocks last-quote --ticker AAPL
npx -y massive-cli stocks aggs --ticker AAPL --from 2023-01-01 --to 2023-01-31

# Options
npx -y massive-cli options last-trade --ticker O:AAPL230616C00150000
npx -y massive-cli options aggs --ticker O:AAPL230616C00150000 --from 2023-01-01 --to 2023-01-31

# Crypto
npx -y massive-cli crypto last-trade --from BTC --to USD
npx -y massive-cli crypto aggs --ticker X:BTCUSD --from 2023-01-01 --to 2023-01-31
```
