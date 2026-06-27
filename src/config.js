import os from 'node:os';
import path from 'node:path';
import { readFile, writeFile, access } from 'node:fs/promises';

const defaultConfigPath = path.join(os.homedir(), '.cc-switch', 'config.json');
const EXAMPLE_PATH = path.join(import.meta.dirname, '..', 'config.example.json');

/** Resolve config path: env override or default. */
export function getConfigPath() {
  return process.env.CC_SWITCH_CONFIG || defaultConfigPath;
}

/** Get the path to the example config file. */
export function getExamplePath() {
  return EXAMPLE_PATH;
}

/** Read and parse the cc-switch config file. */
export async function readConfig() {
  const configPath = getConfigPath();
  try {
    await access(configPath);
  } catch {
    console.error(`Config not found:\n${configPath}`);
    process.exit(1);
  }
  const raw = await readFile(configPath, 'utf-8');
  return JSON.parse(raw);
}

/** Persist the cc-switch config back to disk. */
export async function writeConfig(config) {
  const configPath = getConfigPath();
  await writeFile(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
}

/** Get env vars for a named provider, or exit if missing. */
export function getProvider(config, name) {
  const provider = config.providers?.[name];
  if (!provider) {
    console.error(`Provider "${name}" not found`);
    process.exit(1);
  }
  return provider;
}
