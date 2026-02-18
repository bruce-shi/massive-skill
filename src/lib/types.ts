import type { Command } from "commander";
import type { Flags } from "./utils";

export type CommandMap = Record<string, CommandDef>;

export interface CommandDef {
  desc: string;
  usage: string;
  handler: (api: DefaultApi, flags: Flags) => Promise<void>;
}

import { DefaultApi } from "@massive.com/client-js";
export { DefaultApi };

// New type for Commander command registration functions
export type CommandRegistrar = (program: Command) => void;
