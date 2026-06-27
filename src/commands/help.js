/** Print usage information. */
export function help() {
  console.log(`
Usage:
  cc-switch <command>

Commands:
  init                Create config with built-in presets
  current             Show the active provider
  list                List all providers
  use <name>          Switch to a provider
  set <path> <value>  Set a config value using dot-path syntax
  help                Show this message

Config:
  ~/.cc-switch/config.json  (or $CC_SWITCH_CONFIG)

Environment Variables:
  CC_SWITCH_CONFIG   Override config file path

Examples:

  # Initialize config with built-in presets
  cc-switch init

  # Overwrite existing config
  cc-switch init -f

  # Show current active provider
  cc-switch current

  # List all available providers
  cc-switch list

  # Switch to glm provider
  cc-switch use glm

  # Update a simple env value
  cc-switch set env.API_TIMEOUT_MS 60000
`);
}
