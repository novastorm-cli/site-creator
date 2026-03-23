import type { IGitManager } from '../contracts/IGitManager.js';

/**
 * Serializes git commit operations when multiple lane executors
 * run in parallel. Chains promises so only one commit runs at a time.
 */
export class CommitQueue {
  private queue: Promise<string> = Promise.resolve('');

  constructor(private readonly gitManager: IGitManager) {}

  /**
   * Enqueues a commit operation. The commit will execute after all
   * previously enqueued commits have completed.
   *
   * @param message - commit message
   * @param files - relative file paths to stage (passed to gitManager.commit)
   * @returns the commit hash from gitManager.commit
   */
  enqueue(message: string, files: string[]): Promise<string> {
    this.queue = this.queue.then(
      () => this.gitManager.commit(message, files),
      (err) => {
        console.warn('[Nova] Previous commit failed:', err instanceof Error ? err.message : err);
        return this.gitManager.commit(message, files);
      },
    );
    return this.queue;
  }
}
