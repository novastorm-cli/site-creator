# Nova Architect License FAQ

## General

### What license does Nova Architect use?

Nova Architect uses a Business Source License (BSL 1.1). The source code is fully viewable and forkable. After the change date (March 20, 2029), the code becomes MIT-licensed.

### Is Nova Architect open source?

Nova Architect is source-available, not open source by the OSI definition. You can read, fork, and modify the code, but commercial use with larger teams requires a paid license.

### When does the code become fully open source?

On March 20, 2029, the entire codebase converts to the MIT license with no restrictions.

---

## Free Use

### Who can use Nova Architect for free?

- Solo developers
- Teams of 3 or fewer developers
- Open-source projects (any OSI-approved license)
- Students and educators
- Anyone evaluating the tool

### How is "3 developers" counted?

Nova Architect counts unique git commit author emails within a 90-day sliding window. Bot accounts (dependabot, renovate, github-actions, etc.) are automatically excluded. Email normalization strips `+tags` and lowercases addresses to avoid counting the same person twice.

### I have 3 developers but we use a shared CI bot. Does that count?

No. Known bot patterns (dependabot, renovate, github-actions, noreply.github.com) are filtered out automatically.

### What if a developer leaves and we drop back to 3?

Once the 90-day window no longer includes the departed developer's commits, the team count decreases and you return to the free tier automatically.

---

## Paid License

### When do I need a paid license?

When your project has more than 3 unique human developers committing within a 90-day window and the project is not open source.

### How do I get a license key?

Visit [https://nova-architect.dev/pricing](https://nova-architect.dev/pricing) to purchase a license. You will receive a key in the format `NOVA-{BASE32}-{CHECKSUM}`.

### How do I activate my license?

Option 1 -- environment variable:
```bash
export NOVA_LICENSE_KEY=NOVA-YOURKEY-abcd
```

Option 2 -- config file (nova.toml):
```toml
[license]
key = "NOVA-YOURKEY-abcd"
```

Option 3 -- CLI command:
```bash
nova license activate NOVA-YOURKEY-abcd
```

### What happens if I exceed 3 developers without a license?

Nova Architect continues to work but displays license nudge messages. It does not hard-block usage.

---

## Privacy & Telemetry

### Does Nova Architect collect data?

Nova Architect sends a minimal, anonymous telemetry ping on startup. See [telemetry.md](./telemetry.md) for full details on what is collected.

### Can I disable telemetry?

Yes. Any of these methods will disable telemetry:

```bash
# Environment variable
export NOVA_TELEMETRY=false

# CLI flag
nova start --no-telemetry

# Config file (nova.toml)
[telemetry]
enabled = false
```

---

## Contributing

### Can I contribute to Nova Architect?

Yes. Contributions are welcome under the same BSL 1.1 license. By contributing, you agree that your contributions will be licensed under the same terms.

### Can I fork Nova Architect?

Yes. You may fork and modify the code for any permitted use. If your fork is used commercially with more than 3 developers, a license is required.
