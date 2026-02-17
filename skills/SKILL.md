---
name: polygon-api
description: Access Polygon/Massive stock, crypto, forex, options, indices, futures, market data, and news APIs via CLI.
metadata:
  openclaw:
    requires:
      bins: ["bun"]
      env: ["POLY_API_KEY"]
    primaryEnv: "POLY_API_KEY"
---

# Polygon (Massive) Market Data Skill

A CLI tool and JS client wrapper for the [Polygon/Massive](https://massive.com) financial data APIs. Covers stocks, crypto, forex, options, indices, futures, market status, news, and reference data.


## CLI Usage

```bash
npx massive <command> [options]
```

All commands output JSON to stdout. Use `--help` for a list of commands or `<command> --help` for command-specific options.

### Stocks

See [Stocks Commands Reference](references/stocks_commands.md) for full details on all stock commands and parameters.

### Crypto

See [Crypto Commands Reference](references/crypto_commands.md) for full details on all crypto commands and parameters.

### Forex

See [Forex Commands Reference](references/forex_commands.md) for full details on all forex commands and parameters.

### Options

See [Options Commands Reference](references/options_commands.md) for full details on all options commands and parameters.

### Indices

See [Indices Commands Reference](references/indices_commands.md) for full details on all indices commands and parameters.

### Reference Data

See [Reference Data Commands Reference](references/reference_commands.md) for full details on all reference data commands and parameters.

### Market

See [Market Commands Reference](references/market_commands.md) for full details on all market commands and parameters.

### News

See [News Commands Reference](references/news_commands.md) for full details on all news commands and parameters.