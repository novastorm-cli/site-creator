import type { NudgeContext } from '@novastorm-ai/core';

export class NudgeRenderer {
  render(context: NudgeContext): string | null {
    switch (context.level) {
      case 0:
        return null;
      case 1:
        return 'Nova Architect is free for teams of 3 or fewer. Learn more: https://cli.novastorm.ai/#pricing';
      case 2:
        return `Your team has ${context.devCount} developers. A license is recommended. Visit https://cli.novastorm.ai/#pricing`;
      case 3:
        return [
          '+-------------------------------------------------+',
          '|  License Required                               |',
          `|  Your team of ${String(context.devCount).padEnd(3)} developers needs a         |`,
          '|  commercial license.                            |',
          '|  -> https://cli.novastorm.ai/#pricing          |',
          '+-------------------------------------------------+',
        ].join('\n');
      default:
        return null;
    }
  }
}
