import * as readline from 'node:readline';
import chalk from 'chalk';

export interface ChatCommand {
  type: 'text' | 'settings' | 'help' | 'status' | 'map' | 'confirm' | 'cancel';
  args: string;
}

const SLASH_COMMANDS: Record<string, ChatCommand['type']> = {
  '/settings': 'settings',
  '/help': 'help',
  '/status': 'status',
  '/map': 'map',
  '/yes': 'confirm',
  '/y': 'confirm',
  '/no': 'cancel',
  '/n': 'cancel',
};

export class NovaChat {
  private rl: readline.Interface | null = null;
  private handlers: Array<(cmd: ChatCommand) => void> = [];
  private prompt = chalk.cyan('nova> ');

  start(): void {
    if (!process.stdin.isTTY) return;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: this.prompt,
      terminal: true,
    });

    this.rl.on('line', (line: string) => {
      const trimmed = line.trim();
      if (!trimmed) {
        this.rl?.prompt();
        return;
      }

      const cmd = this.parse(trimmed);
      for (const handler of this.handlers) {
        handler(cmd);
      }

      this.rl?.prompt();
    });

    this.rl.on('close', () => {
      // Ctrl+D — trigger graceful shutdown
      process.kill(process.pid, 'SIGINT');
    });

    // Show initial prompt
    this.rl.prompt();
  }

  onCommand(handler: (cmd: ChatCommand) => void): void {
    this.handlers.push(handler);
  }

  showPrompt(): void {
    this.rl?.prompt();
  }

  log(message: string): void {
    // Clear current line, print message, then re-show prompt
    if (this.rl) {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
    }
    console.log(message);
    this.rl?.prompt(true);
  }

  stop(): void {
    this.rl?.close();
    this.rl = null;
  }

  private parse(input: string): ChatCommand {
    // Check slash commands
    const lower = input.toLowerCase();
    for (const [prefix, type] of Object.entries(SLASH_COMMANDS)) {
      if (lower === prefix || lower.startsWith(prefix + ' ')) {
        const args = input.slice(prefix.length).trim();
        return { type, args };
      }
    }

    // Quick confirm/cancel shortcuts
    if (lower === 'y' || lower === 'yes' || lower === 'execute') {
      return { type: 'confirm', args: '' };
    }
    if (lower === 'n' || lower === 'no' || lower === 'cancel') {
      return { type: 'cancel', args: '' };
    }

    // Everything else is a text command (like a voice transcript)
    return { type: 'text', args: input };
  }
}
