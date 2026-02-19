#!/usr/bin/env node
import { Command } from "commander";
import { createStocksCommand } from "./commands/stocks";
import { createCryptoCommand } from "./commands/crypto";
import {
  createForexCommand,
  createCurrencyConversionCommand,
} from "./commands/forex";
import { createIndicesCommand } from "./commands/indices";
import { createOptionsCommand } from "./commands/options";
import {
  createTickersCommand,
  createTickerDetailsCommand,
  createTickerTypesCommand,
  createExchangesCommand,
  createConditionsCommand,
  createDividendsCommand,
  createStockSplitsCommand,
  createFinancialsCommand,
  createIposCommand,
  createRelatedCompaniesCommand,
} from "./commands/reference";
import {
  createMarketStatusCommand,
  createMarketHolidaysCommand,
} from "./commands/market";
import { createNewsCommand } from "./commands/news";

const program = new Command();

program.name("massive").description("Massive Market Data CLI").version("0.0.4");

// Register all commands using addCommand
program.addCommand(createStocksCommand());

program.addCommand(createCryptoCommand());

program.addCommand(createForexCommand());
program.addCommand(createCurrencyConversionCommand());

program.addCommand(createIndicesCommand());

program.addCommand(createOptionsCommand());

program.addCommand(createTickersCommand());
program.addCommand(createTickerDetailsCommand());
program.addCommand(createTickerTypesCommand());
program.addCommand(createExchangesCommand());
program.addCommand(createConditionsCommand());
program.addCommand(createDividendsCommand());
program.addCommand(createStockSplitsCommand());
program.addCommand(createFinancialsCommand());
program.addCommand(createIposCommand());
program.addCommand(createRelatedCompaniesCommand());

program.addCommand(createMarketStatusCommand());
program.addCommand(createMarketHolidaysCommand());

program.addCommand(createNewsCommand());

program.parse(process.argv);
