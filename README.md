# Polygon (Massive) API CLI

A CLI tool for accessing [Polygon.io](https://polygon.io) financial data (Stocks, Crypto, Forex, Options, Indices) using [Bun](https://bun.sh).

## Usage

### Via NPX (Recommended)

Run commands directly without installing:

```bash
npx massive <command> [options]
```

### Local Installation

1.  **Install Dependencies:**
    ```bash
    bun install
    ```

2.  **Configure API Key:**
    ```bash
    export POLY_API_KEY=your_api_key_here
    ```
    or create a .env file in the root directory:
    ```
    POLY_API_KEY=your_api_key_here
    ```

3.  **Build:**
    ```bash
    bun run build
    ```
    This generates the bundled CLI in `dist/cli.js`.
Run commands using the built CLI:

```bash
bun dist/cli.js <command> [options]
```

### Examples

**Stocks:**
```bash
npx massive stocks-aggs --ticker AAPL --from 2023-01-01 --to 2023-01-31
```

**Crypto:**
```bash
npx massive crypto-snapshot --ticker X:BTCUSD
```

**Market Status:**
```bash
npx massive market-status
```

Use `--help` to see all available commands:
```bash
npx massive --help
```