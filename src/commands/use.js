import { readConfig, writeConfig, getProvider } from '../config.js';
import { readClaudeSettings, writeClaudeSettings, mergeEnvs } from '../claude.js';
import { ok } from '../utils.js';

/** Switch to a provider: merge its env vars into Claude settings, update current. */
export async function use(name) {
  if (!name) {
    console.error('Usage: cc-switch use <provider>');
    process.exit(1);
  }

  const config = await readConfig();
  const envs = getProvider(config, name);
  const common = config.env || {};

  const claudeSettings = await readClaudeSettings();
  const updated = mergeEnvs(claudeSettings, { ...common, ...envs });
  await writeClaudeSettings(updated);

  config.current = name;
  await writeConfig(config);

  ok(`Switched to ${name}`);
}
