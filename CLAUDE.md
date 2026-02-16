---
description: Use Bun instead of Node.js, npm, pnpm, or vite.
globs: "*.ts, *.tsx, *.html, *.css, *.js, *.jsx, package.json"
alwaysApply: false
---

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`
- Bun automatically loads .env, so don't use dotenv.

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.mdx`.

## Developing Skills

When writing commands or documentation in `skills/`:
- Use `cli.js` instead of `dist/cli.js` in examples and usage instructions.
- All contents of `skills/` are copied to the `dist/` folder during the build process, so they will be relative to the bundled CLI in `dist/`.

## Development Workflow

To add or update commands:

1.  **Update Commands**:
    - Modify/Create a command file in `src/commands/` (e.g., `src/commands/my-command.ts`).
    - Define the command handler and export a `CommandMap` object.
2.  **Register Commands**:
    - Import the new command map in `src/cli.ts`.
    - Add it to the `COMMANDS` object in `src/cli.ts`.
3.  **Update Reference Docs**:
    - Update or create documentation in `skills/references/`.
    - Ensure examples use `cli.js` (not `dist/cli.js`).
4.  **Update Skill Metadata**:
    - Update `skills/SKILL.md` to link to the new references or command descriptions.
5.  **Build**:
    - Run `bun run build` to generate the bundled CLI and copy skills.
