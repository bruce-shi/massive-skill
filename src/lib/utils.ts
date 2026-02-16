export function getApiKey(): string {
  const key = process.env.POLY_API_KEY;
  if (!key) {
    console.error("Error: POLY_API_KEY environment variable is not set.");
    console.error("Create a .env file with: POLY_API_KEY=your_key_here");
    process.exit(1);
  }
  return key;
}

export function parseArgs(argv: string[]): {
  command: string;
  flags: Record<string, string>;
} {
  const [command, ...rest] = argv;
  const flags: Record<string, string> = {};
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i] || "";
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = rest[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = "true";
      }
    }
  }
  return { command: command || "help", flags };
}

export function requireFlag(
  flags: Record<string, string>,
  name: string,
): string {
  const val = flags[name];
  if (!val) {
    console.error(`Error: --${name} is required for this command.`);
    process.exit(1);
  }
  return val;
}

export function num(v: string | undefined): number | undefined {
  return v ? Number(v) : undefined;
}

export function bool(v: string | undefined): boolean | undefined {
  if (v === undefined) return undefined;
  return v === "true" || v === "1";
}

export function list(v: string | undefined): string[] | undefined {
  if (!v) return undefined;
  return v
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export async function output(promise: Promise<any>) {
  try {
    const res = await promise;
    console.log(JSON.stringify(res, null, 2));
  } catch (e: any) {
    console.error("API Error:", e.message ?? e);
    process.exit(1);
  }
}
