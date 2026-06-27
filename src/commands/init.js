import path from 'node:path';
import { mkdir, access, readFile, writeFile } from 'node:fs/promises';
import { ok, error } from '../utils.js';
import { getConfigPath, getExamplePath } from '../config.js';

export async function init(...args) {
  const force = args.includes('--force') || args.includes('-f');
  const configPath = getConfigPath();
  const configDir = path.dirname(configPath);
  const examplePath = getExamplePath();

  let existed = false;
  try {
    await access(configPath);
    existed = true;
    if (!force) {
      error(`Config already exists at ${configPath}`);
      process.exit(1);
    }
  } catch {
    // Config doesn't exist, proceed
  }

  const example = await readFile(examplePath, 'utf-8');
  await mkdir(configDir, { recursive: true });
  await writeFile(configPath, example, 'utf-8');

  if (existed && force) {
    ok(`Config overwritten at ${configPath}`);
  } else {
    ok(`Config created at ${configPath}`);
  }
}