#!/usr/bin/env node

import { current } from '../src/commands/current.js';
import { list } from '../src/commands/list.js';
import { use } from '../src/commands/use.js';
import { init } from '../src/commands/init.js';
import { help } from '../src/commands/help.js';
import { set } from '../src/commands/set.js';

const [, , command, ...args] = process.argv;

const commands = { current, list, use, init, help, set };

const fn = commands[command];
if (!fn) {
  help();
  process.exit(1);
}

await fn(...args);
