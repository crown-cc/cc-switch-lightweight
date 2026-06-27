/** Print a prefixed, emoji-tagged success line. */
export function ok(message) {
  console.log(`✨ ${message}`);
}

/** Print a prefixed error line. */
export function error(message) {
  console.error(`💥 ${message}`);
}
