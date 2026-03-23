# Contributing to Novastorm

Thanks for your interest in contributing! Here's how to get started.

## Getting Started

```bash
# Fork the repo on GitHub, then:
git clone git@github.com:YOUR_USERNAME/nova.git
cd nova

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Link CLI globally for local testing
pnpm link
```

## Development

### Project Structure

```
packages/
├── cli/        — Command-line interface (@novastorm-ai/cli)
├── core/       — Project analysis, knowledge graph, task orchestration
├── overlay/    — Browser overlay (visual selection, voice input)
├── proxy/      — HTTP/WebSocket proxy between dev server and browser
└── licensing/  — License validation and developer counting
```

### Commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all packages |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint all packages |
| `pnpm link` | Build and link `nova` globally |

### Running locally

```bash
pnpm build
cd packages/cli && pnpm link --global
nova  # Should show LOCAL BUILD badge
```

## Making Changes

1. **Fork** the repo and create a branch from `master`
2. **Make your changes** — keep them focused on one thing
3. **Add tests** if you're adding new functionality
4. **Run `pnpm build && pnpm test`** to make sure everything passes
5. **Open a PR** against `master`

### Code Style

- TypeScript strict mode
- ESM modules (`import`/`export`)
- 2-space indentation
- No semicolons in test files is fine, but keep consistent within a file

### Commit Messages

Follow conventional commits:

```
feat: add voice command for element selection
fix: resolve port conflict on macOS
docs: update quickstart guide
chore: bump dependencies
```

## What to Contribute

### Good first issues

Look for issues labeled [`good first issue`](https://github.com/novastorm-cli/nova/labels/good%20first%20issue).

### Areas that need help

- **Stack detection** — add support for new frameworks (Go, Rust, Elixir, etc.)
- **Voice commands** — improve recognition and command parsing
- **Documentation** — tutorials, examples, translations
- **Tests** — increase coverage, especially e2e tests
- **Bug fixes** — check [open issues](https://github.com/novastorm-cli/nova/issues)

## Pull Request Process

1. PRs are reviewed by maintainers
2. CI must pass (build + tests)
3. One approval required to merge
4. Squash merge into `master`

## License

By contributing, you agree that your contributions will be licensed under the same [Business Source License 1.1](LICENSE.md) and will transition to MIT on the Change Date (March 20, 2029).

## Questions?

- [Telegram](https://t.me/novastormcli)
- [GitHub Issues](https://github.com/novastorm-cli/nova/issues)
- [Email](mailto:contact@novastorm.ai)
