import { createHash } from 'node:crypto';
import type { ILicenseChecker } from '@novastorm-ai/core';
import type { LicenseStatus, NovaConfig } from '@novastorm-ai/core';
import { TeamDetector } from './TeamDetector.js';

const FREE_DEV_LIMIT = 3;
const KEY_PATTERN = /^(NOVA-[A-Z2-7]+-[a-f0-9]{4}|NA-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4})$/;
const VALIDATE_ENDPOINT = 'https://cli-api.novastorm.ai/v1/license/validate';
const TIMEOUT_MS = 5_000;

function validateKeyFormat(key: string): boolean {
  return KEY_PATTERN.test(key);
}

async function validateKeyOnline(key: string, devCount: number): Promise<{ valid: boolean; tier?: string; maxDevs?: number } | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(VALIDATE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: key, gitAuthors90d: devCount }),
        signal: controller.signal,
      });
      if (response.ok) {
        return (await response.json()) as { valid: boolean; tier?: string; maxDevs?: number };
      }
      return null;
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    // Offline fallback — accept key if format is valid
    return null;
  }
}

export class LicenseChecker implements ILicenseChecker {
  private teamDetector = new TeamDetector();

  async check(projectPath: string, _config: NovaConfig): Promise<LicenseStatus> {
    const teamInfo = await this.teamDetector.detect(projectPath);
    const devCount = teamInfo.devCount;

    if (devCount <= FREE_DEV_LIMIT) {
      return { valid: true, tier: 'free', devCount };
    }

    const key = _config.license?.key ?? process.env['NOVA_LICENSE_KEY'] ?? '';

    if (!key) {
      return {
        valid: false,
        tier: 'company',
        devCount,
        message:
          'Company license required: this project has more than 3 contributors. Set NOVA_LICENSE_KEY or run: nova license activate <key>',
      };
    }

    if (!validateKeyFormat(key)) {
      return {
        valid: false,
        tier: 'company',
        devCount,
        message:
          'Invalid license key format. Get a valid key at https://cli.novastorm.ai/#pricing',
      };
    }

    // Online validation — falls back to offline (format-only) if API unreachable
    const onlineResult = await validateKeyOnline(key, devCount);

    if (onlineResult) {
      if (!onlineResult.valid) {
        return {
          valid: false,
          tier: 'company',
          devCount,
          message: 'License key is invalid or expired. Visit https://cli.novastorm.ai/#pricing',
        };
      }

      if (onlineResult.maxDevs && devCount > onlineResult.maxDevs) {
        return {
          valid: false,
          tier: 'company',
          devCount,
          message: `Your license covers ${onlineResult.maxDevs} developers but your team has ${devCount}. Upgrade at https://cli.novastorm.ai/#pricing`,
        };
      }
    }

    return { valid: true, tier: 'company', devCount };
  }
}
