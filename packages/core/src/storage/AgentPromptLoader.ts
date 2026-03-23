import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { IAgentPromptLoader } from '../contracts/IStorage.js';
import { DEFAULT_AGENT_PROMPTS } from './agentPrompts.js';

export class AgentPromptLoader implements IAgentPromptLoader {
  async load(agentName: string, projectPath: string): Promise<string> {
    const filePath = join(projectPath, '.nova', 'agents', `${agentName}.md`);
    try {
      const content = await readFile(filePath, 'utf-8');
      if (content.trim().length > 0) {
        return content;
      }
    } catch {
      // File doesn't exist — fall through to default
    }
    return DEFAULT_AGENT_PROMPTS[agentName] ?? '';
  }
}
