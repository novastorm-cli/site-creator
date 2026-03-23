# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

**Email:** [contact@novastorm.ai](mailto:contact@novastorm.ai)

Please do **not** open a public GitHub issue for security vulnerabilities.

We will acknowledge your report within 48 hours and provide a timeline for a fix.

## Scope

- Novastorm CLI (`@novastorm-ai/cli`)
- Browser overlay injection
- Proxy server
- License validation endpoints

## What We Consider Vulnerabilities

- Remote code execution through CLI or overlay
- Path traversal allowing access outside project directory
- Credential exposure in logs, telemetry, or generated code
- MITM attacks on the proxy server
- Bypass of license validation that affects other users
