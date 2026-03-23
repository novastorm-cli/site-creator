import { execFile } from 'node:child_process';
import chalk from 'chalk';
import ora from 'ora';

const PKG_NAME = '@novastorm-ai/cli';

async function getLatestVersion(): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5_000);
    try {
      const res = await fetch(`https://registry.npmjs.org/${PKG_NAME}/latest`, {
        signal: controller.signal,
      });
      if (res.ok) {
        const data = (await res.json()) as { version: string };
        return data.version;
      }
      return null;
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    return null;
  }
}

function runNpmInstall(): Promise<{ ok: boolean; output: string }> {
  return new Promise((resolve) => {
    execFile('npm', ['install', '-g', `${PKG_NAME}@latest`], { timeout: 60_000 }, (error, stdout, stderr) => {
      if (error) {
        resolve({ ok: false, output: stderr || error.message });
      } else {
        resolve({ ok: true, output: stdout });
      }
    });
  });
}

export async function updateCommand(): Promise<void> {
  const spinner = ora('Checking for updates...').start();

  const latest = await getLatestVersion();
  if (!latest) {
    spinner.fail('Could not reach npm registry. Check your internet connection.');
    return;
  }

  // Read current version
  const { readFileSync } = await import('node:fs');
  const { dirname, resolve } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const __dirname = dirname(fileURLToPath(import.meta.url));
  let currentVersion = '0.0.0';
  try {
    const pkg = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf-8')) as { version: string };
    currentVersion = pkg.version;
  } catch { /* ignore */ }

  if (currentVersion === latest) {
    spinner.succeed(`Already on the latest version ${chalk.green(latest)}`);
    return;
  }

  spinner.text = `Updating ${chalk.gray(currentVersion)} → ${chalk.green(latest)}...`;

  const result = await runNpmInstall();

  if (result.ok) {
    spinner.succeed(`Updated to ${chalk.green(latest)}`);
  } else {
    spinner.fail('Update failed. Try manually:');
    console.log(chalk.cyan(`  npm install -g ${PKG_NAME}@latest`));
    if (result.output) {
      console.log(chalk.gray(result.output.trim()));
    }
  }
}

export async function checkForUpdates(currentVersion: string): Promise<void> {
  try {
    const latest = await getLatestVersion();
    if (latest && latest !== currentVersion) {
      console.log(
        chalk.yellow(`  Update available: ${chalk.gray(currentVersion)} → ${chalk.green(latest)}`) +
        chalk.gray(`  Run ${chalk.cyan('nova update')} to install\n`)
      );
    }
  } catch {
    // Silent — never block startup
  }
}
