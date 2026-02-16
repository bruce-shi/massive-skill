import { DefaultApi } from "@massive.com/client-js";

export interface Command {
  desc: string;
  usage: string;
  handler: (api: DefaultApi, flags: Record<string, string>) => Promise<void>;
}

export type CommandMap = Record<string, Command>;
