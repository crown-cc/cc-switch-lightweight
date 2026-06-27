import { readConfig, writeConfig, getConfigPath } from '../config.js';
import { ok, error } from '../utils.js';

/** Set a configuration value: update nested config path with value */
export async function set(path, value) {
  const configPath = getConfigPath();

  // If no path provided, show config file path
  if (!path) {
    console.log(`Configuration file path: ${configPath}`);
    return;
  }

  // Check if trying to modify 'current' - not allowed
  if (path === 'current' || path.startsWith('current.')) {
    error('Cannot modify "current" parameter. Use "cc-switch use <provider>" to switch providers.');
    process.exit(1);
  }

  const config = await readConfig();

  // Parse the path (dot notation like "env.API_TIMEOUT_MS" or "providers.glm.ANTHROPIC_AUTH_TOKEN")
  const pathParts = path.split('.');
  let current = config;

  // Navigate to the target location
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    if (!(part in current)) {
      current[part] = {};
    }
    current = current[part];
  }

  // Set the final value
  const lastKey = pathParts[pathParts.length - 1];
  const oldValue = current[lastKey];
  current[lastKey] = value;

  await writeConfig(config);

  // Determine if the path existed before
  const pathExisted = oldValue !== undefined;

  if (pathExisted) {
    ok([
      `Updated  ${path}`,
      `From:    ${oldValue}`,
      `To:      ${value}`
    ].join("\n"));
  } else {
    ok(`Added new setting ${path} with value \"${value}\"`);
  }

  console.log(`Configuration file path: ${configPath}`);
}