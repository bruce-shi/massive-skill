#!/usr/bin/env node
import { api } from "./lib/api";
import { parseArgs } from "./lib/utils";
import { stocksCommands } from "./commands/stocks";
import { cryptoCommands } from "./commands/crypto";
import { forexCommands } from "./commands/forex";
import { indicesCommands } from "./commands/indices";
import { optionsCommands } from "./commands/options";
import { referenceCommands } from "./commands/reference";
import { marketCommands } from "./commands/market";
import { newsCommands } from "./commands/news";
import type { CommandMap } from "./lib/types";

const COMMANDS: CommandMap = {
  ...stocksCommands,
  ...cryptoCommands,
  ...forexCommands,
  ...indicesCommands,
  ...optionsCommands,
  ...referenceCommands,
  ...marketCommands,
  ...newsCommands,
};

function showHelp() {
  console.log("massive - Massive Market Data CLI\n");
  console.log("Usage: npx massive <command> [options]\n");
  console.log("Commands:");
  const maxLen = Math.max(...Object.keys(COMMANDS).map((k) => k.length));

  // Group commands by prefix for display
  const groups: Record<string, string[]> = {};
  for (const name of Object.keys(COMMANDS)) {
    const prefix = name.split("-")[0]!;
    if (!groups[prefix]) groups[prefix] = [];
    groups[prefix].push(name);
  }

  // Define order of groups
  const order = [
    "stocks",
    "crypto",
    "forex",
    "options",
    "indices",
    "last",
    "currency",
    "tickers",
    "ticker",
    "exchanges",
    "conditions",
    "dividends",
    "stock",
    "financials",
    "ipos",
    "related",
    "market",
    "news",
  ];

  // Display ordered groups first
  for (const prefix of order) {
    if (groups[prefix]) {
      for (const name of groups[prefix]!) {
        const { desc } = COMMANDS[name]!;
        console.log(`  ${name.padEnd(maxLen + 2)} ${desc}`);
      }
      console.log(); // Separator
      delete groups[prefix];
    }
  }

  // Display remaining
  for (const prefix in groups) {
    for (const name of groups[prefix]!) {
      const { desc } = COMMANDS[name]!;
      console.log(`  ${name.padEnd(maxLen + 2)} ${desc}`);
    }
  }

  console.log(
    "Use 'npx massive <command> --help' for command-specific options.",
  );
  console.log("Set MASSIVE_API_KEY in .env or environment.");
}

function showCommandHelp(command: string) {
  const cmd = COMMANDS[command];
  if (!cmd) {
    console.error(`Unknown command: ${command}`);
    console.error("Run 'npx massive help' to see available commands.");
    process.exit(1);
  }
  console.log(`${command} - ${cmd.desc}`);
  console.log(`\nUsage: npx massive ${command} ${cmd.usage}`);
}

async function main() {
  const { command, flags } = parseArgs(process.argv.slice(2));

  if (command === "help" || command === "--help" || command === "-h") {
    showHelp();
    return;
  }

  if (flags.help === "true") {
    showCommandHelp(command);
    return;
  }

  const cmd = COMMANDS[command];
  if (!cmd) {
    console.error(`Unknown command: ${command}`);
    console.error("Run 'npx massive help' to see available commands.");
    process.exit(1);
  }

  try {
    await cmd.handler(api, flags);
  } catch (e: any) {
    console.error("Error executing command:", e.message ?? e);
    process.exit(1);
  }
}

main();
