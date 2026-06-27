import os from 'node:os';
import path from 'node:path';
import { readFile, writeFile, access } from 'node:fs/promises';

const claudeSettingsPath = path.join(os.homedir(), '.claude', 'settings.json');

/** Read Claude settings.json, exit with message if missing. */
export async function readClaudeSettings() {
  try {
    await access(claudeSettingsPath);
  } catch {
    console.error(`${claudeSettingsPath} not found`);
    process.exit(1);
  }
  const raw = await readFile(claudeSettingsPath, 'utf-8');
  return JSON.parse(raw);
}

/** Persist Claude settings back to disk. */
export async function writeClaudeSettings(settings) {
  await writeFile(claudeSettingsPath, JSON.stringify(settings, null, 2) + '\n', 'utf-8');
}

/** Resolve a config value: if it's in {{xxx}} format, read from process.env. */
function resolveEnvValue(value) {
  if (typeof value !== 'string') {
    return value;
  }

  // Handle {{xxx}} template format
  const templateMatch = value.match(/\{\{([^}]+)\}\}/);
  if (templateMatch) {
    const envKey = templateMatch[1];
    const resolved = process.env[envKey];
    if (resolved === undefined) {
      console.error(`Environment variable ${envKey} is not set`);
      process.exit(1);
    }
    return resolved;
  }

  // If it's not in {{xxx}} format, return as-is
  return value;
}

/** Return a new settings object with env vars merged in. */
export function mergeEnvs(settings, envs) {
  const resolvedEnv = {};
  for (const [key, value] of Object.entries(envs)) {
    resolvedEnv[key] = resolveEnvValue(value);
  }
  return {
    ...settings,
    env: {
      ...settings.env,
      ...resolvedEnv,
    },
  };
}
