import { readConfig, getConfigPath } from '../config.js';

/** Print the config file path and the currently active provider name. */
export async function current() {
  const config = await readConfig();
  console.log(`config: ${getConfigPath()}`);
  console.log(`provider: ${config.current}`);
}
