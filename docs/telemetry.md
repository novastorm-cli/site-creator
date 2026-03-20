# Nova Architect Telemetry

Nova Architect collects minimal, anonymous telemetry to help improve the tool. This document describes exactly what is collected, how it is used, and how to opt out.

## What Is Collected

Each telemetry ping contains:

| Field | Description | Example |
|-------|-------------|---------|
| `machineId` | SHA-256 hash of hostname + username + MAC address. Not reversible. | `a1b2c3d4...` |
| `gitAuthors90d` | Number of unique git authors in the last 90 days | `2` |
| `projectHash` | SHA-256 hash of the git remote URL (or working directory path if no remote). Not reversible. | `e5f6a7b8...` |
| `cliVersion` | Nova Architect CLI version | `0.0.1` |
| `os` | Operating system platform | `darwin` |
| `timestamp` | ISO 8601 timestamp of the ping | `2026-03-20T12:00:00.000Z` |
| `licenseKey` | License key if set, otherwise `null` | `null` |

## What Is NOT Collected

- Source code or file contents
- File names or paths (only a hash of the remote URL)
- API keys or secrets
- User names or email addresses (only a count of unique authors)
- IP addresses are not stored server-side

## How It Is Sent

- Telemetry is sent as a single HTTPS POST to `https://api.nova-architect.dev/v1/telemetry`
- The request has a 3-second timeout
- If the request fails for any reason, it is silently dropped (fire-and-forget)
- Telemetry is sent once per `nova start` invocation, not continuously

## How to Opt Out

Any of these methods will disable telemetry entirely:

### Environment Variable

```bash
export NOVA_TELEMETRY=false
```

### CLI Flag

```bash
nova start --no-telemetry
```

### Config File (nova.toml)

```toml
[telemetry]
enabled = false
```

## Server-Side Response

The telemetry endpoint may return a `nudge_level` in the response body. This is used to display licensing information to teams that may benefit from a commercial license. The nudge is purely informational and does not affect functionality.
