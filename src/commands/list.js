import { readConfig } from '../config.js';
import { ok, error } from '../utils.js';

/** Print a list of profile names, marking the active one. */
function printProfileList(names, currentName) {
  for (const name of names) {
    if (name === currentName) {
      ok(`✔ ${name}`);
    } else {
      console.log(`  ${name}`);
    }
  }
}

/** List all profiles, highlighting the active one. */
export async function list() {
  const config = await readConfig();
  const names = Object.keys(config.providers || {});
  printProfileList(names, config.current);
}
