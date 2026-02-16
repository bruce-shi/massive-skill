import { api } from "../lib/api";
import type { CommandMap } from "../lib/types";
import { output } from "../lib/utils";

export const marketCommands: CommandMap = {
  "market-status": {
    desc: "Current market status",
    usage: "",
    handler: async (_api, _f) => {
      await output(api.getMarketStatus());
    },
  },
  "market-holidays": {
    desc: "Upcoming market holidays",
    usage: "",
    handler: async (_api, _f) => {
      await output(api.getMarketHolidays());
    },
  },
};
