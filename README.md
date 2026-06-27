# cc-switch

CLI tool to switch between Claude Code API providers. Quickly toggle your Anthropic API key and base URL across different providers (Claude, GLM, OpenRouter, etc.) without manually editing `~/.claude/settings.json`.

## Installation

### npm (recommended)

```bash
npm install -g cc-switch
```

Or link locally for development:

```bash
git clone <repo-url>
cd cc-switch
npm link
```

### Manual

```bash
git clone <repo-url>
cd cc-switch
chmod +x bin/cc-switch.js
alias cc-switch="node /path/to/cc-switch/bin/cc-switch.js"
```

## Quick Start

```bash
cc-switch init           # create config with built-in presets
cc-switch init -f        # overwrite existing config
```

Built-in presets: `deepseek`, `glm`, `qwen`

After init, edit `~/.cc-switch/config.json` to set your API keys.

## Environment Variable References

Use `{{xxx}}` syntax in config values to read from the current shell environment. This keeps secrets out of config files:

```json
{
  "env": {
    "API_TIMEOUT_MS": "30000"
  },
  "providers": {
    "glm": {
      "ANTHROPIC_AUTH_TOKEN": "{{GLM_AUTH_TOKEN}}",
      "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic"
    }
  }
}
```

The top-level `env` provides shared environment variables that are merged into every provider on switch.

When a value uses `{{xxx}}` syntax, the tool reads it from the current shell environment. If the referenced variable is not set, the command exits with an error.

## Usage

```bash
cc-switch init           # create config with built-in presets
cc-switch init -f        # overwrite existing config
cc-switch current        # show active provider
cc-switch list           # list all providers
cc-switch use <name>     # switch to a provider
cc-switch set <path> <value>  # set a config value (e.g., cc-switch set env.API_TIMEOUT_MS 60000)
cc-switch help           # show usage
```

Environment Variables:
  CC_SWITCH_CONFIG  Override config file path

## Examples

```bash
cc-switch init           # create config with built-in presets
cc-switch init -f        # overwrite existing config
cc-switch current        # show active provider
cc-switch list           # list all providers
cc-switch use glm        # switch to glm provider
cc-switch set env.API_TIMEOUT_MS 60000  # update timeout setting
cc-switch set providers.glm.ANTHROPIC_AUTH_TOKEN {{GLM_AUTH_TOKEN}}  # update provider auth token
cc-switch set  # show config file path
```

When switching, cc-switch reads `~/.claude/settings.json`, merges the provider's environment variables into `settings.env`, writes it back, and updates `current` in its own config.
