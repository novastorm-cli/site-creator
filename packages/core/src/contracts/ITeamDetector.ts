import type { TeamInfo, TeamDetectOptions } from '../models/index.js';

export interface ITeamDetector {
  detect(projectPath: string, options?: TeamDetectOptions): Promise<TeamInfo>;
}
