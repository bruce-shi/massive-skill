import { Command } from "commander";
import { api } from "../lib/api";
import { output } from "../lib/utils";

export function createMarketStatusCommand(): Command {
  return new Command("market-status")
    .description("Current market status")
    .action(async () => {
      await output(api.getMarketStatus());
    });
}

export function createMarketHolidaysCommand(): Command {
  return new Command("market-holidays")
    .description("Upcoming market holidays")
    .action(async () => {
      await output(api.getMarketHolidays());
    });
}
